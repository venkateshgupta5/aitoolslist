/**
 * Deterministic TypeScript stages (PRD §9: deterministic functions for
 * dedup, scoring, validation). Classification uses keyword matching; ranking
 * normalizes real source signals into the weighted 0–100 methodology.
 *
 * LLM-assisted enrichment/classification/fact-check hooks activate only when
 * OPENAI_API_KEY is configured; otherwise the deterministic path runs and the
 * LLM steps are recorded as skipped.
 */
import { agentCategories } from "./config/categories";
import { weightedTotal, decisionFor, type DimensionScores } from "./config/scoring";
import type { Candidate, ScoredCandidate } from "./schemas";

export const llmEnabled = () => Boolean(process.env.OPENAI_API_KEY);

// ── Classification ─────────────────────────────────────────────────────────
export function classify(c: Candidate): {
  categorySlug?: string;
  confidence: number;
} {
  const haystack = `${c.name} ${c.tagline ?? ""} ${c.description ?? ""}`.toLowerCase();
  let best: { slug: string; hits: number } | null = null;
  for (const cat of agentCategories) {
    let hits = 0;
    for (const kw of cat.keywords) {
      if (haystack.includes(kw)) hits += kw.includes(" ") ? 2 : 1;
    }
    if (hits > 0 && (!best || hits > best.hits)) best = { slug: cat.slug, hits };
  }
  if (!best) return { confidence: 0 };
  const confidence = Math.min(1, best.hits / 4);
  return { categorySlug: best.slug, confidence };
}

// ── Ranking ────────────────────────────────────────────────────────────────
function norm(value: number, max: number): number {
  if (max <= 0) return 0;
  // log-scale so a few viral outliers don't flatten everyone else
  return Math.min(100, (Math.log1p(value) / Math.log1p(max)) * 100);
}

const credibleSources = new Set(["github", "techcrunch", "official", "producthunt"]);

export function scoreCandidates(cands: Candidate[]): ScoredCandidate[] {
  const maxStars = Math.max(1, ...cands.map((c) => c.signals.stars ?? 0));
  const maxPoints = Math.max(1, ...cands.map((c) => c.signals.points ?? 0));
  const maxVotes = Math.max(1, ...cands.map((c) => c.signals.votes ?? 0));
  const maxComments = Math.max(
    1,
    ...cands.map((c) => c.signals.comments ?? 0),
  );

  return cands.map((c) => {
    const tractionRaw = Math.max(
      c.signals.stars ?? 0,
      c.signals.votes ?? 0,
      c.signals.points ?? 0,
    );
    const traction = norm(
      tractionRaw,
      Math.max(maxStars, maxPoints, maxVotes),
    );
    const momentum = norm(
      (c.signals.points ?? 0) + (c.signals.votes ?? 0) + (c.signals.comments ?? 0),
      maxPoints + maxVotes + maxComments,
    );
    const community = norm(c.signals.comments ?? 0, maxComments);

    const distinctSources = new Set(c.discoveredFrom).size;
    const credibleHits = c.discoveredFrom.filter((s) =>
      credibleSources.has(s),
    ).length;
    // credibility: multi-source corroboration + source type, penalize solo
    const credibility = Math.min(
      100,
      40 + distinctSources * 20 + credibleHits * 10 + (c.website ? 10 : 0),
    );

    // innovation & usefulness need judgment; deterministic baseline only.
    const innovation = 50 + (c.signals.forks ? 10 : 0);
    const usefulness = 50 + (c.website ? 10 : 0);

    const scores: DimensionScores = {
      traction: round(traction),
      momentum: round(momentum),
      innovation: round(innovation),
      community: round(community),
      usefulness: round(usefulness),
      credibility: round(credibility),
    };
    const total = weightedTotal(scores);
    return { ...c, scores, total, decision: decisionFor(total) };
  });
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

// ── Spam / low-credibility filter ────────────────────────────────────────────
// The probe showed astroturfed GitHub repos (identical names across throwaway
// accounts). Drop near-duplicate names that appear from a single source.
export function filterSpam(cands: Candidate[]): Candidate[] {
  const nameCounts = new Map<string, number>();
  for (const c of cands) {
    const key = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    nameCounts.set(key, (nameCounts.get(key) ?? 0) + 1);
  }
  return cands.filter((c) => {
    const key = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const dupes = nameCounts.get(key) ?? 1;
    // a name cloned 3+ times from a single source is almost certainly spam
    if (dupes >= 3 && new Set(c.discoveredFrom).size === 1) return false;
    return true;
  });
}
