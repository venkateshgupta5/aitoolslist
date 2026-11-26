"use client";

import { useRef, useState } from "react";
import type { Category } from "@/lib/content";
import { listingSchema } from "@/lib/validation";
import { track, LISTING_EVENTS } from "@/lib/analytics";
import {
  DodoInlineCheckout,
  type CheckoutPayload,
} from "@/components/listing/dodo-checkout";

const inputBase =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:ring-2 focus:ring-brand-500/20";
const labelClass = "block text-sm font-medium text-ink-800";

type Errors = Partial<Record<string, string>>;

function Field({
  id,
  label,
  required,
  helper,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}{" "}
        {required ? (
          <span className="text-brand-600">*</span>
        ) : (
          <span className="text-xs font-normal text-ink-400">(optional)</span>
        )}
      </label>
      {helper && <p className="mb-1.5 mt-0.5 text-xs text-ink-500">{helper}</p>}
      {!helper && <div className="mb-1.5" />}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function ListingForm({ categories }: { categories: Category[] }) {
  const [state, setState] = useState<
    "idle" | "submitting" | "checkout" | "error"
  >("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<CheckoutPayload | null>(null);
  const startedRef = useRef(false);

  function onFirstInteraction() {
    if (!startedRef.current) {
      startedRef.current = true;
      track(LISTING_EVENTS.formStart);
    }
  }

  if (state === "checkout" && checkout) {
    return (
      <div aria-live="polite">
        <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 ring-1 ring-inset ring-emerald-600/20">
          <p className="text-sm font-medium text-emerald-800">
            Details received ✓ Complete the one-time payment below to confirm
            your listing.
          </p>
        </div>
        <DodoInlineCheckout payload={checkout} />
      </div>
    );
  }

  const inputClass = (field: string) =>
    `${inputBase} ${errors[field] ? "border-red-400" : "border-ink-300 focus:border-brand-500"}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      companyName: String(data.get("companyName") ?? ""),
      productName: String(data.get("productName") ?? ""),
      websiteUrl: String(data.get("websiteUrl") ?? ""),
      categorySlug: String(data.get("categorySlug") ?? ""),
      contactName: String(data.get("contactName") ?? ""),
      email: String(data.get("email") ?? ""),
      description: String(data.get("description") ?? ""),
    };

    // Client-side validation → field-level errors (preserves entered data).
    const parsed = listingSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setState("error");
      track(LISTING_EVENTS.formError, { fields: Object.keys(fieldErrors).join(",") });
      // focus the first invalid field
      const firstKey = Object.keys(fieldErrors)[0];
      if (firstKey) form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setErrors({});
    setState("submitting");
    track(LISTING_EVENTS.formSubmit, { category: payload.categorySlug });

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json?.error ?? "Something went wrong. Please try again.");
        setState("error");
        track(LISTING_EVENTS.formError, { reason: "server" });
        return;
      }
      // Details saved — load the embedded Dodo Payments checkout.
      setCheckout({
        email: payload.email,
        contactName: payload.contactName,
        companyName: payload.companyName,
        productName: payload.productName,
        categorySlug: payload.categorySlug,
        submissionId: (json?.submissionId as string | undefined) ?? null,
      });
      setState("checkout");
    } catch {
      setServerError("Network error. Please try again.");
      setState("error");
      track(LISTING_EVENTS.formError, { reason: "network" });
    }
  }

  return (
    <form onSubmit={onSubmit} onFocusCapture={onFirstInteraction} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="companyName" label="Company name" required error={errors.companyName}>
          <input id="companyName" name="companyName" required className={inputClass("companyName")} placeholder="Acme Inc." aria-invalid={!!errors.companyName} />
        </Field>
        <Field id="productName" label="Product name" required error={errors.productName}>
          <input id="productName" name="productName" required className={inputClass("productName")} placeholder="Acme AI" aria-invalid={!!errors.productName} />
        </Field>
        <Field id="websiteUrl" label="Official website URL" required helper="Include https://, e.g. https://acme.ai" error={errors.websiteUrl}>
          <input id="websiteUrl" name="websiteUrl" type="url" inputMode="url" required className={inputClass("websiteUrl")} placeholder="https://acme.ai" aria-invalid={!!errors.websiteUrl} />
        </Field>
        <Field id="categorySlug" label="Category" required helper="Pick the closest fit, we may adjust during review." error={errors.categorySlug}>
          <select id="categorySlug" name="categorySlug" required defaultValue="" className={inputClass("categorySlug")} aria-invalid={!!errors.categorySlug}>
            <option value="" disabled>Choose a category…</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field id="contactName" label="Contact name" required error={errors.contactName}>
          <input id="contactName" name="contactName" required className={inputClass("contactName")} placeholder="Jane Doe" aria-invalid={!!errors.contactName} />
        </Field>
        <Field id="email" label="Work email" required helper="We'll send your receipt and review updates here." error={errors.email}>
          <input id="email" name="email" type="email" inputMode="email" required className={inputClass("email")} placeholder="jane@acme.ai" aria-invalid={!!errors.email} />
        </Field>
      </div>
      <Field id="description" label="Short product description" required helper="One or two sentences on what it does and who it's for. e.g. “An AI agent that drafts and sends personalized sales outreach for B2B teams.”" error={errors.description}>
        <textarea id="description" name="description" rows={3} required className={inputClass("description")} placeholder="What does your product do, and for whom?" aria-invalid={!!errors.description} />
      </Field>

      {state === "error" && serverError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-inset ring-red-600/20" role="alert">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-lg bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-ink-900/30 focus:ring-offset-2 disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting…" : "Continue to payment · $199"}
      </button>
      <p className="text-center text-xs text-ink-500">
        No charge now. You only pay the one-time $199 after your product is
        approved. Payment does not guarantee rankings, traffic or leads.
      </p>
    </form>
  );
}
