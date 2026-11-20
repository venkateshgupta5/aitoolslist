"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
        Thanks — you&apos;re on the list for the next edition.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) setDone(true);
      }}
      className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="w-full rounded-lg border border-ink-300 bg-white px-4 py-3 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
      >
        Subscribe
      </button>
    </form>
  );
}
