import Link from "next/link";
import {
  editionPicks,
  EDITION,
  landscape,
  takeaways,
  editionSummary,
  segments,
  categoriesForSegment,
  productForCategory,
  isEditionPick,
  allEditions,
  products,
  archiveEditions,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { PickCard } from "@/components/pick-card";
import { ToolLogo } from "@/components/tool-logo";
import { VisibilityCheck } from "@/components/visibility-check";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const faqItems = [
  {
    q: "Do AI assistants actually read listings like this?",
    a: "More and more, yes. When someone asks a model which tool to use, it answers from structured sources it can parse. Our profiles keep the verdict, pricing, alternatives and trade-offs in the same fixed shape, which is exactly what a model can quote and credit back to you.",
  },
  {
    q: "What do I actually get for the fee?",
    a: "A permanent, human-reviewed profile, with no SDK, no integration and nothing to maintain. The page itself is the visibility: a citable, structured source an assistant can pull from when someone asks what to use. A product that is not in it simply cannot be named.",
  },
];

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
  "One-time $199, no subscription, no renewals",
  "A dedicated, permanent product profile",
  "Editorial review within 3 business days",
  "You only pay after your product is approved",
  "Clearly labelled “Sponsored”, never an editorial winner",
];

// Accent colour per top-level segment (icons only; no fabricated branding).
const segmentAccents = [
  "bg-indigo-600",
  "bg-sky-600",
  "bg-violet-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
];


export default function HomePage() {
  const picks = editionPicks();
  const summary = editionSummary();
  const editions = allEditions();
  const picksWithProducts = picks.filter((p) => isEditionPick(p.product));
  const topPicks = picksWithProducts.slice(0, 5);

  const heroTrust = [
    "Independently researched and verified",
    "Evidence-backed comparisons",
    "Fresh discoveries and rankings every fortnight",
  ];

  const answerEngines = ["ChatGPT", "Claude", "Perplexity", "Gemini", "Copilot"];

  const catalogue = [
    ...products.map((p) => ({ name: p.name, href: `/tools/${p.slug}` })),
    ...archiveEditions.flatMap((e) =>
      e.picks.map((pk) => ({ name: pk.name, href: `/editions/${e.slug}` })),
    ),
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

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
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                Updated every fortnight
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/55">
                Independent · no paid rankings
              </span>
            </div>

            <h1 className="font-display mt-6 text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[3.4rem] lg:text-[4rem]">
              Thousands of AI tools.
              <br />
              One place to{" "}
              <span className="relative italic text-brand-400">
                find the right one.
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-brand-500 to-transparent" aria-hidden />
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Discover and evaluate the world&apos;s best AI products across {summary.categoriesTotal} categories.
              Whether you&apos;re building, creating, automating, researching or scaling your business, find the
              right AI tool, backed by{" "}
              <span className="text-white">independent research, evidence and expert evaluation</span>.
            </p>

            {/* Trust chips */}
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {heroTrust.map((t) => (
                <li key={t} className="flex items-center gap-1.5 text-[13px] text-white/60">
                  <svg className="h-3.5 w-3.5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/categories"
                className="rounded-xl bg-brand-500 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-400"
              >
                Find the best AI tool →
              </Link>
              <Link
                href="#categories"
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-center text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Explore all {summary.categoriesTotal} categories
              </Link>
            </div>

            {/* AI answer-engine hook */}
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wide text-white/35">
                Structured to be cited by
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {answerEngines.map((e) => (
                  <span key={e} className="text-[13px] font-semibold text-white/65">{e}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right, data-driven edition card visual */}
          <div className="relative">
            <div className="glow-orb pointer-events-none absolute inset-6 bg-brand-500/20" aria-hidden />
            <div className="glass relative rounded-3xl p-5 shadow-2xl sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                    Top verified picks
                  </p>
                  <p className="font-display mt-1 text-xl font-semibold text-white">
                    Updated {EDITION.label}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
                  {summary.verified} verified
                </span>
              </div>

              {/* Coverage micro-bar */}
              <div className="mt-4">
                <div className="flex h-1.5 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="bg-emerald-400"
                    style={{ width: `${(summary.verified / summary.categoriesTotal) * 100}%` }}
                  />
                  <span
                    className="bg-brand-400/70"
                    style={{ width: `${(summary.previewed / summary.categoriesTotal) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] text-white/45">
                  <span className="text-emerald-300">{summary.verified} verified</span>
                  {summary.previewed > 0 && (
                    <> · <span className="text-brand-300">{summary.previewed} curated previews</span></>
                  )}{" "}
                  · across {summary.categoriesTotal} categories
                </p>
              </div>

              <div className="mt-5 space-y-2">
                {topPicks.map((p) => (
                  <Link
                    key={p.category.slug}
                    href={`/tools/${p.product!.slug}`}
                    className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.08]"
                  >
                    <ToolLogo name={p.product!.name} logo={p.product!.logo} categorySlug={p.category.slug} size={36} className="rounded-lg" />
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
                See all verified picks
                <span className="text-brand-400">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Segment ticker strip */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-4 sm:px-6">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-white/40">
              {summary.categoriesTotal} categories across
            </span>
            {segments.map((s) => (
              <Link
                key={s.slug}
                href={`/categories#${s.slug}`}
                className="text-xs font-medium text-white/55 transition-colors hover:text-brand-400"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── This edition's picks ──────────────────────────────────────── */}
      <section id="this-week" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">Top picks right now</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              The best AI tools, verified
            </h2>
            <p className="mt-2 text-ink-600">
              {summary.verified} independently verified picks across {summary.categoriesTotal} categories · refreshed {EDITION.label}
            </p>
          </div>
          <Link href="/categories" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            Browse all tools &amp; categories →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {picksWithProducts.map((pick) => (
            <PickCard key={pick.category.slug} pick={pick} />
          ))}
        </div>
      </section>

      {/* ── The AI landscape this fortnight ───────────────────────────── */}
      <section className="border-y border-ink-200/60 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">Context · what&apos;s moving</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              The AI landscape right now
            </h2>
            <p className="mt-2 text-ink-600">
              What moved in the AI market, kept separate from our tool rankings. Funding and launches are context, not proof of product quality.
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
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-700">Key takeaways this fortnight</p>
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

      {/* ── The full map: segments → categories → tools ───────────────── */}
      <section id="categories" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">The map</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">The AI landscape, mapped</h2>
            <p className="mt-2 max-w-2xl text-ink-600">
              {summary.categoriesTotal} categories across {summary.segmentsTotal} segments, each with a researched, verified tool profile. One standout per category, every fortnight.
            </p>
          </div>
          <Link href="/categories" className="shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700">All categories →</Link>
        </div>

        <div className="mt-10 space-y-10">
          {segments.map((s) => {
            const segCats = categoriesForSegment(s.slug);
            const accent = segmentAccents[(s.order - 1) % segmentAccents.length];
            return (
              <div key={s.slug}>
                <div className="flex items-center gap-3 border-b border-ink-200/70 pb-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${accent}`}>
                    {s.order}
                  </div>
                  <Link href={`/categories#${s.slug}`} className="font-display text-lg font-semibold tracking-tight text-ink-900 hover:text-brand-700">
                    {s.name}
                  </Link>
                  <span className="text-xs font-medium text-ink-400">{segCats.length} categories</span>
                </div>
                <div className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                  {segCats.map((c) => {
                    const product = productForCategory(c.slug);
                    const verified = isEditionPick(product);
                    return (
                      <Link
                        key={c.slug}
                        href={`/categories/${c.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-ink-50"
                      >
                        <span className="truncate text-sm font-medium text-ink-800 group-hover:text-brand-700">
                          {c.name}
                        </span>
                        <span className="flex shrink-0 items-center gap-1.5 text-xs text-ink-500">
                          {product && (
                            <span className="max-w-[9rem] truncate">{product.name}</span>
                          )}
                          {verified && <span className="text-emerald-500">✓</span>}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
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
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">Track the changes</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">How the rankings have evolved</h2>
            <p className="mt-2 text-ink-600">Every fortnight&apos;s rankings are kept, so you can see how the landscape shifts over time.</p>
          </div>
          <Link href="/editions" className="text-sm font-semibold text-brand-600 hover:text-brand-700">All rankings →</Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {editions.slice(0, 6).map((e) => (
            <Link key={e.slug} href={`/editions/${e.slug}`} className="group rounded-2xl border border-ink-200/70 bg-white p-5 card-ring transition-all hover:-translate-y-0.5 hover:border-brand-300">
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${e.isCurrent ? "bg-emerald-500" : "bg-ink-300"}`} />
                <span className={`text-[11px] font-semibold uppercase tracking-wide ${e.isCurrent ? "text-emerald-700" : "text-ink-400"}`}>
                  {e.isCurrent ? "Latest" : "Archive"}
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

      {/* ── Get listed ────────────────────────────────────────────────── */}
      <section id="get-listed" className="border-y border-ink-200/60 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">For product makers</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Get your product listed</h2>
          <p className="mt-2 max-w-2xl text-ink-600">
            Distribution is the moat. A listing here is a researched, permanent
            profile that search engines and AI assistants can crawl and cite, not a
            row in a directory. Submit in a minute, and only pay if we approve it.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* How it works */}
            <div>
              <ol className="space-y-5">
                {[
                  ["Submit", "Tell us about your product. No account, nothing to install, no payment up front."],
                  ["Human review", "A real editor checks it within three business days. If it is not a fit, you pay nothing."],
                  ["Live for good", "You get a permanent, structured profile that buyers and AI assistants can read and cite."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink-900">{t}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Your profile shows up across</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Its category page",
                    "The fortnightly rankings",
                    "A permanent product page",
                    "Rival comparisons",
                    "Answers AI assistants cite",
                  ].map((c) => (
                    <span key={c} className="rounded-full border border-ink-200 bg-paper px-3 py-1 text-xs font-medium text-ink-600">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing panel */}
            <div className="flex flex-col rounded-2xl border border-ink-200/70 bg-paper p-6">
              <p className="flex items-baseline gap-2 text-ink-500">
                <span className="text-sm">from</span>
                <span className="text-4xl font-semibold text-ink-900">{siteConfig.listingPrice}</span>
                <span className="text-sm">one-time</span>
              </p>
              <ul className="mt-5 space-y-3 text-sm text-ink-700">
                {[
                  "One payment. The page does not expire.",
                  "Human-reviewed, refunded if we decline it.",
                  "Marked sponsored, and kept out of our editorial rankings.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <svg className="mt-0.5 shrink-0 text-emerald-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2">
                <Link href="/submit-tool" className="rounded-lg bg-brand-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-700">List your product</Link>
                <Link href="/tools/lago" className="rounded-lg border border-ink-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50">See an example listing</Link>
              </div>
              <p className="mt-5 border-t border-ink-100 pt-4 text-xs text-ink-400">
                {summary.categoriesTotal} categories across {summary.segmentsTotal} segments, researched and fact-checked every fortnight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI visibility ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">AI visibility</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Ask an AI what to use. Is your product in the answer?
          </h2>
          <p className="mt-4 text-ink-600">
            Founders, product leaders and finance teams increasingly ask ChatGPT or
            Claude to compare and shortlist vendors before they ever visit a website.
            The assistant answers from the structured sources it can read, so the
            shortlist exists before anyone lands on your page. If your product is not
            in one of those sources, it cannot be named, however good it is. Every
            profile here is written in the same shape, verdict, pricing, alternatives,
            strengths and limits, so a model can lift a line and credit it to you.
          </p>
        </div>

        {/* Live catalogue check */}
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-ink-200/70 bg-white p-5 card-ring">
          <p className="text-sm font-semibold text-ink-900">Is your product in the catalogue?</p>
          <p className="mt-1 text-sm text-ink-600">
            Type a name to see whether an assistant reading us would find it, and where.
          </p>
          <VisibilityCheck items={catalogue} />
        </div>

        {/* FAQ (visible, backs the FAQPage schema) */}
        <dl className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {faqItems.map((f) => (
            <div key={f.q} className="rounded-2xl border border-ink-200/70 bg-white p-6 card-ring">
              <dt className="text-base font-semibold text-ink-900">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── List your product ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 sm:px-12">
          <div className="glow-orb pointer-events-none absolute -right-20 -top-16 h-72 w-72 bg-brand-500/25" aria-hidden />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white">Sponsored listing</span>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">List your product here, {siteConfig.listingPrice}</h2>
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
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Never miss a great AI tool.</h2>
          <p className="mt-3 text-ink-600">
            Get our freshest verified picks and new-tool discoveries in your inbox, once every fortnight.
          </p>
          <div className="mt-6">
            <NewsletterForm cta="Get fortnightly tool alerts" />
          </div>
          <p className="mt-3 text-xs text-ink-400">Free. One email every two weeks. Unsubscribe anytime.</p>

          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-ink-200/70 bg-paper p-4 text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Latest verified picks</p>
            <p className="mt-1 text-sm font-semibold text-ink-800">Updated {EDITION.label}</p>
            <p className="mt-1 text-sm text-ink-600">
              {picks.filter((p) => p.product).slice(0, 3).map((p) => p.product!.name).join(" · ")} and {summary.verified - 3} more.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
