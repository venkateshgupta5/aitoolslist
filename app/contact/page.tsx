import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the aitoolslist.ai team about listings, corrections, press or general questions.",
  alternates: { canonical: "/contact" },
};

const SUPPORT_EMAIL = "hello@aitoolslist.ai";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">Home</Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <span className="text-ink-700">Contact</span>
      </nav>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Contact us</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-600">
        We&apos;re happy to help with listings, corrections, press or general
        questions.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink-200/80 bg-white p-6">
          <h2 className="text-base font-bold text-ink-900">List your product</h2>
          <p className="mt-2 text-sm text-ink-600">Submit your AI product for an editorially reviewed listing.</p>
          <Link href="/submit-tool" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700">Go to the listing form →</Link>
        </div>
        <div className="rounded-2xl border border-ink-200/80 bg-white p-6">
          <h2 className="text-base font-bold text-ink-900">Email us</h2>
          <p className="mt-2 text-sm text-ink-600">For listings, corrections, invoices or anything else.</p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700">{SUPPORT_EMAIL}</a>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-ink-50 p-4 text-sm text-ink-600">
        <span className="font-semibold text-ink-800">Corrections welcome.</span>{" "}
        If anything in a listing or edition is inaccurate, email us and we&apos;ll
        review and fix it. See our{" "}
        <Link href="/editorial-policy" className="font-medium text-brand-600 hover:text-brand-700">editorial policy</Link>.
      </div>
    </div>
  );
}
