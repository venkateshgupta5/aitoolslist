import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "aitoolslist.ai is a research-driven AI tool discovery and evaluation platform, not another unfiltered directory. Learn how we find, verify and rank the best AI tools.",
  alternates: { canonical: "/about" },
};

const steps = [
  { day: "Discover", activity: "Find new tools across credible sources" },
  { day: "Classify", activity: "Extract candidates and map them to categories" },
  { day: "Research & score", activity: "Enrich and score against a consistent methodology" },
  { day: "Fact-check", activity: "Independently verify shortlisted products" },
  { day: "Approve", activity: "Sign-off by a human reviewer" },
  { day: "Publish", activity: "Update the rankings, with past versions preserved" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <span className="text-ink-700">About</span>
      </nav>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        Find the right AI tool, with confidence
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-600">
        aitoolslist.ai is a discovery and evaluation platform, not another
        unfiltered AI tools directory. We help you find the right AI tool through
        the quality of our selection, the credibility of our research and the
        usefulness of the product information, independently verified and updated
        every fortnight.
      </p>

      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-ink-700">
        <p>
          Every fortnight we research standout AI tools across our taxonomy of 60
          categories in 6 segments, publishing one pick per category where the
          evidence supports it. We run two editions a month, covering the 1st–15th
          and the 16th–end of month. Each selection is researched against credible
          sources, independently fact-checked, and approved by a human editor
          before it is published.
        </p>
        <p>
          We never invent pricing, capabilities, integrations or adoption
          metrics. When something can&apos;t be verified, we say so plainly, {" "}
          <span className="font-medium text-ink-900">
            &ldquo;Not publicly disclosed&rdquo;
          </span>{" "}
          or{" "}
          <span className="font-medium text-ink-900">
            &ldquo;Not verified&rdquo;
          </span>{" "}
, rather than presenting guesses as facts. If no candidate in a
          category meets our evidence threshold, we publish no pick rather than
          forcing a weak selection.
        </p>
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold tracking-tight text-ink-900">
        How each edition comes together
      </h2>
      <ol className="mt-5 space-y-3">
        {steps.map((s) => (
          <li
            key={s.day}
            className="flex items-start gap-4 rounded-xl border border-ink-200/80 bg-white p-4"
          >
            <span className="w-24 shrink-0 text-sm font-semibold text-brand-600">
              {s.day}
            </span>
            <span className="text-sm text-ink-700">{s.activity}</span>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-2xl bg-ink-900 p-6 text-center">
        <p className="text-white">Have a tool worth featuring?</p>
        <Link
          href="/submit-tool"
          className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 hover:bg-ink-100"
        >
          List your product
        </Link>
      </div>
    </div>
  );
}
