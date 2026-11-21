"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

const KEY = "aitoolslist-cookie-consent";

/**
 * Consent-gated Google Analytics. GA (which sets cookies) only loads after the
 * visitor explicitly accepts, satisfying GDPR/UK PECR. Choice is remembered in
 * localStorage. Vercel Analytics (cookieless) runs independently.
 */
export function ConsentAnalytics({ gaId }: { gaId?: string }) {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "granted" || v === "denied") setConsent(v);
    } catch {
      /* localStorage unavailable */
    }
    setReady(true);
  }, []);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setConsent(value);
  }

  return (
    <>
      {gaId && consent === "granted" && (
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

      {ready && consent === null && (
        <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-ink-200/80 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-ink-600">
              We use privacy-friendly analytics to understand how the site is
              used. You can accept or decline analytics cookies. See our{" "}
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
                onClick={() => choose("denied")}
                className="rounded-lg border border-ink-300 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
