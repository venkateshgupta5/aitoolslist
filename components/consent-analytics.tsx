"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

const KEY = "aitoolslist-cookie-notice";

/**
 * Google Analytics loads unconditionally (not gated by the cookie notice).
 * The banner below is an informational cookie notice that the visitor
 * acknowledges; it does not gate tracking. (Vercel Analytics, cookieless,
 * runs separately via <Analytics /> in the layout.)
 *
 * NOTE: GA sets cookies, so running it without opt-in is not GDPR/UK-PECR
 * compliant for EU/UK visitors. If that matters, switch to GA Consent Mode so
 * the notice can actually toggle consent.
 */
export function ConsentAnalytics({ gaId }: { gaId?: string }) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  function acknowledge() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
            }}
          />
        </>
      )}

      {!dismissed && (
        <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-ink-200/80 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-ink-600">
              We use cookies and analytics to understand how the site is used and
              improve it. See our{" "}
              <Link
                href="/privacy"
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                privacy policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={acknowledge}
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
