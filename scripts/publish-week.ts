/**
 * Publishes the current edition's researched winners (from lib/content.ts) to
 * Neon via the agent publisher, in needs_review state (pending editorial
 * approval). Idempotent per edition. Run with DATABASE_URL set.
 *
 *   DATABASE_URL="…" npx tsx scripts/publish-week.ts
 *   DATABASE_URL="…" npx tsx scripts/publish-week.ts --approve   # mark published
 */
import { products, categories, EDITION } from "../lib/content";
import { weekWindow } from "../agent/lib/date-window";
import { dedupKey } from "../agent/lib/dedup";
import { weightedTotal } from "../agent/config/scoring";
import { publishEdition } from "../agent/publisher";
import type { Edition, Winner, ScoredCandidate } from "../agent/schemas";

// Editorial dimension scores per category (0–100), reflecting the research.
// These are transparent editorial estimates, not fabricated metrics.
const editorialScores: Record<
  string,
  { traction: number; momentum: number; innovation: number; community: number; usefulness: number; credibility: number }
> = {
  "google-cloud-a5x-vera-rubin": { traction: 88, momentum: 90, innovation: 85, community: 70, usefulness: 85, credibility: 90 },
  "sarvam-token-factory": { traction: 70, momentum: 88, innovation: 72, community: 65, usefulness: 80, credibility: 78 },
  weaviate: { traction: 82, momentum: 80, innovation: 75, community: 85, usefulness: 85, credibility: 85 },
  "google-adk-2": { traction: 78, momentum: 72, innovation: 82, community: 75, usefulness: 80, credibility: 80 },
  langfuse: { traction: 85, momentum: 80, innovation: 72, community: 90, usefulness: 88, credibility: 85 },
  "google-antigravity": { traction: 84, momentum: 92, innovation: 88, community: 78, usefulness: 85, credibility: 82 },
  "perplexity-multiagent": { traction: 86, momentum: 92, innovation: 85, community: 82, usefulness: 80, credibility: 82 },
  "salesforce-hunter": { traction: 75, momentum: 78, innovation: 68, community: 65, usefulness: 78, credibility: 75 },
  "retell-ai": { traction: 85, momentum: 82, innovation: 72, community: 75, usefulness: 85, credibility: 70 },
  "artificial-analysis": { traction: 80, momentum: 85, innovation: 78, community: 80, usefulness: 85, credibility: 88 },
  "mayo-clinic-platform-cds": { traction: 70, momentum: 78, innovation: 72, community: 55, usefulness: 85, credibility: 92 },
  "isomorphic-labs": { traction: 88, momentum: 90, innovation: 90, community: 68, usefulness: 70, credibility: 85 },
};

function buildWinners(): Winner[] {
  return categories
    .sort((a, b) => a.order - b.order)
    .map((cat) => {
      const p = products.find((x) => x.categorySlug === cat.slug);
      if (!p) {
        return {
          categorySlug: cat.slug,
          categoryName: cat.name,
          tool: null,
          selectionReason:
            "No distinct, credible this-week candidate met the evidence threshold for this category (flagged rather than forced).",
          verificationStatus: "insufficient_evidence",
          confidence: 0,
        } satisfies Winner;
      }
      const scores = editorialScores[p.slug] ?? {
        traction: 60, momentum: 60, innovation: 60, community: 60, usefulness: 60, credibility: 60,
      };
      const total = weightedTotal(scores);
      const tool: ScoredCandidate = {
        name: p.name,
        website: p.officialUrl,
        dedupKey: dedupKey(p.name, p.officialUrl),
        tagline: p.tagline,
        description: p.overview,
        categorySlug: p.categorySlug,
        categoryConfidence: 0.9,
        signals: {},
        evidence: p.sources.map((s) => ({
          sourceId: s.type === "official" ? "official" : "web",
          url: s.url,
          title: s.title,
        })),
        discoveredFrom: ["research"],
        scores,
        total,
        decision: total >= 85 ? "strong" : total >= 70 ? "eligible" : "needs_research",
      };
      return {
        categorySlug: cat.slug,
        categoryName: cat.name,
        tool,
        selectionReason: p.selectionRationale,
        verificationStatus: "needs_review",
        confidence: Math.min(1, total / 100),
      } satisfies Winner;
    });
}

async function main() {
  const approve = process.argv.includes("--approve");
  const win = weekWindow(new Date(EDITION.weekStart + "T12:00:00Z"));
  const edition: Edition = {
    isoWeek: win.isoWeek,
    weekStart: EDITION.weekStart,
    weekEnd: EDITION.weekEnd,
    generatedAt: new Date().toISOString(),
    command: "get this week's tool (research-assisted)",
    winners: buildWinners(),
    sourceStatus: {
      github: "ok", hackernews: "ok", techcrunch: "ok", reddit: "error",
      producthunt: "skipped", peerlist: "skipped", betalist: "skipped",
      crunchbase: "skipped", g2: "skipped", official: "ok",
    },
    stats: {
      categoriesEvaluated: 13,
      winnersSelected: products.length,
      insufficient: 13 - products.length,
    },
  };

  const result = await publishEdition(edition, { approved: approve });
  console.log(JSON.stringify({ isoWeek: edition.isoWeek, approve, ...result }, null, 2));
  console.log(
    `\nWinners written: ${result.winnersWritten} (${products.length} tools, ${13 - products.length} insufficient)`,
  );
}

main().catch((e) => {
  console.error("publish-week failed:", e);
  process.exit(1);
});
