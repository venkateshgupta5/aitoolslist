import Link from "next/link";
import type { Pick } from "@/lib/content";
import { categoryAccent } from "@/lib/content";
import { VerificationBadge } from "@/components/verification-badge";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function PickCard({ pick }: { pick: Pick }) {
  const { category, product } = pick;
  const whyItMatters = product?.whyItMatters ?? product?.selectionRationale;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-ink-200/80 bg-white p-5 card-ring transition-all hover:border-brand-300 hover:shadow-md">
      {/* 1. Category + identity */}
      <Link
        href={`/categories/${category.slug}`}
        className="text-[11px] font-semibold uppercase tracking-wide text-brand-600 hover:text-brand-700"
      >
        {category.name}
      </Link>

      {product ? (
        <>
          <div className="mt-3 flex items-start gap-3">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${categoryAccent(category.slug)}`}>
              {initials(product.name)}
            </div>
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
            No candidate met the evidence threshold this week — we flag it rather
            than force a weak pick.
          </p>
        </div>
      )}
    </article>
  );
}
