import type { Metadata } from "next";
import Link from "next/link";
import { EDITION, weeklyPicks } from "@/lib/content";
import { PickCard } from "@/components/pick-card";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return [{ date: EDITION.slug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const isCurrent = date === EDITION.slug;
  return {
    title: isCurrent ? EDITION.name : `Weekly edition — ${date}`,
    description:
      "The curated weekly edition: 13 categories, 13 standout AI tools, independently researched and fact-checked.",
    alternates: { canonical: `/weekly/${date}` },
    robots: isCurrent ? { index: true, follow: true } : { index: false },
  };
}

export default async function WeeklyPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const isCurrent = date === EDITION.slug;
  const picks = weeklyPicks();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: EDITION.name,
    datePublished: EDITION.weekStart,
    url: absoluteUrl(`/weekly/${date}`),
    publisher: { "@type": "Organization", name: "aitoolslist.ai" },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {isCurrent && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <span className="text-ink-700">Weekly · {date}</span>
      </nav>

      {isCurrent ? (
        <>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Published · {EDITION.label}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {EDITION.name}
          </h1>
          <p className="mt-3 max-w-2xl text-ink-600">
            13 categories. 13 standout tools. Every pick is researched and
            fact-checked before publication. Historical editions are preserved
            and never overwritten.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((pick) => (
              <PickCard key={pick.category.slug} pick={pick} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-10 rounded-2xl border border-ink-200/80 bg-white p-10 text-center">
          <h1 className="text-2xl font-bold text-ink-900">
            No edition for {date}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-ink-600">
            We couldn&apos;t find a published weekly edition for this date. View
            the latest edition instead.
          </p>
          <Link
            href={`/weekly/${EDITION.slug}`}
            className="mt-6 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            View latest edition
          </Link>
        </div>
      )}
    </div>
  );
}
