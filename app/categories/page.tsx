import type { Metadata } from "next";
import Link from "next/link";
import { sortedCategories, productForCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "All categories",
  description:
    "Browse all 13 AI categories, from GPU cloud and inference to AI agents, sales, voice and healthcare. One standout tool per category, every edition.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  const cats = sortedCategories();

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
        14 categories of AI intelligence
      </h1>
      <p className="mt-3 max-w-2xl text-ink-600">
        Each category features exactly one researched, fact-checked standout
        tool per edition.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => {
          const product = productForCategory(c.slug);
          return (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="group flex flex-col rounded-2xl border border-ink-200/80 bg-white p-5 card-ring transition-all hover:border-brand-300 hover:shadow-md"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                Category {c.order.toString().padStart(2, "0")}
              </span>
              <h2 className="mt-2 text-lg font-bold text-ink-900 group-hover:text-brand-700">
                {c.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {c.coverage}
              </p>
              <span className="mt-4 text-sm font-medium text-ink-500">
                {product ? (
                  <>
                    This edition:{" "}
                    <span className="font-semibold text-ink-800">
                      {product.name}
                    </span>
                  </>
                ) : (
                  "No verified pick this edition"
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
