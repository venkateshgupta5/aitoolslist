"use client";

import { useState } from "react";
import { LeadForm } from "@/components/forms/lead-form";

/**
 * De-emphasized enquiry (spec §10.2): the website CTA is primary; the full
 * lead form is collapsed behind a disclosure so it doesn't dominate the
 * informational page. Explains who receives the information.
 */
export function EnquiryDisclosure({
  productSlug,
  productName,
}: {
  productSlug: string;
  productName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-ink-200/80 bg-white p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span>
          <span className="block text-sm font-semibold text-ink-900">
            Request pricing or a demo
          </span>
          <span className="block text-xs text-ink-500">
            Optional · no account needed
          </span>
        </span>
        <span
          className={`text-ink-400 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="mt-4 border-t border-ink-200/70 pt-4">
          <p className="mb-4 text-xs leading-relaxed text-ink-500">
            Your enquiry about {productName} is recorded by aitoolslist.ai and
            used only to route your request. We never sell your details.
          </p>
          <LeadForm
            productId={productSlug}
            productSlug={productSlug}
            productName={productName}
          />
        </div>
      )}
    </div>
  );
}
