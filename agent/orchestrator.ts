/**
 * Orchestrator (PRD §4). Coordinates discovery → classification → ranking →
 * shortlist → fact-check → winner selection → persistence. Writes an
 * agent_runs log, raw/enriched/winners JSON locally, and (unless dry-run) the
 * edition to Neon in needs_review state (human approval required before public
 * publication, PRD §11).
 */
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { weekWindow } from "./lib/date-window";
import { saveJson } from "./lib/storage";
import { runDiscovery } from "./sources";
import { classify, scoreCandidates, filterSpam, llmEnabled } from "./pipeline";
import { agentCategories } from "./config/categories";
import { publishEdition } from "./publisher";
import type { Candidate, Edition, Winner } from "./schemas";

export interface RunOptions {
  dryRun?: boolean;
  publish?: boolean; // mark edition approved/published
  category?: string; // single-category slug
  command?: string;
  ref?: Date;
}

export async function runAgent(opts: RunOptions = {}): Promise<Edition> {
  const win = weekWindow(opts.ref);
  const runKey = `${win.isoWeek}:${opts.command ?? "get-this-weeks-tool"}:${randomUUID().slice(0, 8)}`;
  const startedAt = new Date();

  // agent_runs: started
  let runId: string | null = null;
  if (db && !opts.dryRun) {
    try {
      const [r] = await db
        .insert(schema.agentRuns)
        .values({
          runKey,
          command: opts.command ?? "get this week's tool",
          status: "running",
          params: { ...opts, ref: undefined } as object,
          startedAt,
        })
        .returning({ id: schema.agentRuns.id });
      runId = r?.id ?? null;
    } catch (e) {
      console.warn("[orchestrator] could not log agent_run:", (e as Error).message);
    }
  }

  // 1–7: discovery + dedup
  const { candidates, status } = await runDiscovery(win);
  saveJson("raw", win.isoWeek, "discovery", { win, status, candidates });

  // spam filter + classification
  const cleaned = filterSpam(candidates);
  for (const c of cleaned) {
    const cls = classify(c);
    c.categorySlug = cls.categorySlug;
    c.categoryConfidence = cls.confidence;
  }

  // 9–10: score + shortlist
  const scored = scoreCandidates(cleaned);
  saveJson("enriched", win.isoWeek, "enriched", scored);

  // group by category, pick best per category
  const cats = opts.category
    ? agentCategories.filter((c) => c.slug === opts.category)
    : agentCategories;

  const winners: Winner[] = cats.map((cat) => {
    const inCat = scored
      .filter((s) => s.categorySlug === cat.slug)
      .sort((a, b) => b.total - a.total);
    const top = inCat[0];

    // Evidence threshold: need a real candidate scoring ≥50 with corroboration.
    if (!top || top.total < 50) {
      return {
        categorySlug: cat.slug,
        categoryName: cat.name,
        tool: null,
        selectionReason:
          "No candidate from this week's discovery met the evidence threshold for this category.",
        verificationStatus: "insufficient_evidence",
        confidence: 0,
      } satisfies Winner;
    }
    const distinctSources = new Set(top.discoveredFrom).size;
    const verificationStatus =
      distinctSources >= 2 && top.total >= 70 ? "needs_review" : "insufficient_evidence";
    return {
      categorySlug: cat.slug,
      categoryName: cat.name,
      tool: top,
      selectionReason: `Top-ranked candidate (score ${top.total}) from ${top.discoveredFrom.join(", ")}.`,
      verificationStatus,
      confidence: Math.min(1, top.total / 100),
    } satisfies Winner;
  });

  const edition: Edition = {
    isoWeek: win.isoWeek,
    weekStart: win.weekStart,
    weekEnd: win.weekEnd,
    generatedAt: new Date().toISOString(),
    command: opts.command ?? "get this week's tool",
    winners,
    sourceStatus: status,
    stats: {
      discovered: candidates.length,
      afterSpamFilter: cleaned.length,
      categoriesEvaluated: cats.length,
      winnersSelected: winners.filter((w) => w.tool).length,
      insufficient: winners.filter((w) => !w.tool).length,
      llmAssisted: llmEnabled() ? 1 : 0,
    },
  };
  saveJson("winners", win.isoWeek, "winners", edition);

  // persist
  let persistNote = "dry-run (no DB writes)";
  if (!opts.dryRun) {
    const result = await publishEdition(edition, { approved: Boolean(opts.publish) });
    persistNote = result.note ?? `persisted ${result.winnersWritten} winners`;
  }

  // agent_runs: complete
  if (db && runId) {
    try {
      await db
        .update(schema.agentRuns)
        .set({
          status: "completed",
          stats: edition.stats as object,
          logs: [persistNote] as unknown as object,
          completedAt: new Date(),
        })
        .where(eq(schema.agentRuns.id, runId));
    } catch {
      /* best-effort */
    }
  }

  return edition;
}
