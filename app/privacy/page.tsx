import type { Metadata } from "next";
import { PolicyPage, PolicySection } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How aitoolslist.ai collects, uses and protects the information you provide.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy policy"
      updated="November 20, 2026"
      intro="We keep this simple: we collect only what we need to review your submission, contact you, and run the site — and we don't sell your data."
    >
      <PolicySection heading="What we collect">
        <ul className="list-disc space-y-1.5 pl-5">
          <li><span className="font-semibold">Listing submissions:</span> company name, product name, website, category, contact name, work email and your product description.</li>
          <li><span className="font-semibold">Product enquiries:</span> name, email, location, profession and your message.</li>
          <li><span className="font-semibold">Usage analytics:</span> privacy-friendly, aggregated page and event data via Vercel Analytics. We do not build advertising profiles.</li>
        </ul>
      </PolicySection>
      <PolicySection heading="How we use it">
        <p>
          To review and publish listings, respond to enquiries, send review
          updates and payment links, issue invoices, and improve the site. We
          contact you only about your submission or enquiry unless you opt in to
          the newsletter.
        </p>
      </PolicySection>
      <PolicySection heading="Storage & sharing">
        <p>
          Submissions are stored in our managed PostgreSQL database (Neon). We do
          not sell your personal data. We share it only with service providers
          needed to operate (e.g. hosting, payment processing) and when required
          by law.
        </p>
      </PolicySection>
      <PolicySection heading="Your choices">
        <p>
          You can request access to, correction of, or deletion of your data, and
          unsubscribe from the newsletter at any time. Email{" "}
          <a href="mailto:hello@aitoolslist.ai" className="font-medium text-brand-600 hover:text-brand-700">hello@aitoolslist.ai</a>.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
