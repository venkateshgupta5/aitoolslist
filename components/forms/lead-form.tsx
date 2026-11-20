"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";
const labelClass = "block text-sm font-medium text-ink-700 mb-1.5";

export function LeadForm({
  productId,
  productSlug,
  productName,
}: {
  productId: string;
  productSlug: string;
  productName: string;
}) {
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  if (state === "done") {
    return (
      <div className="rounded-xl bg-emerald-50 p-6 ring-1 ring-inset ring-emerald-600/20">
        <h3 className="text-base font-semibold text-emerald-800">
          Enquiry received
        </h3>
        <p className="mt-1.5 text-sm text-emerald-700">
          Thanks for your interest in {productName}. We&apos;ve recorded your
          request and will be in touch.
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      productId,
      productSlug,
      fullName: data.get("fullName"),
      email: data.get("email"),
      location: data.get("location"),
      profession: data.get("profession"),
      message: data.get("message") || "",
      consent: data.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="fullName">
            Full name <span className="text-brand-600">*</span>
          </label>
          <input id="fullName" name="fullName" required className={inputClass} placeholder="Jane Doe" />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Work email <span className="text-brand-600">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@company.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="location">
            Location <span className="text-brand-600">*</span>
          </label>
          <input id="location" name="location" required className={inputClass} placeholder="San Francisco, USA" />
        </div>
        <div>
          <label className={labelClass} htmlFor="profession">
            Profession <span className="text-brand-600">*</span>
          </label>
          <input id="profession" name="profession" required className={inputClass} placeholder="Product Manager" />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="message">
          Message <span className="text-ink-400">(optional)</span>
        </label>
        <textarea id="message" name="message" rows={3} className={inputClass} placeholder="What would you like to know?" />
      </div>
      <label className="flex items-start gap-2.5 text-sm text-ink-600">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500" />
        <span>
          I consent to being contacted about this enquiry. <span className="text-brand-600">*</span>
        </span>
      </label>

      {state === "error" && error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-inset ring-red-600/20">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting…" : "Request information"}
      </button>
    </form>
  );
}
