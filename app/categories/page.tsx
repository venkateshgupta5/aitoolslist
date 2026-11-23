import type { Metadata } from "next";
import Link from "next/link";
import {
  segments,
  categoriesForSegment,
  productForCategory,
  isEditionPick,
  categoryAccent,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "All categories",
  description:
    "Browse 60 AI categories across 6 segments — infrastructure, models, agents, developer tooling, business applications and emerging AI. Researched, fact-checked picks every edition.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
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
        fact-checks standout tools across these categories — more coverage every
        fortnight.
      </p>

      {/* Segment jump nav */}
      <div className="mt-8 flex flex-wrap gap-2">
        {segments.map((s) => (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            {s.name}
          </a>
        ))}
      </div>

      <div className="mt-12 space-y-16">
        {segments.map((segment) => {
          const cats = categoriesForSegment(segment.slug);
          return (
            <section key={segment.slug} id={segment.slug} className="scroll-mt-20">
              <div className="flex flex-col gap-1 border-b border-ink-200/70 pb-4">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
                    {segment.name}
                  </h2>
                  <span className="text-sm font-medium text-ink-400">
                    {cats.length} categories
                  </span>
                </div>
                <p className="text-sm text-ink-600">{segment.tagline}</p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cats.map((c) => {
                  const product = productForCategory(c.slug);
                  return (
                    <Link
                      key={c.slug}
                      href={`/categories/${c.slug}`}
                      className="group flex items-start gap-4 rounded-2xl border border-ink-200/70 bg-white p-5 card-ring transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white ${categoryAccent(c.slug)}`}
                      >
                        {c.order}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-base font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
                          {c.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-500">
                          {c.coverage}
                        </p>
                        <p className="mt-2 text-xs">
                          {product ? (
                            isEditionPick(product) ? (
                              <span className="text-ink-500">
                                This edition:{" "}
                                <span className="font-semibold text-ink-800">
                                  {product.name}
                                </span>
                              </span>
                            ) : (
                              <span className="text-ink-400">
                                Preview:{" "}
                                <span className="font-medium text-ink-600">
                                  {product.name}
                                </span>
                              </span>
                            )
                          ) : (
                            <span className="text-ink-400">Pick coming soon</span>
                          )}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
