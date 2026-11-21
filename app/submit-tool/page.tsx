import type { Metadata } from "next";
import Link from "next/link";
import {
  sortedCategories,
  categories as allCategories,
  products,
} from "@/lib/content";
import { ListingForm } from "@/components/forms/listing-form";
import { ListingCta } from "@/components/listing/cta-button";
import { ListingPageView } from "@/components/listing/page-view";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `List your product, ${siteConfig.listingPrice} premium listing`,
  description:
    "Get your AI product a permanent, editorially reviewed listing on aitoolslist.ai for a one-time $199. Submit for review, you only pay after approval. Payment never guarantees rankings, traffic or leads.",
  alternates: { canonical: "/submit-tool" },
};

const PRICE = "$199";

// Operational deliverables only (spec §3: A–E). We do NOT sell homepage,
// newsletter or social promotion, that would compromise editorial independence.
const deliverables = [
  {
    key: "A",
    title: "Dedicated product profile",
    body: "A structured product page with your name, description, website, category, features, use cases and any pricing you supply, on the same rich template as our editorial picks.",
  },
  {
    key: "B",
    title: "Category placement",
    body: "Placement in the most relevant AI category so visitors browsing by use case and capability can find you.",
  },
  {
    key: "C",
    title: "Built for search and AI discovery",
    body: "A crawlable, indexable page with a descriptive title, meta description, canonical URL and SoftwareApplication structured data, written in the predictable shape that search engines and AI assistants can read and cite when someone asks what to use. (We can't promise rankings.)",
  },
  {
    key: "D",
    title: "Editorial review",
    body: "A human review for relevance, accuracy, completeness and quality, within 3 business days. Clear criteria, no black box.",
  },
  {
    key: "E",
    title: "Prominent website link",
    body: "A clear, prominent link from your profile to your official website so interested visitors can go straight to you.",
  },
  {
    key: "F",
    title: "Sponsored, honestly labelled",
    body: "Your listing is clearly marked “Sponsored.” It never appears as an editorial pick and never influences our independent rankings, which is exactly what keeps the platform worth being listed on.",
  },
];

const terms = [
  ["Price", "One-time $199 (USD). No subscription, no renewal fees."],
  ["Listing duration", "Permanent, stays live for as long as aitoolslist.ai operates and your product is active."],
  ["Payment timing", "Collected only after editorial approval, via a secure payment link. Nothing is charged upfront."],
  ["Editorial review", "Required. Within 3 business days of submission."],
  ["Publication", "Within 2 business days of payment."],
  ["If rejected", "You pay nothing. We share the reason where we can."],
  ["Edits", "One structured edit round included; minor text/URL updates anytime by email, free."],
  ["Invoice & taxes", "Invoice available on request. Any applicable taxes are shown at invoicing."],
];

const faqs = [
  ["Why does listing my product cost $199?", "It pays for a human editorial review and a permanent, structured, SEO-ready profile on a curated platform, not an auto-published row in an unfiltered directory. You're buying credibility and a real product page, not just a link."],
  ["Is the $199 payment one-time or recurring?", "One-time. There is no subscription and no renewal fee."],
  ["How long will my product remain listed?", "Permanently, your listing stays live for as long as aitoolslist.ai operates and your product remains active. We don't call it “lifetime,” but there's no expiry or renewal charge."],
  ["What is included in the listing?", "A dedicated product profile, category placement, a search-friendly (crawlable, indexable) page, a prominent link to your website, one structured edit round, and a human editorial review. It's clearly labelled Sponsored."],
  ["How long does editorial review take?", "Within 3 business days of your submission. If approved, we email you a payment link; after payment we publish within 2 business days."],
  ["Is every submission guaranteed approval?", "No. Every submission is reviewed for relevance, accuracy and quality. Payment does not guarantee approval, and we only collect payment after approval."],
  ["What happens if my product is rejected?", "You pay nothing, since payment is collected only after approval. Where we can, we'll tell you why so you can reapply."],
  ["Can I update my product information after publication?", "Yes. One structured edit round is included, and minor updates (description tweaks, URL changes) are free anytime, just email us."],
  ["Will my listing be indexed by search engines?", "Your page is built to be crawlable and indexable, with a descriptive title, meta description, canonical URL and structured data. We cannot and do not guarantee search rankings."],
  ["Do you guarantee traffic, leads or sales?", "No. We never promise traffic, leads, conversions or rankings. We provide a quality, discoverable product page on a curated platform, outcomes depend on your product and market."],
  ["Can I receive an invoice?", "Yes, an invoice is available on request, issued when you complete payment after approval."],
];

const flow = [
  ["Submit", "Tell us about your product using the form below. No payment yet."],
  ["Editorial review", "We review for relevance, accuracy and quality within 3 business days."],
  ["Approval or decline", "We email you the outcome. If declined, you pay nothing."],
  ["Payment", "Approved? We send a secure payment link for the one-time $199."],
  ["Published", "We publish your listing and send you the live URL."],
];

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function SubmitToolPage() {
  const categories = sortedCategories();
  const verifiedCount = products.filter((p) => p.verification === "verified").length;

  return (
    <div className="pb-4">
      <ListingPageView />

      {/* 2. HERO */}
      <section className="hero-grid border-b border-ink-200/70">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <nav className="text-sm text-ink-500">
            <Link href="/" className="hover:text-ink-900">Home</Link>{" "}
            <span className="text-ink-300">/</span>{" "}
            <span className="text-ink-700">List your product</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-start">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
                Premium AI product listing
              </span>
              <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl">
                Your AI product deserves more than another directory listing.
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-600">
                Your buyers now ask ChatGPT and Claude to compare and shortlist
                vendors before they ever reach your site. Get a structured,
                editorially reviewed profile that search engines and AI assistants
                can crawl and cite, so founders, product leaders and finance teams
                discover you when it counts.
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold tracking-tight text-ink-900">{PRICE}</span>
                <span className="text-sm text-ink-500">· one-time · premium product listing</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <ListingCta where="hero" className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:ring-offset-2">
                  Submit your product · {PRICE}
                </ListingCta>
              </div>
              <p className="mt-3 max-w-xl text-xs leading-relaxed text-ink-500">
                Editorial review required. You only pay after approval. Payment
                does not guarantee approval, rankings or customer acquisition.
              </p>
            </div>

            {/* Right: What's included summary */}
            <div className="rounded-2xl border border-ink-200/80 bg-white p-6">
              <h2 className="text-sm font-semibold text-ink-900">What&apos;s included</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-700">
                {deliverables.slice(0, 6).map((d) => (
                  <li key={d.key} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">✓</span>
                    <span><span className="font-medium text-ink-900">{d.title}.</span> {d.body.split(".")[0]}.</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT YOU GET */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">Everything your product needs to stand out.</h2>
        <p className="mt-2 max-w-2xl text-ink-600">Concrete deliverables, every one is operational today. We don&apos;t sell homepage features, newsletter slots or social promotion, because paid placement must never masquerade as editorial.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((d) => (
            <div key={d.key} className="rounded-2xl border border-ink-200/80 bg-white p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand-700">{d.key}</div>
              <h3 className="mt-4 text-base font-bold text-ink-900">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LISTING PREVIEW */}
      <section className="border-y border-ink-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">See what your product listing will look like.</h2>
          <p className="mt-2 max-w-2xl text-ink-600">An illustrative example of the real listing template. This sample is not a paid placement, it shows the fields a published profile supports.</p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-ink-200/80 bg-ink-50">
            <div className="flex items-center gap-2 border-b border-ink-200/80 bg-white px-4 py-2 text-xs text-ink-400">
              <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
              <span className="ml-2">aitoolslist.ai/tools/your-product</span>
              <span className="ml-auto rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">Illustrative</span>
            </div>
            <div className="p-6">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">AI Agents</span>
              <div className="mt-2 flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-base font-bold text-white">YP</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">Your Product</h3>
                    <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-semibold text-ink-600">Sponsored</span>
                  </div>
                  <p className="text-sm text-ink-500">Your one-line positioning statement</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-3 ring-1 ring-ink-200/70">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">At a glance</p>
                  <p className="mt-1 text-sm text-ink-700">Category · Product type · Pricing · Website</p>
                </div>
                <div className="rounded-lg bg-white p-3 ring-1 ring-ink-200/70">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Key features & use cases</p>
                  <p className="mt-1 text-sm text-ink-700">What it does, who it&apos;s for, how it&apos;s used</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Visit website ↗</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-500">
            Want to see a real, published profile?{" "}
            <Link href="/tools/weaviate" className="font-medium text-brand-600 hover:text-brand-700">View an editorial example →</Link>
          </p>
        </div>
      </section>

      {/* 5. CREDIBILITY & AUDIENCE */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">Built for people discovering and evaluating AI products.</h2>
        <p className="mt-2 max-w-2xl text-ink-600">
          We&apos;re a new platform (launched November 2026), so we won&apos;t quote
          traffic or audience numbers we can&apos;t yet verify. Instead, here&apos;s
          exactly what you&apos;re joining.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-ink-200/80 bg-white p-5">
            <p className="font-display text-3xl font-semibold tracking-tight text-ink-900">{allCategories.length}</p>
            <p className="mt-1 text-sm text-ink-600">curated AI categories</p>
          </div>
          <div className="rounded-2xl border border-ink-200/80 bg-white p-5">
            <p className="font-display text-3xl font-semibold tracking-tight text-ink-900">{verifiedCount}</p>
            <p className="mt-1 text-sm text-ink-600">editorially verified listings (as of Nov 2026)</p>
          </div>
          <div className="rounded-2xl border border-ink-200/80 bg-white p-5">
            <p className="font-display text-3xl font-semibold tracking-tight text-ink-900">100%</p>
            <p className="mt-1 text-sm text-ink-600">of listings human-reviewed before publishing</p>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3 text-sm leading-relaxed text-ink-600">
          <p><span className="font-semibold text-ink-900">Curation over volume.</span> One standout tool per category each edition, we publish research, not an unfiltered list.</p>
          <p><span className="font-semibold text-ink-900">A real taxonomy.</span> 14 well-defined categories so buyers browse by genuine use case and capability.</p>
          <p><span className="font-semibold text-ink-900">Editorial standards.</span> Evidence-backed, dated, with vendor claims clearly labelled. <Link href="/methodology" className="font-medium text-brand-600 hover:text-brand-700">See our methodology →</Link></p>
        </div>
      </section>

      {/* 6. PRICING & TERMS */}
      <section className="border-y border-ink-200/70 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">One clear price. No surprises.</h2>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-3xl font-semibold tracking-tight text-ink-900">{PRICE}</span>
            <span className="text-sm text-ink-500">· premium AI product listing · one-time</span>
          </div>

          <dl className="mt-8 divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-200/80">
            {terms.map(([k, v]) => (
              <div key={k} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-ink-800">{k}</dt>
                <dd className="text-sm text-ink-600">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-xl bg-ink-100 p-4 text-sm leading-relaxed text-ink-600">
            Payment purchases the specified listing service, subject to editorial
            approval. It does not guarantee search rankings, traffic, leads,
            sales or editorial selection.
          </div>

          <div className="mt-6">
            <ListingCta where="pricing" className="inline-flex rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:ring-offset-2">
              Submit your product · {PRICE}
            </ListingCta>
          </div>
        </div>
      </section>

      {/* 8. FLOW */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">How it works</h2>
        <p className="mt-2 text-ink-600">Submit first, pay only if approved. Five simple steps.</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {flow.map(([title, body], i) => (
            <li key={title} className="rounded-2xl border border-ink-200/80 bg-white p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-white">{i + 1}</div>
              <h3 className="mt-3 text-sm font-bold text-ink-900">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-600">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 7. SUBMISSION FORM */}
      <section id="apply" className="scroll-mt-20 border-t border-ink-200/70 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">Submit your product</h2>
          <p className="mt-2 text-ink-600">Tell us about your product. Our team will review your submission and contact you with the next steps, usually within 3 business days.</p>
          <div className="mt-8 rounded-2xl border border-ink-200/80 bg-ink-50 p-6 sm:p-8">
            <ListingForm categories={categories} />
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">Frequently asked questions</h2>
        <div className="mt-8 divide-y divide-ink-200/70">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-ink-900">
                {q}
                <span className="text-ink-400 transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-ink-900 p-6 text-center">
          <p className="text-white">When a buyer shortlists AI vendors today, should your product be on the list, or should that discovery go to a more visible competitor?</p>
          <ListingCta where="faq" className="mt-4 inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 hover:bg-ink-100">
            Submit your product · {PRICE}
          </ListingCta>
        </div>
      </section>
    </div>
  );
}
