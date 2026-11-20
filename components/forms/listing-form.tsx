"use client";

import { useState } from "react";
import type { Category } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const inputClass =
  "w-full rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";
const labelClass = "block text-sm font-medium text-ink-700 mb-1.5";

export function ListingForm({ categories }: { categories: Category[] }) {
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  if (state === "done") {
    return (
      <div className="rounded-xl bg-emerald-50 p-6 ring-1 ring-inset ring-emerald-600/20">
        <h3 className="text-base font-semibold text-emerald-800">
          Listing request received
        </h3>
        <p className="mt-1.5 text-sm text-emerald-700">
          Thanks! We&apos;ve recorded your submission. Our team will review it
          and follow up with payment and next steps. Payment is only taken after
          review, and a paid listing never influences our weekly rankings.
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);
    const data = new FormData(e.currentTarget);
    const payload = {
      companyName: data.get("companyName"),
      productName: data.get("productName"),
      websiteUrl: data.get("websiteUrl"),
      contactName: data.get("contactName"),
      email: data.get("email"),
      categorySlug: data.get("categorySlug"),
      description: data.get("description") || "",
    };
    try {
      const res = await fetch("/api/listings", {
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
          <label className={labelClass} htmlFor="companyName">
            Company name <span className="text-brand-600">*</span>
          </label>
          <input id="companyName" name="companyName" required className={inputClass} placeholder="Acme Inc." />
        </div>
        <div>
          <label className={labelClass} htmlFor="productName">
            Product name <span className="text-brand-600">*</span>
          </label>
          <input id="productName" name="productName" required className={inputClass} placeholder="Acme AI" />
        </div>
        <div>
          <label className={labelClass} htmlFor="websiteUrl">
            Website URL <span className="text-brand-600">*</span>
          </label>
          <input id="websiteUrl" name="websiteUrl" type="url" required className={inputClass} placeholder="https://acme.ai" />
        </div>
        <div>
          <label className={labelClass} htmlFor="categorySlug">
            Category <span className="text-brand-600">*</span>
          </label>
          <select id="categorySlug" name="categorySlug" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Choose a category
            </option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="contactName">
            Contact name <span className="text-brand-600">*</span>
          </label>
          <input id="contactName" name="contactName" required className={inputClass} placeholder="Jane Doe" />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email <span className="text-brand-600">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@acme.ai" />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="description">
          Short description <span className="text-ink-400">(optional)</span>
        </label>
        <textarea id="description" name="description" rows={3} className={inputClass} placeholder="What does your product do?" />
      </div>

      {state === "error" && error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-inset ring-red-600/20">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-lg bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-800 disabled:opacity-60"
      >
        {state === "submitting"
          ? "Submitting…"
          : `Submit listing · ${siteConfig.listingPrice}`}
      </button>
    </form>
  );
}
