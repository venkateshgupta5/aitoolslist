import Link from "next/link";
import { weeklyPicks, EDITION } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { PickCard } from "@/components/pick-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const benefits = [
  {
    title: "Curated discovery",
    body: "One standout AI product in each category — not hundreds of unfiltered listings to wade through.",
  },
  {
    title: "Verified intelligence",
    body: "Every featured product is researched against credible sources and independently fact-checked.",
  },
  {
    title: "Decision-ready insights",
    body: "Understand capabilities, use cases, pricing and ideal customers before you visit a vendor.",
  },
];

export default function HomePage() {
  const picks = weeklyPicks();

  return (
    <>
      {/* Hero */}
      <section className="hero-grid border-b border-ink-200/70">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {EDITION.name}
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-6xl">
              Find your next
              <br />
              <span className="text-brand-600">AI advantage.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
              {siteConfig.tagline}
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-ink-500">
              Independently researched. Fact-checked. Updated every week.
            </p>

            <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="#this-week"
                className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:w-auto"
              >
                See this week&apos;s picks
              </Link>
              <Link
                href="/categories"
                className="w-full rounded-lg border border-ink-300 bg-white px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50 sm:w-auto"
              >
                Browse categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* This week's picks */}
      <section id="this-week" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
              This week&apos;s picks
            </h2>
            <p className="mt-2 text-ink-600">
              13 categories · 13 standout tools · edition {EDITION.label}
            </p>
          </div>
          <Link
            href={`/weekly/${EDITION.slug}`}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            View full edition & history →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((pick) => (
            <PickCard key={pick.category.slug} pick={pick} />
          ))}
        </div>
      </section>

      {/* Why aitoolslist */}
      <section className="border-y border-ink-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            Why aitoolslist.ai
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="rounded-2xl border border-ink-200/80 bg-ink-50 p-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* List your app CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-ink-900 px-6 py-12 sm:px-12">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                List your app here — {siteConfig.listingPrice}
              </h2>
              <p className="mt-3 max-w-lg text-ink-300">
                Get a dedicated, SEO-friendly product profile and qualified
                buyer enquiries. Paid listings are clearly labelled{" "}
                <span className="font-semibold text-white">Sponsored</span> and
                never influence our independent weekly rankings.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-300">
                <li>• Dedicated indexable product page</li>
                <li>• Lead capture form routed to your inbox</li>
                <li>• Editorial review before publishing</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/submit-tool"
                className="rounded-lg bg-white px-6 py-3 text-center text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-100"
              >
                Submit your listing
              </Link>
              <p className="text-center text-xs text-ink-400">
                Payment buys a listing opportunity, not an editorial selection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-ink-200/70 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900">
            The weekly edition, in your inbox
          </h2>
          <p className="mt-3 text-ink-600">
            One email a week. The 13 picks, why they matter, and what changed.
          </p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
