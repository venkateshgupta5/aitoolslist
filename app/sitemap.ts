import type { MetadataRoute } from "next";
import { categories, products, archiveProducts, EDITION, archiveEditions } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

/** Parse a YYYY-MM-DD (or similar) date, falling back to `now` when invalid. */
function dateOr(value: string | null | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? fallback : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // The live catalogue refreshes with the current edition; use its end date so
  // lastModified is stable within a fortnight rather than bumping every deploy.
  const liveDate = dateOr(EDITION.periodEnd, now);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: liveDate, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/categories"), lastModified: liveDate, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/submit-tool"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/badge"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/methodology"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/listing-guidelines"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/refund-policy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/editorial-policy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/editions"), lastModified: liveDate, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl(`/editions/${EDITION.slug}`), lastModified: liveDate, changeFrequency: "weekly", priority: 0.7 },
  ];

  const editionRoutes: MetadataRoute.Sitemap = archiveEditions.map((e) => ({
    url: absoluteUrl(`/editions/${e.slug}`),
    lastModified: dateOr(e.periodEnd, now), // historical, stable
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: absoluteUrl(`/categories/${c.slug}`),
    lastModified: liveDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: absoluteUrl(`/tools/${p.slug}`),
    lastModified: liveDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const archiveProductRoutes: MetadataRoute.Sitemap = archiveProducts.map((p) => ({
    url: absoluteUrl(`/tools/${p.slug}`),
    lastModified: dateOr(p.launchDate, liveDate), // from its original edition
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...editionRoutes, ...categoryRoutes, ...productRoutes, ...archiveProductRoutes];
}
