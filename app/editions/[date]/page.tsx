import type { Metadata } from "next";
import Link from "next/link";
import {
  EDITION,
  editionPicks,
  editionSummary,
  getArchiveEdition,
  archiveEditions,
  archiveEditionPicks,
} from "@/lib/content";
import { PickCard } from "@/components/pick-card";
import { ArchivePickCard } from "@/components/archive-pick-card";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return [
    { date: EDITION.slug },
    ...archiveEditions.map((e) => ({ date: e.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const isCurrent = date === EDITION.slug;
  const archive = getArchiveEdition(date);
  const name = isCurrent ? EDITION.name : (archive?.name ?? `Edition — ${date}`);
  return {
    title: name,
    description: isCurrent
      ? "The curated fortnightly edition: 14 categories evaluated, one standout AI tool per category where evidence supports it — independently researched and fact-checked."
      : archive
        ? `Archive edition (${archive.label}): standout emerging AI tools, sourced from Hacker News and GitHub and fact-checked against their official sites.`
        : "Edition not found.",
    alternates: { canonical: `/editions/${date}` },
    robots: isCurrent || archive ? { index: true, follow: true } : { index: false },
  };
}

export default async function EditionPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const isCurrent = date === EDITION.slug;
  const archive = getArchiveEdition(date);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isCurrent ? EDITION.name : (archive?.name ?? ""),
    datePublished: isCurrent ? EDITION.periodStart : (archive?.periodStart ?? ""),
    url: absoluteUrl(`/editions/${date}`),
    publisher: { "@type": "Organization", name: "aitoolslist.ai" },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {(isCurrent || archive) && (
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
        <Link href="/editions" className="hover:text-ink-900">
          Editions
        </Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <span className="text-ink-700">{date}</span>
      </nav>

      {isCurrent ? (
        <CurrentEdition />
      ) : archive ? (
        <>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Archive edition · {archive.label}
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            {archive.name}
          </h1>
          <p className="mt-3 max-w-2xl text-ink-600">
            {archive.picks.length} standout picks across {14} categories.
            Backfilled per our{" "}
            <Link href="/methodology" className="font-medium text-brand-600 hover:text-brand-700">
              research methodology
            </Link>
            : candidates sourced from Hacker News and GitHub within this
            fortnight&apos;s window, then checked against each product&apos;s own
            site or repository. Every pick carries a dated evidence link.
          </p>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-relaxed text-amber-800">
            <strong className="font-semibold">Scope note:</strong> these archive
            editions predate aitoolslist.ai&apos;s live coverage (which began with
            the Nov 16–30, 2026 edition). Picks marked{" "}
            <em>Researched · pending approval</em> rest on the dated HN/GitHub
            record; <em>Verified</em> picks were additionally confirmed against
            the product&apos;s official site. They have not been through the full
            editorial fact-check applied to the current edition.
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {archiveEditionPicks(archive).map((slot) => (
              <ArchivePickCard key={slot.category.slug} slot={slot} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-10 rounded-2xl border border-ink-200/80 bg-white p-10 text-center">
          <h1 className="text-2xl font-bold text-ink-900">
            No edition for {date}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-ink-600">
            We couldn&apos;t find a published edition for this date. Browse all
            editions instead.
          </p>
          <Link
            href="/editions"
            className="mt-6 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            All editions
          </Link>
        </div>
      )}
    </div>
  );
}

function CurrentEdition() {
  const picks = editionPicks();
  const summary = editionSummary();
  return (
    <>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-600">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Published · fortnightly edition · {EDITION.label}
      </div>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        {EDITION.name}
      </h1>
      <p className="mt-3 max-w-2xl text-ink-600">
        {summary.evaluated} categories evaluated · {summary.verified} verified
        picks published. Every pick is researched and fact-checked before
        publication. We publish two editions a month — the 1st (1st–15th) and the
        16th (16th–end of month). Historical editions are preserved and never
        overwritten.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((pick) => (
          <PickCard key={pick.category.slug} pick={pick} />
        ))}
      </div>
    </>
  );
}
