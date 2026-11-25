"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CategoryIcon } from "@/components/category-icon";

export type CatCard = {
  categoryName: string;
  categorySlug: string;
  segmentSlug: string;
  coverage: string;
  accentClass: string;
  toolName: string | null;
  toolLogo?: string;
  status: "verified" | "preview" | "none";
};

export type SegmentNav = { slug: string; name: string; count: number };

// Map the content accent classes to hex so thumbnails get soft, per-category tints.
const accentHex: Record<string, string> = {
  "bg-indigo-600": "#4f46e5",
  "bg-sky-600": "#0284c7",
  "bg-teal-600": "#0d9488",
  "bg-violet-600": "#7c3aed",
  "bg-rose-600": "#e11d48",
  "bg-amber-600": "#d97706",
  "bg-emerald-600": "#059669",
  "bg-blue-600": "#2563eb",
  "bg-fuchsia-600": "#c026d3",
  "bg-cyan-600": "#0891b2",
  "bg-orange-600": "#ea580c",
  "bg-green-600": "#16a34a",
  "bg-purple-600": "#9333ea",
};

function StatusBadge({ status }: { status: CatCard["status"] }) {
  if (status === "verified") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/15">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 6 9 17l-5-5" />
        </svg>
        Verified
      </span>
    );
  }
  if (status === "preview") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-600/15">
        Preview
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-ink-50 px-2.5 py-1 text-xs font-semibold text-ink-500 ring-1 ring-inset ring-ink-200">
      Coming soon
    </span>
  );
}

export function CategoriesBrowser({
  segments,
  cards,
}: {
  segments: SegmentNav[];
  cards: CatCard[];
}) {
  const [active, setActive] = useState<string>("all");
  const rootRef = useRef<HTMLDivElement>(null);

  const nav: SegmentNav[] = [
    { slug: "all", name: "All categories", count: cards.length },
    ...segments,
  ];

  // Allow deep-linking to a segment via /categories#<segment-slug> (e.g. from
  // the footer). Pre-select the segment and bring the grid into view.
  useEffect(() => {
    const applyHash = () => {
      const slug = window.location.hash.replace("#", "");
      if (slug && segments.some((s) => s.slug === slug)) {
        setActive(slug);
        requestAnimationFrame(() => {
          const el = rootRef.current;
          if (!el) return;
          const top = el.getBoundingClientRect().top + window.scrollY - 88;
          window.scrollTo({ top, behavior: "smooth" });
        });
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [segments]);
  const activeNav = nav.find((n) => n.slug === active) ?? nav[0];
  const visible =
    active === "all" ? cards : cards.filter((c) => c.segmentSlug === active);

  // Filtering to a segment with few cards can leave the viewport parked on the
  // footer. Keep the results in view: if the user is scrolled past the top of
  // the browser, bring it back up (never yank the page downward).
  const selectSegment = (slug: string) => {
    setActive(slug);
    requestAnimationFrame(() => {
      const el = rootRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
    });
  };

  return (
    <div ref={rootRef} className="mt-10 grid gap-8 lg:grid-cols-[256px_1fr]">
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <h2 className="px-3 text-lg font-bold tracking-tight text-ink-900">
          Categories
        </h2>

        {/* Mobile: horizontal scroll chips */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {nav.map((n) => (
            <button
              key={n.slug}
              type="button"
              onClick={() => selectSegment(n.slug)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active === n.slug
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-ink-200 bg-white text-ink-700 hover:border-brand-300"
              }`}
            >
              {n.name}
            </button>
          ))}
        </div>

        {/* Desktop: vertical list */}
        <nav className="mt-3 hidden lg:block">
          {nav.map((n) => {
            const isActive = active === n.slug;
            return (
              <button
                key={n.slug}
                type="button"
                onClick={() => selectSegment(n.slug)}
                aria-current={isActive ? "true" : undefined}
                className={`group flex w-full items-center justify-between gap-2 border-l-2 px-3 py-3 text-left text-[15px] transition-colors ${
                  isActive
                    ? "border-brand-500 bg-brand-50/70 font-semibold text-brand-700"
                    : "border-transparent font-medium text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                }`}
              >
                <span className="truncate">{n.name}</span>
                <span className="flex items-center gap-1.5">
                  <span className={`text-xs ${isActive ? "text-brand-500" : "text-ink-400"}`}>
                    {n.count}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-opacity ${isActive ? "text-brand-500 opacity-100" : "text-ink-300 opacity-0 group-hover:opacity-100"}`}
                    aria-hidden
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main: card grid ─────────────────────────────────────── */}
      <div>
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
            {activeNav.slug === "all" ? "All AI categories" : activeNav.name}
          </h2>
          <span className="text-lg font-semibold text-ink-400">
            ({visible.length})
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((c) => {
            const hex = accentHex[c.accentClass] ?? "#2563eb";
            return (
              <Link
                key={c.categorySlug}
                href={`/categories/${c.categorySlug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white card-ring transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
              >
                {/* Thumbnail */}
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, ${hex} 16%, white), color-mix(in srgb, ${hex} 6%, white))`,
                  }}
                >
                  {/* soft glow + faint category watermark (illustration feel) */}
                  <span
                    className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full opacity-25 blur-2xl"
                    style={{ background: hex }}
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute -bottom-4 -right-3 opacity-[0.12]"
                    style={{ color: hex }}
                    aria-hidden
                  >
                    <CategoryIcon slug={c.categorySlug} className="h-28 w-28" />
                  </span>

                  {/* single clean app-icon chip */}
                  <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2.5 shadow-md ring-1 ring-ink-200/70">
                    {c.toolLogo ? (
                      <Image
                        src={c.toolLogo}
                        alt={`${c.toolName ?? c.categoryName} logo`}
                        width={96}
                        height={96}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span
                        className="flex h-full w-full items-center justify-center rounded-xl text-white"
                        style={{ background: hex }}
                      >
                        <CategoryIcon slug={c.categorySlug} className="h-6 w-6" />
                      </span>
                    )}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <StatusBadge status={c.status} />
                  <h3 className="font-display mt-3 text-base font-bold leading-snug text-ink-900 group-hover:text-brand-700">
                    {c.categoryName}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-500">
                    {c.coverage}
                  </p>
                  <p className="mt-3 text-sm text-ink-500">
                    {c.toolName ? (
                      <>
                        Top pick{" "}
                        <span className="font-semibold text-ink-800">{c.toolName}</span>
                      </>
                    ) : (
                      <span className="text-ink-400">Pick coming soon</span>
                    )}
                  </p>
                </div>

                {/* Footer */}
                <div className="border-t border-ink-100 px-5 py-3.5">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                    Know more
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
