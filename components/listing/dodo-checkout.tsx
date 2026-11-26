"use client";

import { useEffect, useRef, useState } from "react";

export type CheckoutPayload = {
  email: string;
  contactName: string;
  companyName: string;
  productName: string;
  categorySlug: string;
};

let sdkInitialized = false;

/**
 * Embedded Dodo Payments checkout. Creates a checkout session on the server
 * (which holds the API key and the fixed listing product), then renders the
 * inline payment form into #dodo-inline-checkout on this page.
 */
export function DodoInlineCheckout({ payload }: { payload: CheckoutPayload }) {
  const [status, setStatus] = useState<"loading" | "ready" | "paid" | "error">(
    "loading",
  );
  const [message, setMessage] = useState<string | null>(null);
  const [summary, setSummary] = useState<{
    productName: string;
    amount: number | null;
    currency: string;
  } | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = (await res.json().catch(() => ({}))) as {
          checkoutUrl?: string;
          error?: string;
          productName?: string;
          amount?: number | null;
          currency?: string;
        };
        if (!res.ok || !json.checkoutUrl) {
          if (!cancelled) {
            setMessage(json.error ?? "Could not start checkout.");
            setStatus("error");
          }
          return;
        }
        if (!cancelled) {
          setSummary({
            productName: json.productName ?? "Sponsored listing",
            amount: json.amount ?? null,
            currency: json.currency ?? "USD",
          });
        }

        const { DodoPayments } = await import("dodopayments-checkout");
        if (!sdkInitialized) {
          DodoPayments.Initialize({
            mode:
              process.env.NEXT_PUBLIC_DODO_MODE === "live" ? "live" : "test",
            displayType: "inline",
            onEvent: (event) => {
              switch (event.event_type) {
                case "checkout.form_ready":
                case "checkout.payment_page_opened":
                  setStatus((s) => (s === "paid" ? s : "ready"));
                  break;
                case "checkout.status": {
                  const s = String(
                    (event.data as { status?: unknown })?.status ?? "",
                  ).toLowerCase();
                  if (s === "succeeded" || s === "active") setStatus("paid");
                  break;
                }
                case "checkout.error":
                  setMessage("Payment could not be completed.");
                  setStatus((s) => (s === "paid" ? s : "error"));
                  break;
              }
            },
          });
          sdkInitialized = true;
        }

        DodoPayments.Checkout.open({
          checkoutUrl: json.checkoutUrl,
          elementId: "dodo-inline-checkout",
        });
      } catch {
        if (!cancelled) {
          setMessage("Could not start checkout. Please try again.");
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [payload]);

  if (status === "paid") {
    return (
      <div className="rounded-xl bg-emerald-50 p-6 ring-1 ring-inset ring-emerald-600/20" role="status">
        <h3 className="text-base font-semibold text-emerald-800">
          Payment received ✓
        </h3>
        <p className="mt-1.5 text-sm text-emerald-700">
          Thanks! Your listing is confirmed. We&apos;ll review and publish it,
          then email you the live URL. A receipt is on its way from Dodo
          Payments.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold text-ink-900">
          Complete your listing
        </h3>
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-500">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Secure checkout by Dodo Payments
        </span>
      </div>

      {/* Order summary — price comes from the Dodo product */}
      {summary && (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-ink-200/80 bg-white px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-900">{summary.productName}</p>
            <p className="text-xs text-ink-500">One-time payment</p>
          </div>
          <div className="shrink-0 text-right">
            {summary.amount != null ? (
              <p className="text-base font-bold text-ink-900">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: summary.currency,
                  maximumFractionDigits: 2,
                }).format(summary.amount / 100)}
              </p>
            ) : null}
            <p className="text-[11px] text-ink-400">
              Billed in your local currency at checkout
            </p>
          </div>
        </div>
      )}

      {status === "loading" && (
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-500">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink-300 border-t-brand-500" />
          Loading secure checkout…
        </p>
      )}

      {status === "error" && (
        <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-inset ring-red-600/15">
          {message}
        </div>
      )}

      {/* Dodo renders the inline payment form here */}
      <div
        id="dodo-inline-checkout"
        className="mt-4 min-h-[540px] w-full overflow-hidden rounded-xl border border-ink-200/80 bg-white"
      />
    </div>
  );
}
