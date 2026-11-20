import { z } from "zod";

export const evidenceSchema = z.object({
  sourceId: z.string(),
  url: z.string().url(),
  title: z.string().optional(),
  publishedAt: z.string().optional(),
  excerpt: z.string().optional(),
});
export type Evidence = z.infer<typeof evidenceSchema>;

export const signalSchema = z.object({
  stars: z.number().optional(),
  forks: z.number().optional(),
  points: z.number().optional(),
  comments: z.number().optional(),
  votes: z.number().optional(),
});

export const candidateSchema = z.object({
  name: z.string().min(1),
  website: z.string().optional().nullable(),
  dedupKey: z.string(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  categorySlug: z.string().optional(),
  categoryConfidence: z.number().min(0).max(1).optional(),
  signals: signalSchema.default({}),
  evidence: z.array(evidenceSchema).default([]),
  discoveredFrom: z.array(z.string()).default([]),
});
export type Candidate = z.infer<typeof candidateSchema>;

export const dimensionSchema = z.object({
  traction: z.number().min(0).max(100),
  momentum: z.number().min(0).max(100),
  innovation: z.number().min(0).max(100),
  community: z.number().min(0).max(100),
  usefulness: z.number().min(0).max(100),
  credibility: z.number().min(0).max(100),
});

export const scoredCandidateSchema = candidateSchema.extend({
  scores: dimensionSchema,
  total: z.number(),
  decision: z.string(),
});
export type ScoredCandidate = z.infer<typeof scoredCandidateSchema>;

export const winnerSchema = z.object({
  categorySlug: z.string(),
  categoryName: z.string(),
  tool: scoredCandidateSchema.nullable(),
  selectionReason: z.string(),
  verificationStatus: z.enum([
    "verified",
    "needs_review",
    "insufficient_evidence",
  ]),
  confidence: z.number().min(0).max(1),
});
export type Winner = z.infer<typeof winnerSchema>;

export const editionSchema = z.object({
  isoWeek: z.string(),
  weekStart: z.string(),
  weekEnd: z.string(),
  generatedAt: z.string(),
  command: z.string(),
  winners: z.array(winnerSchema),
  sourceStatus: z.record(z.string(), z.enum(["ok", "skipped", "error"])),
  stats: z.record(z.string(), z.number()),
});
export type Edition = z.infer<typeof editionSchema>;
