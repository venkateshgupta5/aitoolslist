import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, PolicySection } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms governing use of aitoolslist.ai and the $299 premium product listing.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of service"
      updated="November 20, 2026"
      intro="These plain-language terms govern your use of aitoolslist.ai and the premium product listing. They're written to be clear rather than clever; for a binding agreement at scale you may wish to have them reviewed by counsel."
    >
      <PolicySection heading="What we are">
        <p>
          aitoolslist.ai is an independent AI product discovery and intelligence
          platform. We publish editorial picks and paid, clearly labelled
          Sponsored listings. The two are kept strictly separate.
        </p>
      </PolicySection>
      <PolicySection heading="The premium listing">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>The listing is a <span className="font-semibold">one-time $299 (USD)</span> charge, no subscription or renewal fees.</li>
          <li>It is collected <span className="font-semibold">only after editorial approval</span>.</li>
          <li>Listings are <span className="font-semibold">permanent</span>, they stay live for as long as we operate and your product is active.</li>
          <li>Every submission is reviewed; approval is not guaranteed.</li>
          <li>Listings are labelled Sponsored and never influence editorial rankings.</li>
        </ul>
        <p>See the <Link href="/submit-tool" className="font-medium text-brand-600 hover:text-brand-700">listing page</Link> and <Link href="/refund-policy" className="font-medium text-brand-600 hover:text-brand-700">refund policy</Link> for full details.</p>
      </PolicySection>
      <PolicySection heading="Your responsibilities">
        <p>
          You confirm the information you submit is accurate and that you have the
          right to use any names, logos and links provided. You must not submit
          misleading claims, unlawful content, or products that don&apos;t exist or
          don&apos;t function as described. See our <Link href="/listing-guidelines" className="font-medium text-brand-600 hover:text-brand-700">listing guidelines</Link>.
        </p>
      </PolicySection>
      <PolicySection heading="No guarantees of outcomes">
        <p>
          We provide a quality, discoverable product page. We do not guarantee
          search rankings, traffic, leads, sales or editorial selection. Nothing
          on this site is investment, legal or professional advice.
        </p>
      </PolicySection>
      <PolicySection heading="Content & corrections">
        <p>
          You retain ownership of your product content; you grant us a licence to
          publish it as a listing. We may edit listings for accuracy, clarity and
          policy compliance, and may remove content that breaches these terms.
          We correct errors promptly when notified.
        </p>
      </PolicySection>
      <PolicySection heading="Changes & contact">
        <p>
          We may update these terms; the &ldquo;last updated&rdquo; date reflects the
          latest version. Questions? <a href="mailto:hello@aitoolslist.ai" className="font-medium text-brand-600 hover:text-brand-700">hello@aitoolslist.ai</a>.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
