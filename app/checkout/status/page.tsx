import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment status",
  robots: { index: false, follow: false },
};

type SP = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

export default async function CheckoutStatusPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const status = first(sp.status).toLowerCase();
  const paymentId = first(sp.payment_id);
  const email = first(sp.email);

  const succeeded = status === "succeeded" || status === "active";
  const failed =
    status === "failed" || status === "expired" || status === "cancelled";
  // Anything else (processing, requires_*, or missing) → still settling.
  const pending = !succeeded && !failed;

  const accent = succeeded
    ? { ring: "ring-emerald-600/20", bg: "bg-emerald-50", text: "text-emerald-700", icon: "text-emerald-600" }
    : failed
      ? { ring: "ring-red-600/20", bg: "bg-red-50", text: "text-red-700", icon: "text-red-600" }
      : { ring: "ring-ink-300/40", bg: "bg-ink-50", text: "text-ink-600", icon: "text-ink-500" };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-4 py-16 sm:px-6">
      <div className={`rounded-2xl border border-ink-200/80 bg-white p-8 card-ring`}>
        {/* Icon */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${accent.bg} ring-1 ring-inset ${accent.ring}`}>
          {succeeded ? (
            <svg className={accent.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : failed ? (
            <svg className={accent.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg className={`${accent.icon} animate-spin`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          )}
        </div>

        {succeeded && (
          <>
            <h1 className="font-display mt-5 text-2xl font-bold tracking-tight text-ink-900">
              Payment received ✓
            </h1>
            <p className="mt-2 text-ink-600">
              Thank you — your payment is confirmed{email ? <> and a receipt is on its way to <span className="font-medium text-ink-800">{email}</span></> : null}.
            </p>

            <div className="mt-6 rounded-xl bg-ink-50 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                What happens next
              </p>
              <ol className="mt-3 space-y-3 text-sm text-ink-700">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">1</span>
                  <span>Our team will reach out to you by email within <span className="font-semibold">24 working hours</span>.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">2</span>
                  <span>Once we get the go-ahead from your end, your product listing will be <span className="font-semibold">published</span> and we&apos;ll send you the live URL.</span>
                </li>
              </ol>
            </div>

            {paymentId && (
              <p className="mt-5 text-xs text-ink-400">
                Payment reference: <span className="font-mono">{paymentId}</span>
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
                Back to home
              </Link>
              <Link href="/categories" className="rounded-lg border border-ink-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50">
                Explore categories
              </Link>
            </div>
          </>
        )}

        {failed && (
          <>
            <h1 className="font-display mt-5 text-2xl font-bold tracking-tight text-ink-900">
              Payment didn&apos;t go through
            </h1>
            <p className="mt-2 text-ink-600">
              Your payment was not completed, so you haven&apos;t been charged.
              Your product details are saved — you can try the payment again.
            </p>

            <div className="mt-6 rounded-xl bg-ink-50 p-5 text-sm text-ink-700">
              <p>
                Common reasons: the card was declined, the window was closed, or
                the session expired. You can retry with the same or a different
                payment method.
              </p>
            </div>

            {paymentId && (
              <p className="mt-5 text-xs text-ink-400">
                Reference: <span className="font-mono">{paymentId}</span>
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/submit-tool#apply" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
                Try again
              </Link>
              <Link href="/contact" className="rounded-lg border border-ink-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50">
                Contact us
              </Link>
            </div>
          </>
        )}

        {pending && (
          <>
            <h1 className="font-display mt-5 text-2xl font-bold tracking-tight text-ink-900">
              Confirming your payment…
            </h1>
            <p className="mt-2 text-ink-600">
              Your payment is being processed. This usually takes a few moments —
              we&apos;ll email you{email ? <> at <span className="font-medium text-ink-800">{email}</span></> : null} as soon as it&apos;s confirmed. You can safely
              close this page.
            </p>
            {paymentId && (
              <p className="mt-5 text-xs text-ink-400">
                Reference: <span className="font-mono">{paymentId}</span>
              </p>
            )}
            <div className="mt-6">
              <Link href="/" className="rounded-lg border border-ink-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50">
                Back to home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
