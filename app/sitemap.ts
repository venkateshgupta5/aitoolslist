import type { MetadataRoute } from "next";
import { categories, products, EDITION, archiveEditions } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/categories"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
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
    { url: absoluteUrl("/editions"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl(`/editions/${EDITION.slug}`), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const editionRoutes: MetadataRoute.Sitemap = archiveEditions.map((e) => ({
    url: absoluteUrl(`/editions/${e.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: absoluteUrl(`/categories/${c.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: absoluteUrl(`/tools/${p.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...editionRoutes, ...categoryRoutes, ...productRoutes];
}
