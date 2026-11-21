import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, PolicySection } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Refund policy",
  description: "aitoolslist.ai refund policy for the $199 premium listing: payment is collected only after approval, with clear refund terms.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund policy"
      updated="November 20, 2026"
      intro="The $199 premium listing is a one-time payment collected only after your product is approved. This policy explains exactly when you are and aren't charged, and when refunds apply."
    >
      <PolicySection heading="You pay nothing unless approved">
        <p>
          We review every submission before any payment is taken. If we decline
          your product, you are charged nothing, there is no payment to refund.
        </p>
      </PolicySection>
      <PolicySection heading="After payment, our delivery guarantee">
        <p>
          Once approved, you receive a secure payment link for the one-time $199.
          After payment we publish your listing within 2 business days.
        </p>
        <p>
          If we fail to publish the listing we agreed, or the published listing
          materially differs from what was agreed and we cannot correct it, you
          are entitled to a <span className="font-semibold">full refund within 14 days</span> of
          payment.
        </p>
      </PolicySection>
      <PolicySection heading="After a listing is published as agreed">
        <p>
          Because the listing is a delivered service (a permanent, published
          product page), payment is non-refundable once your listing is live and
          matches what was agreed. You can still request edits, one structured
          edit round is included and minor updates are free anytime.
        </p>
      </PolicySection>
      <PolicySection heading="How to request a refund">
        <p>
          Email <a href="mailto:hello@aitoolslist.ai" className="font-medium text-brand-600 hover:text-brand-700">hello@aitoolslist.ai</a> with
          your product name and payment reference. We&apos;ll respond within 3
          business days. Refunds are issued to the original payment method.
        </p>
      </PolicySection>
      <p className="text-sm text-ink-500">
        See also our <Link href="/terms" className="font-medium text-brand-600 hover:text-brand-700">Terms of service</Link> and{" "}
        <Link href="/submit-tool" className="font-medium text-brand-600 hover:text-brand-700">listing details</Link>.
      </p>
    </PolicyPage>
  );
}
