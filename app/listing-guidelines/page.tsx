import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, PolicySection } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Listing guidelines",
  description: "What we look for when reviewing a $199 premium listing submission, and what gets declined.",
  alternates: { canonical: "/listing-guidelines" },
};

export default function ListingGuidelinesPage() {
  return (
    <PolicyPage
      title="Listing guidelines"
      updated="November 20, 2026"
      intro="Every submission is reviewed by a human within 3 business days. Here's exactly what we look for, so you know whether your product is a fit before you apply."
    >
      <PolicySection heading="What we look for">
        <ul className="list-disc space-y-1.5 pl-5">
          <li><span className="font-semibold">It&apos;s a real, working AI product</span> with a live official website.</li>
          <li><span className="font-semibold">Clear positioning</span>, we can tell what it does and who it&apos;s for.</li>
          <li><span className="font-semibold">Accurate information</span>, claims match what the product actually does.</li>
          <li><span className="font-semibold">A genuine category fit</span> among our 62 categories.</li>
          <li><span className="font-semibold">Completeness</span>, enough detail to build a useful profile.</li>
        </ul>
      </PolicySection>
      <PolicySection heading="What gets declined">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Products that don&apos;t exist yet, or sites that don&apos;t load.</li>
          <li>Misleading or unverifiable claims (e.g. invented metrics or customers).</li>
          <li>Content that is unlawful, deceptive, or infringes others&apos; rights.</li>
          <li>Pure spam, affiliate pages, or products with no meaningful AI component.</li>
        </ul>
        <p>If we decline, you pay nothing and we&apos;ll share the reason where we can.</p>
      </PolicySection>
      <PolicySection heading="Edits & updates">
        <p>
          One structured edit round is included, and minor updates (description
          tweaks, URL changes) are free anytime, just email us. We may also edit
          for accuracy, clarity and policy compliance.
        </p>
      </PolicySection>
      <PolicySection heading="Editorial independence">
        <p>
          A paid listing is clearly labelled Sponsored and never affects our
          independent editorial picks. See our{" "}
          <Link href="/editorial-policy" className="font-medium text-brand-600 hover:text-brand-700">editorial policy</Link>.
        </p>
      </PolicySection>
      <div className="rounded-xl bg-ink-50 p-4 text-sm text-ink-600">
        Ready? <Link href="/submit-tool" className="font-semibold text-brand-600 hover:text-brand-700">Submit your product →</Link>
      </div>
    </PolicyPage>
  );
}
