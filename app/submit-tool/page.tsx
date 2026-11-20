import type { Metadata } from "next";
import Link from "next/link";
import { sortedCategories } from "@/lib/content";
import { ListingForm } from "@/components/forms/listing-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `List your app — ${siteConfig.listingPrice}`,
  description:
    "Submit your AI product for a dedicated, SEO-friendly listing on aitoolslist.ai. Paid listings are clearly labelled Sponsored and never influence weekly rankings.",
  alternates: { canonical: "/submit-tool" },
};

const includes = [
  "A dedicated, indexable product profile page",
  "Full buying-decision information (features, use cases, pricing)",
  "Lead capture form routed to your inbox",
  "Editorial review before publishing",
  "Clear “Sponsored” labelling — honest and compliant",
];

export default function SubmitToolPage() {
  const categories = sortedCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <span className="text-ink-700">List your app</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-600/20">
            {siteConfig.listingPrice} listing
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            List your app here
          </h1>
          <p className="mt-3 text-ink-600">
            Reach founders, developers, product managers and enterprise buyers
            actively evaluating AI products.
          </p>

          <ul className="mt-6 space-y-3">
            {includes.map((i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  ✓
                </span>
                <span>{i}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl bg-ink-100 p-4 text-sm text-ink-600">
            Payment buys a listing opportunity, not a guaranteed weekly
            editorial selection. Paid listings never influence our independent
            rankings.
          </div>
        </div>

        <div className="rounded-2xl border border-ink-200/80 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-ink-900">Submit your listing</h2>
          <p className="mt-1 text-sm text-ink-500">
            Tell us about your product. We&apos;ll review and follow up with
            payment and next steps.
          </p>
          <div className="mt-6">
            <ListingForm categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
