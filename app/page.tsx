import Link from "next/link";
import {
  editionPicks,
  EDITION,
  landscape,
  takeaways,
  editionSummary,
  sortedCategories,
  productForCategory,
  categoryAccent,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { PickCard } from "@/components/pick-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const pillars = [
  {
    title: "Research-led discovery",
    body: "Products are identified through multiple credible sources and primary announcements — not a single feed.",
  },
  {
    title: "Evidence-backed verification",
    body: "Claims are checked against official documentation and independent sources, with vendor-reported metrics labelled.",
  },
  {
    title: "Independent evaluation",
    body: "Selections follow a transparent scoring methodology — never paid placement.",
  },
];

const listingIncludes = [
  "One-time $49 — no subscription",
  "A dedicated, indexable product profile",
  "Lead-capture form routed to your inbox",
  "Editorial review before it's published",
  "Permanently labelled “Sponsored” — never shown as an editorial winner",
];

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function HomePage() {
  const picks = editionPicks();
  const summary = editionSummary();
  const cats = sortedCategories();

  return (
    <>
      {/* Hero */}
      <section className="hero-grid border-b border-ink-200/70">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href={`/editions/${EDITION.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-ink-900"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {EDITION.name} →
            </Link>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl">
              Discover the AI tools
              <br />
              shaping <span className="text-brand-600">what&apos;s next.</span>
            </h1>
            <p className="mt-4 text-lg font-semibold text-ink-700">
              Researched. Evaluated. Curated.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">
              An independent fortnightly intelligence platform tracking emerging AI
              products across 13 categories.{" "}
              <Link href="/methodology" className="font-medium text-brand-600 hover:text-brand-700">
                See our methodology →
              </Link>
            </p>

            {/* trust chips */}
            <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-ink-500">
              <span>13 categories</span>
              <span className="h-1 w-1 rounded-full bg-ink-300" />
              <span>Independent research</span>
              <span className="h-1 w-1 rounded-full bg-ink-300" />
              <span>Evidence-backed picks</span>
              <span className="h-1 w-1 rounded-full bg-ink-300" />
              <span>{EDITION.label}</span>
            </div>

            <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="#this-week" className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:w-auto">
                Explore this edition&apos;s picks
              </Link>
              <Link href="#categories" className="w-full rounded-lg border border-ink-300 bg-white px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50 sm:w-auto">
                Explore categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Edition summary */}
      <section className="border-b border-ink-200/70 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-sm sm:flex-row sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            <span className="text-ink-700"><span className="font-bold text-ink-900">{summary.evaluated}</span> categories evaluated</span>
            <span className="text-ink-700"><span className="font-bold text-emerald-700">{summary.verified}</span> verified picks published</span>
            {summary.insufficient > 0 && (
              <span className="text-ink-500">{summary.insufficient} flagged insufficient</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/editions/${EDITION.slug}`} className="font-medium text-ink-600 hover:text-ink-900">{EDITION.label}</Link>
            <Link href="/methodology" className="font-medium text-brand-600 hover:text-brand-700">How we research →</Link>
          </div>
        </div>
      </section>

      {/* This edition's picks */}
      <section id="this-week" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">This edition&apos;s picks</h2>
            <p className="mt-2 text-ink-600">
              {summary.evaluated} categories evaluated · {summary.verified} verified picks published · {EDITION.label}
            </p>
          </div>
          <Link href={`/editions/${EDITION.slug}`} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View full edition & history →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((pick) => (
            <PickCard key={pick.category.slug} pick={pick} />
          ))}
        </div>
      </section>

      {/* The AI landscape this fortnight */}
      <section className="border-y border-ink-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">Editorial · industry intelligence</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">The AI landscape this fortnight</h2>
            <p className="mt-2 text-ink-600">
              What moved in the AI market — kept separate from our product rankings. Funding and launches are context, not proof of product quality.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {landscape.map((item) => (
              <article key={item.headline} className="flex flex-col rounded-2xl border border-ink-200/80 bg-ink-50 p-5">
                <span className="w-fit rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-500 ring-1 ring-inset ring-ink-200">
                  {item.topic}
                </span>
                <h3 className="mt-3 text-lg font-bold leading-snug text-ink-900">{item.headline}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.summary}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-700"><span className="font-semibold">Why it matters: </span>{item.whyItMatters}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-sm">
                  <a href={item.source.url} target="_blank" rel="noopener noreferrer nofollow" className="font-medium text-brand-600 hover:text-brand-700">
                    Source ↗
                  </a>
                  {item.href && (
                    <Link href={item.href} className="font-medium text-ink-500 hover:text-ink-900">Read our profile →</Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Edition takeaways */}
          <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50/50 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-700">This edition&apos;s takeaways</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {takeaways.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-ink-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Explore categories */}
      <section id="categories" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">Explore AI by category</h2>
            <p className="mt-2 text-ink-600">Jump straight to the area you care about.</p>
          </div>
          <Link href="/categories" className="text-sm font-semibold text-brand-600 hover:text-brand-700">All categories →</Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c) => {
            const product = productForCategory(c.slug);
            return (
              <Link key={c.slug} href={`/categories/${c.slug}`} className="group flex items-start gap-3 rounded-xl border border-ink-200/80 bg-white p-4 transition-all hover:border-brand-300 hover:shadow-sm">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white ${categoryAccent(c.slug)}`}>
                  {c.order}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-ink-900 group-hover:text-brand-700">{c.name}</h3>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-ink-500">{c.coverage}</p>
                  <p className="mt-1.5 text-xs text-ink-500">
                    {product ? <>This edition: <span className="font-medium text-ink-700">{product.name}</span></> : "No verified pick this edition"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why trust aitoolslist.ai */}
      <section className="border-y border-ink-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">Why trust aitoolslist.ai</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <div key={p.title} className="rounded-2xl border border-ink-200/80 bg-ink-50 p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">{i + 1}</div>
                <h3 className="mt-4 text-lg font-bold text-ink-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-xl bg-ink-900 px-6 py-4 sm:flex-row sm:items-center">
            <p className="text-sm text-ink-300">
              Paid listings are labelled <span className="font-semibold text-white">Sponsored</span> and never influence our independent editorial rankings.
            </p>
            <Link href="/methodology" className="shrink-0 text-sm font-semibold text-white hover:text-ink-200">Explore our research methodology →</Link>
          </div>
        </div>
      </section>

      {/* Previous editions */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">Previous editions</h2>
        <p className="mt-2 text-ink-600">Every edition is preserved and never overwritten.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href={`/editions/${EDITION.slug}`} className="group rounded-2xl border border-ink-200/80 bg-white p-5 transition-all hover:border-brand-300 hover:shadow-sm">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Current edition</span>
            </div>
            <h3 className="mt-2 font-bold text-ink-900 group-hover:text-brand-700">{EDITION.name}</h3>
            <p className="mt-1 text-sm text-ink-500">{summary.verified} verified picks · {EDITION.label}</p>
          </Link>
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 p-5 text-center text-sm text-ink-400 sm:col-span-2 lg:col-span-1">
            Earlier editions will appear here as they publish.
          </div>
        </div>
      </section>

      {/* List your app */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-ink-900 px-6 py-12 sm:px-12">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white">Sponsored listing</span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">List your app here — {siteConfig.listingPrice}</h2>
              <p className="mt-3 max-w-lg text-ink-300">Reach founders, developers and buyers evaluating AI products. Here&apos;s exactly what you get:</p>
              <ul className="mt-5 space-y-2 text-sm text-ink-200">
                {listingIncludes.map((i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-emerald-400">✓</span><span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/submit-tool" className="rounded-lg bg-white px-6 py-3 text-center text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-100">
                Submit your listing
              </Link>
              <p className="text-center text-xs text-ink-400">A sponsored listing is an opportunity to be seen — not an editorial selection, and never an editorial winner.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-ink-200/70 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">Stay ahead of the AI curve.</h2>
          <p className="mt-3 text-ink-600">
            One concise fortnightly briefing covering the AI products, launches and developments worth your attention.
          </p>
          <div className="mt-6">
            <NewsletterForm cta="Get the fortnightly briefing" />
          </div>
          <p className="mt-3 text-xs text-ink-400">Free. One email every two weeks. Unsubscribe anytime.</p>

          <div className="mx-auto mt-8 max-w-md rounded-xl border border-ink-200/80 bg-ink-50 p-4 text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Latest edition preview</p>
            <p className="mt-1 text-sm font-semibold text-ink-800">{EDITION.name}</p>
            <p className="mt-1 text-sm text-ink-600">
              {picks.filter((p) => p.product).slice(0, 3).map((p) => p.product!.name).join(" · ")} and {summary.verified - 3} more.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
