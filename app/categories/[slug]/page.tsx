import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  categoryBySlug,
  productForCategory,
  archivePicksForCategory,
  EDITION,
} from "@/lib/content";
import { PickCard } from "@/components/pick-card";
import { ArchivePickCard } from "@/components/archive-pick-card";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} — standout AI tools`,
    description: `${category.coverage} Discover this edition's researched, fact-checked pick in ${category.name} on aitoolslist.ai.`,
    alternates: { canonical: `/categories/${slug}` },
    openGraph: {
      title: `${category.name} | aitoolslist.ai`,
      description: category.coverage,
      url: absoluteUrl(`/categories/${slug}`),
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const product = productForCategory(category.slug);
  const archive = archivePicksForCategory(category.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: absoluteUrl("/categories"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: absoluteUrl(`/categories/${slug}`),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <Link href="/categories" className="hover:text-ink-900">
          Categories
        </Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <span className="text-ink-700">{category.name}</span>
      </nav>

      <span className="mt-4 block text-[11px] font-semibold uppercase tracking-wide text-brand-600">
        Category {category.order.toString().padStart(2, "0")}
      </span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
        {category.name}
      </h1>
      <p className="mt-3 max-w-2xl text-ink-600">{category.coverage}</p>

      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-400">
          Standout picks across editions
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-500">
          The current edition&apos;s pick, highlighted, plus earlier picks in this
          category from our backfilled archive — sourced from credible outlets
          (Hacker News, GitHub, TechCrunch and more) and checked against each
          product&apos;s official site.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <PickCard
            pick={{ category, product }}
            highlightLabel={
              product
                ? `This edition's pick · ${EDITION.label}`
                : `This edition · ${EDITION.label}`
            }
          />
          {archive.map(({ editionSlug, editionLabel, pick }) => (
            <ArchivePickCard
              key={`${editionSlug}-${pick.name}`}
              slot={{ category, pick }}
              editionLabel={editionLabel}
              editionHref={`/editions/${editionSlug}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-ink-200/80 bg-white p-6">
        <h3 className="text-base font-semibold text-ink-900">
          How picks are selected
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          Candidates are scored on market traction, recent momentum, product
          innovation, community interest, practical usefulness and source
          credibility. Only researched, fact-checked products are published — if
          no candidate meets the evidence threshold, we show no pick rather than
          forcing a weak selection.
        </p>
      </div>
    </div>
  );
}
