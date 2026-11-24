"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "aitoolslist-announce-dismissed";

export function AnnouncementBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) !== "1") setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="relative border-b border-ink-200 bg-surface text-ink-900">
      <div className="mx-auto max-w-6xl px-10 py-2.5 text-center text-sm">
        <p className="text-ink-600">
          Building is easy, distribution is hard. Get your AI product discovered
          by buyers, search engines, and AI assistants.{" "}
          <Link
            href="/submit-tool"
            className="font-semibold text-brand-600 underline underline-offset-4 decoration-brand-300 hover:text-brand-700"
          >
            List your product →
          </Link>
        </p>
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => {
          try {
            localStorage.setItem(KEY, "1");
          } catch {
            /* ignore */
          }
          setShow(false);
        }}
        className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-900"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
