import type { Metadata } from "next";
import Link from "next/link";
import { sortedCategories } from "@/lib/content";
import { auth, signIn } from "@/auth";
import { ListingForm } from "@/components/forms/listing-form";
import { GateCta } from "@/components/listing/gate-cta";
import { ListingPageView } from "@/components/listing/page-view";
import { siteConfig } from "@/lib/site";
import {
  ProductPageMock,
  CategoryPlacementMock,
  BacklinkSeoMock,
  AiCitationMock,
  NewsletterMock,
} from "@/components/listing/visuals";

export const metadata: Metadata = {
  title: "List your product",
  description:
    "Building is easy; distribution is hard. List your AI product on aitoolslist.ai to reach high-intent buyers, improve search visibility and get discovered by AI assistants and LLMs. Submit free, pay only after approval.",
  alternates: { canonical: "/submit-tool" },
};

const PRICE = siteConfig.listingPrice;

const VISUALS = {
  product: ProductPageMock,
  category: CategoryPlacementMock,
  seo: BacklinkSeoMock,
  citation: AiCitationMock,
  newsletter: NewsletterMock,
} as const;

const benefits: {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  visual: keyof typeof VISUALS;
}[] = [
  {
    eyebrow: "Your own page",
    title: "A dedicated product page that works for you",
    body: "A clean, structured listing that showcases your product — key features, a clear description, pricing and a prominent link to your website.",
    points: [
      "Features, description and pricing, laid out clearly",
      "A prominent, clickable link straight to your site",
      "Built on the same rich template as our verified picks",
    ],
    visual: "product",
  },
  {
    eyebrow: "Premium placement",
    title: "Top placement in your category",
    body: "Premium visibility at the top of the most relevant category page — ahead of hundreds of competing AI tools.",
    points: [
      "Featured at the very top of your category",
      "Seen first by buyers browsing by use case",
      "e.g. pinned to the top of AI Image Generation",
    ],
    visual: "category",
  },
  {
    eyebrow: "SEO",
    title: "A high-quality backlink that compounds",
    body: "Build your product's online presence with a contextual backlink from your dedicated page, and support your organic search visibility.",
    points: [
      "A contextual backlink from your product page",
      "Discoverability through relevant category associations",
      "Another indexed entry point for search engines",
      "A stronger overall backlink profile",
    ],
    visual: "seo",
  },
  {
    eyebrow: "AI discovery",
    title: "Get found and cited by AI search and LLMs",
    body: "Make your product easier for AI-powered discovery systems to find, understand and reference.",
    points: [
      "A structured, publicly accessible product profile",
      "Presence across relevant AI tool categories",
      "A real chance to be cited by ChatGPT, Claude, Perplexity and Gemini",
    ],
    visual: "citation",
  },
  {
    eyebrow: "Newsletter",
    title: "Featured to an audience hunting for new tools",
    body: "Put your product in front of our newsletter readers — AI builders, founders and buyers actively discovering and adopting new tools.",
    points: [
      "Featured in our fortnightly newsletter",
      "Reach enthusiasts, professionals and potential buyers",
      "Drive extra discovery, referral traffic and sign-ups",
    ],
    visual: "newsletter",
  },
];

const terms = [
  ["Price", `One-time ${PRICE} (USD). No subscription, no renewal fees.`],
  ["Listing duration", "Permanent, stays live for as long as aitoolslist.ai operates and your product is active."],
  ["Payment timing", "Collected only after approval, via a secure payment link. Nothing is charged upfront."],
  ["Review", "A human review within 3 business days of submission."],
  ["Go live", "Within 2 business days of payment."],
  ["If not a fit", "You pay nothing. We share the reason where we can."],
  ["Edits", "One structured edit round included; minor text/URL updates anytime by email, free."],
];

const faqs = [
  ["Is the payment one-time or recurring?", "One-time. There is no subscription and no renewal fee, and your listing stays live for as long as aitoolslist.ai operates and your product remains active."],
  ["Do I pay before or after review?", "After. Submit for free; we review within 3 business days, and only send a payment link if your product is approved. If it's not a fit, you pay nothing."],
  ["Does paying guarantee rankings or traffic?", "No. Your listing is clearly marked Sponsored, never appears as an independent verified pick, and never influences our rankings. We provide a high-quality, discoverable page; outcomes depend on your product and market."],
  ["Will my page be found by search engines and AI assistants?", "It's built to be: a crawlable, indexable page with a descriptive title, meta description, canonical URL and SoftwareApplication structured data, in the predictable shape search engines and AI assistants can read and cite. We can't promise rankings."],
  ["Can I update my listing later?", "Yes. One structured edit round is included, and minor updates (description tweaks, URL changes) are free anytime, just email us."],
];

export default async function SubmitToolPage() {
  const categories = sortedCategories();
  const session = await auth();
  const user = session?.user;

  return (
    <div className="pb-4">
      <ListingPageView />

      {/* ── HERO (no price) ─────────────────────────────────────────── */}
      <section className="hero-dark relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hero-grid-lines" aria-hidden />
        <div className="glow-orb pointer-events-none absolute -left-24 -top-24 h-80 w-80 bg-brand-500/40" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 sm:py-12">
          <h1 className="font-display text-balance text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[2rem]">
            Building is easy. Distribution is the{" "}
            <span className="italic text-brand-400">hard part.</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-white/65">
            Reach high-intent buyers, improve your search visibility, and get discovered by
            AI search engines and LLMs.
          </p>

          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GateCta
              where="hero"
              className="rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-400"
            >
              List your product →
            </GateCta>
            <a
              href="#benefits"
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              See what&apos;s included
            </a>
          </div>

          <p className="mt-4 text-xs text-white/45">
            Submit free · pay only after approval · permanent listing
          </p>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────── */}
      <section id="benefits" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Everything a listing gets you
          </h2>
          <p className="mt-2 text-ink-600">
            One permanent listing, working across search, AI assistants and our own audience.
          </p>
        </div>

        <div className="mt-14 space-y-16 sm:space-y-20">
          {benefits.map((b, i) => {
            const Visual = VISUALS[b.visual];
            const reverse = i % 2 === 1;
            return (
              <div key={b.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <div className={reverse ? "lg:order-2" : ""}>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">{b.eyebrow}</p>
                  <h3 className="font-display mt-1.5 text-2xl font-semibold tracking-tight text-ink-900">{b.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{b.body}</p>
                  <ul className="mt-5 space-y-2.5">
                    {b.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[15px] text-ink-700">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={reverse ? "lg:order-1" : ""}>
                  <Visual />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PRICING (price lives here, not the header) ──────────────── */}
      <section className="border-y border-ink-200/70 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="rounded-3xl border border-ink-200/80 bg-paper p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">One clear price. No surprises.</h2>
                <p className="mt-2 max-w-lg text-ink-600">
                  A one-time fee for a permanent listing across your category page, search and AI
                  discovery. You only pay after we approve your product.
                </p>
              </div>
              <div className="shrink-0">
                <p className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold tracking-tight text-ink-900">{PRICE}</span>
                  <span className="text-sm text-ink-500">one-time</span>
                </p>
              </div>
            </div>

            <dl className="mt-8 divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-200/80 bg-white">
              {terms.map(([k, v]) => (
                <div key={k} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[170px_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold text-ink-800">{k}</dt>
                  <dd className="text-sm text-ink-600">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-xs leading-relaxed text-ink-500">
              Payment purchases the listing service, subject to approval. It does not guarantee
              search rankings, traffic, leads or sales, and your listing is always clearly labelled
              Sponsored.
            </p>

            <div className="mt-6">
              <GateCta where="pricing" className="inline-flex rounded-xl bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
                List your product →
              </GateCta>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">How it works</h2>
        <p className="mt-2 text-ink-600">Submit first, pay only if approved.</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Sign in & submit", "Sign in, then tell us about your product. No payment yet."],
            ["We review", "A human review for relevance, accuracy and quality, within 3 business days."],
            ["Approve & pay", "Approved? We send a secure payment link for the one-time fee."],
            ["Go live", "Your permanent listing goes live and we send you the URL."],
          ].map(([title, body], i) => (
            <li key={title} className="rounded-2xl border border-ink-200/80 bg-white p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-white">{i + 1}</div>
              <h3 className="mt-3 text-sm font-bold text-ink-900">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-600">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── APPLY (gated behind sign-in) ────────────────────────────── */}
      <section id="apply" className="scroll-mt-20 border-t border-ink-200/70 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">Submit your product</h2>
          {user ? (
            <>
              <p className="mt-2 text-ink-600">
                Signed in as {user.email}. Tell us about your product, we&apos;ll review and reply
                within 3 business days.
              </p>
              <div className="mt-8 rounded-2xl border border-ink-200/80 bg-ink-50 p-6 sm:p-8">
                <ListingForm categories={categories} />
              </div>
            </>
          ) : (
            <div className="mt-8 rounded-2xl border border-ink-200/80 bg-ink-50 p-8 text-center sm:p-10">
              <h3 className="font-display text-lg font-semibold text-ink-900">Sign in to list your product</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
                A quick sign-in keeps your submission secure and lets you edit it later. You still
                only pay after approval.
              </p>
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/submit-tool#apply" });
                }}
                className="mt-6"
              >
                <button className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
                  Continue with Google
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
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

        <div className="mt-10 rounded-2xl bg-ink-950 p-7 text-center">
          <p className="mx-auto max-w-xl text-white">
            When a buyer asks an AI assistant which tool to use, should your product be in the
            answer, or should that discovery go to a more visible competitor?
          </p>
          <div className="mt-5">
            <GateCta where="faq" className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-ink-900 hover:bg-ink-100">
              List your product →
            </GateCta>
          </div>
          <p className="mt-3 text-xs text-ink-400">Submit free · pay only after approval</p>
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          Prefer to look first?{" "}
          <Link href="/tools/weaviate" className="font-medium text-brand-600 hover:text-brand-700">See an example listing →</Link>
        </p>
      </section>
    </div>
  );
}
