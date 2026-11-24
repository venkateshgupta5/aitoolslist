import Link from "next/link";
import type { Pick } from "@/lib/content";
import { VerificationBadge } from "@/components/verification-badge";
import { ToolLogo } from "@/components/tool-logo";

export function PickCard({
  pick,
  highlightLabel,
}: {
  pick: Pick;
  highlightLabel?: string;
}) {
  const { category, product } = pick;
  const whyItMatters = product?.whyItMatters ?? product?.selectionRationale;

  return (
    <article
      className={`group flex h-full flex-col rounded-xl border bg-white p-5 card-ring transition-all ${
        highlightLabel
          ? "border-ink-300"
          : "border-ink-200 hover:border-ink-300"
      }`}
    >
      {/* 1. Category / highlight + identity */}
      {highlightLabel ? (
        <span className="tag tag-sky mb-2 w-fit">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          {highlightLabel}
        </span>
      ) : (
        <Link
          href={`/categories/${category.slug}`}
          className="text-[11px] font-semibold uppercase tracking-wide text-brand-600 hover:text-brand-700"
        >
          {category.name}
        </Link>
      )}

      {product ? (
        <>
          <div className="mt-3 flex items-start gap-3">
            <ToolLogo name={product.name} logo={product.logo} categorySlug={category.slug} />
            <div className="min-w-0">
              <h3 className="text-[17px] font-bold leading-snug tracking-tight text-ink-900">
                {product.name}
              </h3>
              <p className="mt-0.5 text-sm text-ink-500">{product.tagline}</p>
            </div>
          </div>

          {/* 2. What it does */}
          <p className="mt-3 text-sm leading-relaxed text-ink-600">
            {product.shortDescription}
          </p>

          {/* 3. Why it matters */}
          <div className="mt-3 flex-1 rounded-lg bg-ink-50 px-3 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
              Why it matters
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-600">
              {whyItMatters}
            </p>
          </div>

          {/* 4. Verification + link */}
          <div className="mt-4 flex items-center justify-between gap-2 pt-1">
            <VerificationBadge status={product.verification} />
            <Link
              href={`/tools/${product.slug}`}
              className="shrink-0 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              View analysis →
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-6 flex flex-1 flex-col items-start justify-center">
          <VerificationBadge status="no_pick" />
          <p className="mt-3 text-sm text-ink-500">
            No researched pick in this category yet. Our coverage expands every
            fortnight. We add a pick only once a candidate clears the evidence
            threshold, never a forced one.
          </p>
        </div>
      )}
    </article>
  );
}
