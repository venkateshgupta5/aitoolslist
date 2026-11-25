import type { Metadata } from "next";
import Link from "next/link";
import {
  segments,
  categories,
  categoriesForSegment,
  productForCategory,
  isEditionPick,
  categoryAccent,
} from "@/lib/content";
import {
  CategoriesBrowser,
  type CatCard,
  type SegmentNav,
} from "@/components/categories-browser";

export const metadata: Metadata = {
  title: "All categories",
  description:
    "Browse 60 AI categories across 6 segments: infrastructure, models, agents, developer tooling, business applications and emerging AI. Researched, fact-checked picks every edition.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  const cards: CatCard[] = categories
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((c) => {
      const product = productForCategory(c.slug);
      const status: CatCard["status"] = product
        ? isEditionPick(product)
          ? "verified"
          : "preview"
        : "none";
      return {
        categoryName: c.name,
        categorySlug: c.slug,
        segmentSlug: c.segmentSlug,
        coverage: c.coverage,
        accentClass: categoryAccent(c.slug),
        toolName: product?.name ?? null,
        toolLogo: product?.logo,
        status,
      };
    });

  const segmentNav: SegmentNav[] = segments.map((s) => ({
    slug: s.slug,
    name: s.name,
    count: categoriesForSegment(s.slug).length,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <span className="text-ink-700">Categories</span>
      </nav>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        60 categories across 6 segments
      </h1>
      <p className="mt-3 max-w-2xl text-ink-600">
        The full map of the AI landscape we track. Each edition researches and
        fact-checks standout tools across these categories, more coverage every
        fortnight.
      </p>

      <CategoriesBrowser segments={segmentNav} cards={cards} />
    </div>
  );
}
