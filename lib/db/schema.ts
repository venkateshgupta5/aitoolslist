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
  categoryId: uuid("category_id").references(() => categories.id),
  description: text("description"),
  paymentStatus: varchar("payment_status", { length: 30 }).default("pending"),
  paymentReference: text("payment_reference"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
