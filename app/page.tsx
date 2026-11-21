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
  allEditions,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { PickCard } from "@/components/pick-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const pillars = [
  {
    title: "Research-led discovery",
    body: "Products are identified through multiple credible sources and primary announcements, not a single feed.",
  },
  {
    title: "Evidence-backed verification",
    body: "Claims are checked against official documentation and independent sources, with vendor-reported metrics labelled.",
  },
  {
    title: "Independent evaluation",
    body: "Selections follow a transparent scoring methodology, never paid placement.",
  },
];

const listingIncludes = [
  "One-time $299, no subscription, no renewals",
  "A dedicated, permanent product profile",
  "Editorial review within 3 business days",
  "You only pay after your product is approved",
  "Clearly labelled “Sponsored”, never an editorial winner",
];

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function HomePage() {
  const picks = editionPicks();
  const summary = editionSummary();
  const cats = sortedCategories();
  const editions = allEditions();
  const topPicks = picks.filter((p) => p.product).slice(0, 5);

  const heroStats = [
    { value: summary.evaluated, label: "Categories tracked" },
    { value: summary.verified, label: "Verified this edition" },
    { value: editions.length, label: "Editions archived" },
  ];

  return (
    <>
      {/* ── Hero (first fold) ─────────────────────────────────────────── */}
      <section className="hero-dark relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hero-grid-lines" aria-hidden />
        <div className="glow-orb pointer-events-none absolute -left-28 -top-24 h-80 w-80 bg-brand-500/40" aria-hidden />
        <div className="glow-orb pointer-events-none absolute right-[-6rem] top-24 h-80 w-80 bg-violet-500/25" aria-hidden />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
          {/* Left, message */}
          <div>
            <Link
              href={`/editions/${EDITION.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur transition-colors hover:border-white/35 hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              Live edition · {EDITION.label}
              <span className="text-white/40">→</span>
            </Link>

            <h1 className="font-display mt-6 text-balance text-[2.75rem] font-semibold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl">
              The AI products
              <br />
              that actually{" "}
              <span className="italic text-brand-400">matter.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              An independent, fortnightly intelligence publication, {" "}
              <span className="text-white">researched, fact-checked and ranked</span>{" "}
              across {summary.evaluated} categories. Not another unfiltered directory.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#this-week"
                className="rounded-xl bg-brand-500 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-400"
              >
                Read this edition →
              </Link>
              <Link
                href="/categories"
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-center text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Browse {summary.evaluated} categories
              </Link>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-semibold text-white">{s.value}</dt>
                  <dd className="mt-0.5 text-xs font-medium uppercase tracking-wide text-white/50">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right, data-driven edition card visual */}
          <div className="relative">
            <div className="glow-orb pointer-events-none absolute inset-6 bg-brand-500/20" aria-hidden />
            <div className="glass relative rounded-3xl p-5 shadow-2xl sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50">
                    This edition
                  </p>
                  <p className="font-display mt-1 text-xl font-semibold text-white">
                    {EDITION.label}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
                  {summary.verified} verified
                </span>
              </div>

              <div className="mt-5 space-y-2">
                {topPicks.map((p) => (
                  <Link
                    key={p.category.slug}
                    href={`/tools/${p.product!.slug}`}
                    className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.08]"
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white ${categoryAccent(p.category.slug)}`}>
                      {initials(p.product!.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{p.product!.name}</p>
                      <p className="truncate text-[11px] text-white/45">{p.category.name}</p>
                    </div>
                    <span className="text-xs text-emerald-400">✓</span>
                  </Link>
                ))}
              </div>

              <Link
                href={`/editions/${EDITION.slug}`}
                className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.07]"
              >
                View the full edition
                <span className="text-brand-400">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Category ticker strip */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-4 sm:px-6">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-white/40">
              Tracking
            </span>
            {cats.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="text-xs font-medium text-white/55 transition-colors hover:text-brand-400"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── This edition's picks ──────────────────────────────────────── */}
      <section id="this-week" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">The edition</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              This edition&apos;s picks
            </h2>
            <p className="mt-2 text-ink-600">
              {summary.evaluated} categories evaluated · {summary.verified} verified picks · {EDITION.label}
            </p>
          </div>
          <Link href={`/editions/${EDITION.slug}`} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View full edition &amp; history →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((pick) => (
            <PickCard key={pick.category.slug} pick={pick} />
          ))}
        </div>
      </section>

      {/* ── The AI landscape this fortnight ───────────────────────────── */}
      <section className="border-y border-ink-200/60 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">Editorial · industry intelligence</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              The AI landscape this fortnight
            </h2>
            <p className="mt-2 text-ink-600">
              What moved in the AI market, kept separate from our product rankings. Funding and launches are context, not proof of product quality.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {landscape.map((item) => (
              <article key={item.headline} className="group flex flex-col rounded-2xl border border-ink-200/70 bg-paper p-6 transition-colors hover:border-brand-300">
                <span className="w-fit rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-600 ring-1 ring-inset ring-brand-100">
                  {item.topic}
                </span>
                <h3 className="font-display mt-4 text-xl font-semibold leading-snug text-ink-900">{item.headline}</h3>
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

          <div className="mt-6 overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-paper p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-700">This edition&apos;s takeaways</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {takeaways.map((t) => (
                <li key={t} className="flex gap-2.5 text-sm text-ink-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Explore categories ────────────────────────────────────────── */}
      <section id="categories" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">The map</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Explore AI by category</h2>
            <p className="mt-2 text-ink-600">Jump straight to the area you care about.</p>
          </div>
          <Link href="/categories" className="text-sm font-semibold text-brand-600 hover:text-brand-700">All categories →</Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c) => {
            const product = productForCategory(c.slug);
            return (
              <Link key={c.slug} href={`/categories/${c.slug}`} className="group flex items-start gap-4 rounded-2xl border border-ink-200/70 bg-white p-5 card-ring transition-all hover:-translate-y-0.5 hover:border-brand-300">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${categoryAccent(c.slug)}`}>
                  {c.order}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-ink-900 group-hover:text-brand-700">{c.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-500">{c.coverage}</p>
                  <p className="mt-2 text-xs text-ink-500">
                    {product ? <>This edition: <span className="font-semibold text-ink-700">{product.name}</span></> : "No verified pick this edition"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Why trust ─────────────────────────────────────────────────── */}
      <section className="border-y border-ink-200/60 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">The standard</p>
          <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Why trust aitoolslist.ai</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <div key={p.title} className="rounded-2xl border border-ink-200/70 bg-paper p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 font-display text-base font-semibold text-white">{i + 1}</div>
                <h3 className="font-display mt-4 text-lg font-semibold text-ink-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl bg-ink-900 px-6 py-5 sm:flex-row sm:items-center">
            <p className="text-sm text-ink-300">
              Paid listings are labelled <span className="font-semibold text-white">Sponsored</span> and never influence our independent editorial rankings.
            </p>
            <Link href="/methodology" className="shrink-0 text-sm font-semibold text-brand-400 hover:text-brand-300">Explore our research methodology →</Link>
          </div>
        </div>
      </section>

      {/* ── Editions archive ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">The archive</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Every edition, preserved</h2>
            <p className="mt-2 text-ink-600">Fortnightly editions are kept forever and never overwritten.</p>
          </div>
          <Link href="/editions" className="text-sm font-semibold text-brand-600 hover:text-brand-700">All editions →</Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {editions.slice(0, 6).map((e) => (
            <Link key={e.slug} href={`/editions/${e.slug}`} className="group rounded-2xl border border-ink-200/70 bg-white p-5 card-ring transition-all hover:-translate-y-0.5 hover:border-brand-300">
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${e.isCurrent ? "bg-emerald-500" : "bg-ink-300"}`} />
                <span className={`text-[11px] font-semibold uppercase tracking-wide ${e.isCurrent ? "text-emerald-700" : "text-ink-400"}`}>
                  {e.isCurrent ? "Current edition" : "Archive"}
                </span>
              </div>
              <h3 className="font-display mt-2 text-lg font-semibold text-ink-900 group-hover:text-brand-700">{e.label}</h3>
              <p className="mt-1 text-sm text-ink-500">
                {e.isCurrent ? `${e.pickCount} verified picks` : `${e.pickCount} picks`} · researched &amp; fact-checked
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── List your app ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 sm:px-12">
          <div className="glow-orb pointer-events-none absolute -right-20 -top-16 h-72 w-72 bg-brand-500/25" aria-hidden />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white">Sponsored listing</span>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">List your app here, {siteConfig.listingPrice}</h2>
              <p className="mt-3 max-w-lg text-ink-300">Reach founders, developers and buyers evaluating AI products. Here&apos;s exactly what you get:</p>
              <ul className="mt-5 space-y-2 text-sm text-ink-200">
                {listingIncludes.map((i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-brand-400">✓</span><span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/submit-tool" className="rounded-xl bg-brand-500 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-colors hover:bg-brand-400">
                Submit your listing
              </Link>
              <p className="text-center text-xs text-ink-400">A sponsored listing is an opportunity to be seen, not an editorial selection, and never an editorial winner.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────── */}
      <section className="border-t border-ink-200/60 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Stay ahead of the AI curve.</h2>
          <p className="mt-3 text-ink-600">
            One concise fortnightly briefing covering the AI products, launches and developments worth your attention.
          </p>
          <div className="mt-6">
            <NewsletterForm cta="Get the fortnightly briefing" />
          </div>
          <p className="mt-3 text-xs text-ink-400">Free. One email every two weeks. Unsubscribe anytime.</p>

          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-ink-200/70 bg-paper p-4 text-left">
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
