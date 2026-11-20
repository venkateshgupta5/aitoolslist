/**
 * Ranking methodology (PRD §4). Weights sum to 1.0. Each dimension is scored
 * 0–100 then combined into a weighted total (also 0–100). Funding is a
 * supporting signal inside "traction", never an independent guarantee.
 */
export const weights = {
  traction: 0.25,
  momentum: 0.2,
  innovation: 0.2,
  community: 0.15,
  usefulness: 0.1,
  credibility: 0.1,
} as const;

export type ScoreDimension = keyof typeof weights;

export interface DimensionScores {
  traction: number;
  momentum: number;
  innovation: number;
  community: number;
  usefulness: number;
  credibility: number;
}

export function weightedTotal(s: DimensionScores): number {
  const total =
    s.traction * weights.traction +
    s.momentum * weights.momentum +
    s.innovation * weights.innovation +
    s.community * weights.community +
    s.usefulness * weights.usefulness +
    s.credibility * weights.credibility;
  return Math.round(total * 100) / 100;
}

// Candidate thresholds (PRD §ranking in the main architecture doc)
export function decisionFor(total: number): string {
  if (total >= 85) return "strong";
  if (total >= 70) return "eligible";
  if (total >= 50) return "needs_research";
  return "reject";
}
