/**
 * Seeds Neon with the 13 categories, the Phase 1 products, the current weekly
 * edition and its picks. Idempotent: re-running does not create duplicates.
 *
 * Run with DATABASE_URL in the environment:
 *   DATABASE_URL="postgres://…" npm run db:seed
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../lib/db/schema";
import {
  categories as categoryContent,
  products as productContent,
  EDITION,
} from "../lib/content";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Aborting seed.");
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

async function main() {
  console.log("Seeding categories…");
  for (const c of categoryContent) {
    await db
      .insert(schema.categories)
      .values({
        name: c.name,
        slug: c.slug,
        description: c.coverage,
        displayOrder: c.order,
      })
      .onConflictDoNothing({ target: schema.categories.slug });
  }

  const catRows = await db.select().from(schema.categories);
  const catId = new Map(catRows.map((r) => [r.slug, r.id]));

  console.log("Seeding products…");
  for (const p of productContent) {
    await db
      .insert(schema.products)
      .values({
        categoryId: catId.get(p.categorySlug) ?? null,
        name: p.name,
        slug: p.slug,
        officialUrl: p.officialUrl,
        tagline: p.tagline,
        shortDescription: p.shortDescription,
        overview: p.overview,
        problemSolved: p.problemSolved,
        howItWorks: p.howItWorks,
        features: p.features,
        useCases: p.useCases,
        targetAudience: p.targetAudience,
        pricingModel: "Not publicly disclosed",
        integrations: p.integrations,
        alternatives: p.alternatives,
        selectionRationale: p.selectionRationale,
        status: p.verification === "verified" ? "published" : "needs_review",
        lastVerifiedAt: null,
      })
      .onConflictDoNothing({ target: schema.products.slug });

    // attach a source record
    const [prod] = await db
      .select({ id: schema.products.id })
      .from(schema.products)
      .where(eq(schema.products.slug, p.slug))
      .limit(1);
    if (prod) {
      for (const s of p.sources) {
        const existing = await db
          .select({ id: schema.productSources.id })
          .from(schema.productSources)
          .where(eq(schema.productSources.productId, prod.id));
        if (existing.length === 0) {
          await db.insert(schema.productSources).values({
            productId: prod.id,
            sourceUrl: s.url,
            sourceTitle: s.title,
            sourceType: s.type,
            credibilityLevel: "primary",
            isVerified: false,
          });
        }
      }
    }
  }

  console.log("Seeding edition…");
  await db
    .insert(schema.weeklyEditions)
    .values({
      editionName: EDITION.name,
      weekStart: EDITION.periodStart,
      weekEnd: EDITION.periodEnd,
      status: "published",
      publishedAt: new Date(),
    })
    .onConflictDoNothing({ target: schema.weeklyEditions.weekStart });

  const [edition] = await db
    .select()
    .from(schema.weeklyEditions)
    .where(eq(schema.weeklyEditions.weekStart, EDITION.periodStart))
    .limit(1);

  if (edition) {
    console.log("Seeding edition picks…");
    const prodRows = await db.select().from(schema.products);
    const prodByCat = new Map(prodRows.map((r) => [r.categoryId, r]));

    for (const c of categoryContent) {
      const cid = catId.get(c.slug);
      if (!cid) continue;
      const product = prodByCat.get(cid);
      await db
        .insert(schema.weeklyPicks)
        .values({
          editionId: edition.id,
          categoryId: cid,
          productId: product?.id ?? null,
          selectionReason: product?.selectionRationale ?? null,
          verificationStatus: "preview",
          publishedAt: new Date(),
        })
        .onConflictDoNothing();
    }
  }

  console.log("✓ Seed complete.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
