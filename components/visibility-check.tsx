"use client";

import { useState } from "react";
import Link from "next/link";

type Item = { name: string; href: string };

export function VisibilityCheck({ items }: { items: Item[] }) {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<{ found: Item | null } | null>(null);

  function check(e: React.FormEvent) {
    e.preventDefault();
    const needle = q.trim().toLowerCase();
    if (!needle) return;
    const found =
      items.find((i) => i.name.toLowerCase() === needle) ??
      items.find(
        (i) =>
          i.name.toLowerCase().includes(needle) ||
          needle.includes(i.name.toLowerCase()),
      ) ??
      null;
    setResult({ found });
  }

  return (
    <div className="mt-4">
      <form onSubmit={check} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Your product name"
          className="min-w-0 flex-1 rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-400"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
        >
          Check
        </button>
      </form>

      {result &&
        (result.found ? (
          <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-800">
            <span className="font-semibold">{result.found.name}</span> is in our
            catalogue.{" "}
            <Link
              href={result.found.href}
              className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
            >
              View where it appears →
            </Link>
          </div>
        ) : (
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3 text-sm text-amber-800">
            Not in our catalogue yet, so an assistant reading it can&apos;t name
            you.{" "}
            <Link
              href="/submit-tool"
              className="font-semibold text-amber-900 underline underline-offset-2 hover:text-amber-950"
            >
              List your product →
            </Link>
          </div>
        ))}
    </div>
  );
}
