"use client";

import { useRef } from "react";
import Link from "next/link";
import { ToolLogo } from "@/components/tool-logo";

export type TrendingItem = {
  name: string;
  tagline: string;
  href: string;
  logo?: string;
  categoryName: string;
  categorySlug: string;
};

// Per-card accent hue — drives the top bar, trending pill, sparkline and hover CTA.
// Kept in the blue → cyan → indigo → violet family to sit on the design system.
const accents = ["#008bdc", "#0ea5b7", "#6366f1", "#8b5cf6", "#0284c7"];

// A gentle upward sparkline, signalling "trending" without a fake metric.
function Sparkline({ color }: { color: string }) {
  const id = `spark-${color.replace("#", "")}`;
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full opacity-70"
      viewBox="0 0 320 64"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.16" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="55%" stopColor={color} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path d="M0 52 L46 46 L92 50 L138 36 L184 40 L230 24 L276 28 L320 8 L320 64 L0 64 Z" fill={`url(#${id})`} />
      <path
        d="M0 52 L46 46 L92 50 L138 36 L184 40 L230 24 L276 28 L320 8"
        fill="none"
        stroke={`url(#${id}-fade)`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrendingSponsored({ items }: { items: TrendingItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.9;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section
      aria-label="Trending now (sponsored)"
      className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-16"
    >
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-white shadow-sm shadow-brand-500/30">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 17 9 11l4 4 8-8" />
                <path d="M17 7h4v4" />
              </svg>
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
              Trending now
            </h2>
          </div>
          <span className="rounded-full border border-ink-200 bg-ink-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-500">
            Sponsored
          </span>
        </div>

        {/* Arrow controls */}
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => {
          const accent = accents[i % accents.length];
          return (
            <Link
              key={item.href}
              href={item.href}
              data-card
              style={{ "--accent": accent } as React.CSSProperties}
              className="group relative flex min-h-[224px] w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white p-5 card-ring transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-lg sm:w-[336px]"
            >
              {/* Accent top bar */}
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-1"
                style={{ background: `linear-gradient(90deg, ${accent}, color-mix(in srgb, ${accent} 15%, transparent))` }}
                aria-hidden
              />

              <Sparkline color={accent} />

              {/* Rank watermark */}
              <span
                className="font-display pointer-events-none absolute right-4 top-3 text-5xl font-extrabold leading-none"
                style={{ color: `color-mix(in srgb, ${accent} 9%, transparent)` }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Top: logo + trending pill */}
              <div className="relative flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink-200/80 bg-white p-1.5 shadow-sm">
                  <ToolLogo name={item.name} logo={item.logo} categorySlug={item.categorySlug} size={34} className="rounded-lg" />
                </span>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{
                    color: accent,
                    backgroundColor: `color-mix(in srgb, ${accent} 11%, white)`,
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                  Trending
                </span>
              </div>

              {/* Name + tagline */}
              <div className="relative mt-4 flex-1">
                <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-ink-900">
                  {item.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-600">
                  {item.tagline}
                </p>
              </div>

              {/* Footer: category + CTA */}
              <div className="relative mt-4 flex items-center justify-between gap-3">
                <span className="truncate text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                  {item.categoryName}
                </span>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors duration-300 group-hover:border-transparent group-hover:bg-[var(--accent)] group-hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-ink-400">
        Sponsored placements. Paid visibility, not an editorial ranking.
      </p>
    </section>
  );
}
