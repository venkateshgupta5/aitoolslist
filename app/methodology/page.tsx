import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research methodology",
  description:
    "How aitoolslist.ai discovers, researches, scores, fact-checks and selects one standout AI product per category each edition — transparently and independently.",
  alternates: { canonical: "/methodology" },
};

const sources = [
  "Product Hunt", "Hacker News", "GitHub", "Reddit", "Peerlist", "BetaList",
  "TechCrunch", "Crunchbase", "G2", "Official sites & changelogs",
];

const weights = [
  ["Market traction & adoption", "25%"],
  ["Recent momentum", "20%"],
  ["Product innovation", "20%"],
  ["Community interest", "15%"],
  ["Practical usefulness", "10%"],
  ["Source credibility", "10%"],
];

const cadence = [
  ["Discover", "Sweep credible sources for the period's launches and signals"],
  ["Classify", "Extract candidates and map them to the 13 categories"],
  ["Research & score", "Enrich candidates and score on the consistent methodology"],
  ["Fact-check", "Independently verify shortlisted products and evidence"],
  ["Approve", "Editorial sign-off before anything is published"],
  ["Publish", "The edition goes live and is preserved permanently"],
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">Home</Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <Link href="/about" className="hover:text-ink-900">About</Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <span className="text-ink-700">Methodology</span>
      </nav>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        Our research methodology
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-600">
        Every edition features exactly one standout tool per category —
        discovered, researched, scored, fact-checked and approved before
        publication. Here is exactly how that works, and where our confidence
        ends.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">1. Discovery</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
          A discovery agent sweeps credible sources each period for emerging and
          trending products, capturing source URLs and launch/engagement
          signals. We prefer official APIs and permitted feeds and respect
          robots.txt, rate limits and copyright.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {sources.map((s) => (
            <span key={s} className="rounded-lg bg-ink-100 px-2.5 py-1 text-[13px] font-medium text-ink-700">{s}</span>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">2. Scoring</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
          Eligible candidates are scored out of 100 on a consistent, auditable
          methodology. The objective is <strong>trending and useful</strong> —
          funding is a supporting signal, never the ranking objective.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink-200/80">
          <table className="w-full text-sm">
            <tbody>
              {weights.map(([factor, w], i) => (
                <tr key={factor} className={i % 2 ? "bg-ink-50" : "bg-white"}>
                  <td className="px-4 py-2.5 text-ink-700">{factor}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-ink-900">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">3. Fact-checking & evidence</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
          Shortlisted products are independently fact-checked. We verify the
          product exists, its official URL and category are correct, and that
          claimed capabilities are supported. Our evidence standard:
        </p>
        <ul className="mt-3 space-y-2 text-[15px] text-ink-700">
          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />At least one primary source for product capabilities.</li>
          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />Official pricing source required before showing exact pricing.</li>
          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />Vendor-reported metrics are labelled as such, not presented as independent fact.</li>
          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />Unknown information appears as &ldquo;Not verified&rdquo; — we never invent it.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">4. What &ldquo;Verified&rdquo; means</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
          A <span className="font-semibold text-emerald-700">Verified</span> badge
          means a pick has been editorially approved with dated supporting
          evidence attached. It does <em>not</em> mean every claim has been
          independently audited — each product page shows a claim-level
          verification table (Confirmed / Cross-checked / Unverified /
          Vendor-reported) so our confidence is explicit, claim by claim.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">5. Publishing cadence</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
          We publish <strong>two editions a month</strong> — one on the 1st
          (covering the 1st–15th) and one on the 16th (covering the 16th to the
          end of the month). Each edition runs through the same pipeline:
        </p>
        <ol className="mt-4 space-y-2.5">
          {cadence.map(([phase, activity]) => (
            <li key={phase} className="flex items-start gap-4 rounded-xl border border-ink-200/80 bg-white p-3.5">
              <span className="w-32 shrink-0 text-sm font-semibold text-brand-600">{phase}</span>
              <span className="text-sm text-ink-700">{activity}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-ink-500">
          Each edition has a fixed date range and is never overwritten —
          historical editions stay accessible.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ink-200/80 bg-ink-50 p-6">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">Editorial independence</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
          Paid listings are clearly labelled <span className="font-semibold">Sponsored</span> and
          <span className="font-semibold"> never influence our independent editorial rankings</span>.
          Payment buys a listing opportunity, not an editorial selection. Our
          business model will never undermine the integrity of the research.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/editions/2026-11-16" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
          See the current edition
        </Link>
        <Link href="/about" className="rounded-lg border border-ink-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 hover:bg-ink-50">
          About aitoolslist.ai
        </Link>
      </div>
    </div>
  );
}
