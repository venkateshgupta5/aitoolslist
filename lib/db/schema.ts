import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  numeric,
  date,
  index,
  unique,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  description: text("description"),
  displayOrder: integer("display_order").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id").references(() => categories.id),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 220 }).notNull().unique(),
    officialUrl: text("official_url").notNull(),
    logoUrl: text("logo_url"),
    tagline: varchar("tagline", { length: 120 }),
    shortDescription: varchar("short_description", { length: 120 }),
    overview: text("overview"),
    problemSolved: text("problem_solved"),
    howItWorks: text("how_it_works"),
    features: jsonb("features").default([]),
    useCases: jsonb("use_cases").default([]),
    targetAudience: jsonb("target_audience").default([]),
    pricingModel: text("pricing_model"),
    pricingDetails: jsonb("pricing_details").default({}),
    integrations: jsonb("integrations").default([]),
    alternatives: jsonb("alternatives").default([]),
    selectionRationale: text("selection_rationale"),
    status: varchar("status", { length: 20 }).default("draft"),
    lastVerifiedAt: timestamp("last_verified_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("idx_products_category").on(t.categoryId),
    index("idx_products_status").on(t.status),
  ],
);

export const productSources = pgTable(
  "product_sources",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id),
    sourceUrl: text("source_url").notNull(),
    sourceTitle: text("source_title"),
    sourceType: varchar("source_type", { length: 40 }),
    credibilityLevel: varchar("credibility_level", { length: 20 }),
    claimsSupported: jsonb("claims_supported").default([]),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    checkedAt: timestamp("checked_at", { withTimezone: true }).defaultNow(),
    isVerified: boolean("is_verified").default(false),
  },
  (t) => [index("idx_product_sources_product").on(t.productId)],
);

export const weeklyEditions = pgTable("weekly_editions", {
  id: uuid("id").primaryKey().defaultRandom(),
  editionName: varchar("edition_name", { length: 150 }),
  weekStart: date("week_start").notNull().unique(),
  weekEnd: date("week_end").notNull(),
  status: varchar("status", { length: 20 }).default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  approvedBy: uuid("approved_by"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const weeklyPicks = pgTable(
  "weekly_picks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    editionId: uuid("edition_id")
      .notNull()
      .references(() => weeklyEditions.id),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id),
    productId: uuid("product_id").references(() => products.id),
    rankingScore: numeric("ranking_score", { precision: 5, scale: 2 }),
    selectionReason: text("selection_reason"),
    verificationStatus: varchar("verification_status", { length: 30 }),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (t) => [
    unique("uq_edition_category").on(t.editionId, t.categoryId),
    index("idx_weekly_picks_edition").on(t.editionId, t.categoryId),
  ],
);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 150 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  image: text("image"),
  role: varchar("role", { length: 20 }).default("user"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id),
    userId: uuid("user_id").references(() => users.id),
    fullName: varchar("full_name", { length: 150 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    location: varchar("location", { length: 150 }).notNull(),
    profession: varchar("profession", { length: 120 }).notNull(),
    message: text("message"),
    consent: boolean("consent").notNull().default(false),
    status: varchar("status", { length: 30 }).default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("idx_leads_product").on(t.productId, t.createdAt),
    index("idx_leads_email").on(t.email),
  ],
);

export const listingSubmissions = pgTable("listing_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyName: varchar("company_name", { length: 200 }).notNull(),
  productName: varchar("product_name", { length: 200 }).notNull(),
  websiteUrl: text("website_url").notNull(),
  contactName: varchar("contact_name", { length: 150 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  // The signed-in account that created this submission (for "My orders"),
  // which can differ from the work email entered above.
  accountEmail: varchar("account_email", { length: 255 }),
  categoryId: uuid("category_id").references(() => categories.id),
  description: text("description"),
  paymentStatus: varchar("payment_status", { length: 30 }).default("pending"),
  paymentReference: text("payment_reference"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─────────────────────────────────────────────────────────────────────────
// Weekly Discovery Agent tables (aitoolslist_weekly_discovery_agent_prd.md §7)
// The agent is independent of the frontend: it writes canonical research
// records here; the website consumes only approved winners.
// ─────────────────────────────────────────────────────────────────────────

export const tools = pgTable(
  "tools",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id").references(() => categories.id),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 220 }).notNull().unique(),
    dedupKey: varchar("dedup_key", { length: 255 }).notNull().unique(),
    website: text("website"),
    company: varchar("company", { length: 200 }),
    founders: jsonb("founders").default([]),
    launchDate: date("launch_date"),
    tagline: varchar("tagline", { length: 160 }),
    shortDescription: varchar("short_description", { length: 160 }),
    description: text("description"),
    features: jsonb("features").default([]),
    useCases: jsonb("use_cases").default([]),
    supportedModels: jsonb("supported_models").default([]),
    integrations: jsonb("integrations").default([]),
    pricing: jsonb("pricing").default({}),
    freeTier: boolean("free_tier"),
    openSource: boolean("open_source"),
    apiAvailable: boolean("api_available"),
    deploymentOptions: jsonb("deployment_options").default([]),
    funding: jsonb("funding").default({}),
    adoption: jsonb("adoption").default({}),
    competitors: jsonb("competitors").default([]),
    differentiation: text("differentiation"),
    categoryConfidence: numeric("category_confidence", { precision: 4, scale: 3 }),
    verificationStatus: varchar("verification_status", { length: 30 }).default("unverified"),
    firstDiscoveredAt: timestamp("first_discovered_at", { withTimezone: true }).defaultNow(),
    lastUpdatedAt: timestamp("last_updated_at", { withTimezone: true }).defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("idx_tools_category").on(t.categoryId)],
);

export const toolSources = pgTable(
  "tool_sources",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    toolId: uuid("tool_id")
      .notNull()
      .references(() => tools.id),
    sourceId: varchar("source_id", { length: 40 }).notNull(),
    sourceUrl: text("source_url").notNull(),
    observationPeriod: varchar("observation_period", { length: 20 }).notNull(),
    signals: jsonb("signals").default({}),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    observedAt: timestamp("observed_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    unique("uq_tool_source_period").on(
      t.toolId,
      t.sourceId,
      t.observationPeriod,
    ),
    index("idx_tool_sources_tool").on(t.toolId),
  ],
);

export const researchSnapshots = pgTable("research_snapshots", {
  id: uuid("id").primaryKey().defaultRandom(),
  toolId: uuid("tool_id")
    .notNull()
    .references(() => tools.id),
  editionId: uuid("edition_id").references(() => weeklyEditions.id),
  week: varchar("week", { length: 20 }).notNull(),
  raw: jsonb("raw").default({}),
  enriched: jsonb("enriched").default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const toolScores = pgTable(
  "tool_scores",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    toolId: uuid("tool_id")
      .notNull()
      .references(() => tools.id),
    editionId: uuid("edition_id").references(() => weeklyEditions.id),
    traction: numeric("traction", { precision: 5, scale: 2 }),
    momentum: numeric("momentum", { precision: 5, scale: 2 }),
    innovation: numeric("innovation", { precision: 5, scale: 2 }),
    community: numeric("community", { precision: 5, scale: 2 }),
    usefulness: numeric("usefulness", { precision: 5, scale: 2 }),
    credibility: numeric("credibility", { precision: 5, scale: 2 }),
    total: numeric("total", { precision: 5, scale: 2 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("idx_tool_scores_edition").on(t.editionId)],
);

export const factChecks = pgTable(
  "fact_checks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    toolId: uuid("tool_id")
      .notNull()
      .references(() => tools.id),
    editionId: uuid("edition_id").references(() => weeklyEditions.id),
    claim: text("claim").notNull(),
    evidenceUrl: text("evidence_url"),
    evidenceExcerpt: text("evidence_excerpt"),
    status: varchar("status", { length: 20 }).default("unknown"),
    confidence: numeric("confidence", { precision: 4, scale: 3 }),
    checkedAt: timestamp("checked_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("idx_fact_checks_tool").on(t.toolId)],
);

export const weeklyWinners = pgTable(
  "weekly_winners",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    editionId: uuid("edition_id")
      .notNull()
      .references(() => weeklyEditions.id),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id),
    toolId: uuid("tool_id").references(() => tools.id),
    rankScore: numeric("rank_score", { precision: 5, scale: 2 }),
    selectionReason: text("selection_reason"),
    verificationStatus: varchar("verification_status", { length: 30 }),
    confidence: numeric("confidence", { precision: 4, scale: 3 }),
    insufficientEvidence: boolean("insufficient_evidence").default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (t) => [
    unique("uq_winner_edition_category").on(t.editionId, t.categoryId),
    index("idx_weekly_winners_edition").on(t.editionId),
  ],
);

export const agentRuns = pgTable("agent_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  editionId: uuid("edition_id").references(() => weeklyEditions.id),
  runKey: varchar("run_key", { length: 80 }).notNull().unique(),
  command: varchar("command", { length: 120 }),
  status: varchar("status", { length: 30 }).default("pending"),
  params: jsonb("params").default({}),
  stats: jsonb("stats").default({}),
  logs: jsonb("logs").default([]),
  error: text("error"),
  startedAt: timestamp("started_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
