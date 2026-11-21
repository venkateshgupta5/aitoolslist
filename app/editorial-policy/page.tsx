import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, PolicySection } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Editorial policy",
  description: "How aitoolslist.ai keeps editorial picks independent from paid listings, and our standards for accuracy and corrections.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <PolicyPage
      title="Editorial policy"
      updated="November 20, 2026"
      intro="Our credibility is the product. This policy explains how we keep editorial selections independent from money, and how we handle accuracy and corrections."
    >
      <PolicySection heading="Paid listings never buy editorial coverage">
        <p>
          Editorial picks (our fortnightly category winners) are selected on a
          transparent scoring methodology, never on payment. A{" "}
          <span className="font-semibold">$299 Sponsored listing</span> gives you a
          quality product page; it <span className="font-semibold">never</span> makes
          you a category winner, never influences rankings, and is always clearly
          labelled Sponsored.
        </p>
      </PolicySection>
      <PolicySection heading="Evidence standards">
        <p>
          Every editorial claim carries dated evidence. We prefer primary sources,
          require an official source before showing exact pricing, and label
          vendor-reported metrics as such rather than presenting them as
          independent fact. Unknowns are shown as &ldquo;Not verified&rdquo;, we don&apos;t
          invent data. See our <Link href="/methodology" className="font-medium text-brand-600 hover:text-brand-700">research methodology</Link>.
        </p>
      </PolicySection>
      <PolicySection heading="Insufficient evidence">
        <p>
          If no candidate in a category meets our threshold in a given edition, we
          publish &ldquo;No verified pick this edition&rdquo; rather than forcing a weak
          selection.
        </p>
      </PolicySection>
      <PolicySection heading="Corrections">
        <p>
          If something is inaccurate, tell us at{" "}
          <a href="mailto:hello@aitoolslist.ai" className="font-medium text-brand-600 hover:text-brand-700">hello@aitoolslist.ai</a>. We
          review and correct promptly, and we never knowingly leave an unsupported
          claim published.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
