/**
 * Publishing Agent (PRD §4). Upserts an edition's winners into Neon with full
 * audit trail (tools, tool_sources, tool_scores, fact_checks, weekly_winners).
 * Idempotent per edition via unique (edition_id, category_id). Never overwrites
 * a different historical edition.
 */
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { slugify } from "./lib/dedup";
import type { Edition } from "./schemas";

export interface PublishResult {
  persisted: boolean;
  editionId?: string;
  winnersWritten: number;
  note?: string;
}

export async function publishEdition(
  edition: Edition,
  opts: { approved: boolean } = { approved: false },
): Promise<PublishResult> {
  if (!db) return { persisted: false, winnersWritten: 0, note: "no DATABASE_URL" };

  // 1. Ensure the weekly edition row (status reflects approval state)
  await db
    .insert(schema.weeklyEditions)
    .values({
      editionName: `Weekly Edition — ${edition.weekStart}`,
      weekStart: edition.weekStart,
      weekEnd: edition.weekEnd,
      status: opts.approved ? "published" : "needs_review",
      publishedAt: opts.approved ? new Date() : null,
    })
    .onConflictDoNothing({ target: schema.weeklyEditions.weekStart });

  const [ed] = await db
    .select()
    .from(schema.weeklyEditions)
    .where(eq(schema.weeklyEditions.weekStart, edition.weekStart))
    .limit(1);
  if (!ed) return { persisted: false, winnersWritten: 0, note: "edition upsert failed" };

  // When approved, promote an existing edition row to published.
  if (opts.approved && ed.status !== "published") {
    await db
      .update(schema.weeklyEditions)
      .set({ status: "published", publishedAt: new Date() })
      .where(eq(schema.weeklyEditions.id, ed.id));
  }

  const cats = await db.select().from(schema.categories);
  const catId = new Map(cats.map((c) => [c.slug, c.id]));

  let written = 0;
  for (const w of edition.winners) {
    const categoryId = catId.get(w.categorySlug);
    if (!categoryId) continue;

    let toolId: string | null = null;

    if (w.tool) {
      const t = w.tool;
      const slug = slugify(t.name);
      // upsert canonical tool by dedup key
      await db
        .insert(schema.tools)
        .values({
          categoryId,
          name: t.name,
          slug,
          dedupKey: t.dedupKey,
          website: t.website ?? null,
          tagline: t.tagline ?? null,
          shortDescription: (t.tagline ?? t.description ?? "").slice(0, 160),
          description: t.description ?? null,
          categoryConfidence: t.categoryConfidence?.toString() ?? null,
          verificationStatus: w.verificationStatus,
          lastUpdatedAt: new Date(),
        })
        .onConflictDoNothing({ target: schema.tools.dedupKey });

      const [tool] = await db
        .select({ id: schema.tools.id })
        .from(schema.tools)
        .where(eq(schema.tools.dedupKey, t.dedupKey))
        .limit(1);
      toolId = tool?.id ?? null;

      if (toolId) {
        // source observations (unique per tool/source/period)
        for (const ev of t.evidence) {
          await db
            .insert(schema.toolSources)
            .values({
              toolId,
              sourceId: ev.sourceId,
              sourceUrl: ev.url,
              observationPeriod: edition.isoWeek,
              signals: t.signals,
            })
            .onConflictDoNothing();
        }
        // scores
        await db.insert(schema.toolScores).values({
          toolId,
          editionId: ed.id,
          traction: t.scores.traction.toString(),
          momentum: t.scores.momentum.toString(),
          innovation: t.scores.innovation.toString(),
          community: t.scores.community.toString(),
          usefulness: t.scores.usefulness.toString(),
          credibility: t.scores.credibility.toString(),
          total: t.total.toString(),
        });
        // research snapshot
        await db.insert(schema.researchSnapshots).values({
          toolId,
          editionId: ed.id,
          week: edition.isoWeek,
          raw: { signals: t.signals, discoveredFrom: t.discoveredFrom } as object,
          enriched: { evidence: t.evidence } as object,
        });
        // fact-check rows from evidence
        for (const ev of t.evidence) {
          await db.insert(schema.factChecks).values({
            toolId,
            editionId: ed.id,
            claim: `${t.name} featured in ${w.categoryName}`,
            evidenceUrl: ev.url,
            evidenceExcerpt: ev.title ?? null,
            status: w.verificationStatus === "verified" ? "verified" : "unknown",
            confidence: w.confidence.toString(),
          });
        }
      }
    }

    // upsert the winner (idempotent per edition/category)
    await db
      .insert(schema.weeklyWinners)
      .values({
        editionId: ed.id,
        categoryId,
        toolId,
        rankScore: w.tool ? w.tool.total.toString() : null,
        selectionReason: w.selectionReason,
        verificationStatus: w.verificationStatus,
        confidence: w.confidence.toString(),
        insufficientEvidence: w.verificationStatus === "insufficient_evidence",
        publishedAt: opts.approved ? new Date() : null,
      })
      .onConflictDoUpdate({
        target: [schema.weeklyWinners.editionId, schema.weeklyWinners.categoryId],
        set: {
          toolId,
          rankScore: w.tool ? w.tool.total.toString() : null,
          selectionReason: w.selectionReason,
          verificationStatus: w.verificationStatus,
          confidence: w.confidence.toString(),
          insufficientEvidence: w.verificationStatus === "insufficient_evidence",
          publishedAt: opts.approved ? new Date() : null,
        },
      });
    written += 1;
  }

  return { persisted: true, editionId: ed.id, winnersWritten: written };
}
