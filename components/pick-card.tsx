import Link from "next/link";
import type { Pick } from "@/lib/content";
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

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-ink-200/80 bg-white p-5 card-ring transition-all hover:border-brand-300 hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <Link
          href={`/categories/${category.slug}`}
          className="text-[11px] font-semibold uppercase tracking-wide text-brand-600 hover:text-brand-700"
        >
          {category.name}
        </Link>
      </div>

      {product ? (
        <>
          <div className="mt-4 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-sm font-bold text-white">
              {initials(product.name)}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold tracking-tight text-ink-900">
                {product.name}
              </h3>
              <p className="truncate text-sm text-ink-500">{product.tagline}</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-600">
            {product.shortDescription}
          </p>

          <div className="mt-3 rounded-lg bg-ink-50 px-3 py-2">
            <p className="text-xs leading-relaxed text-ink-600">
              <span className="font-semibold text-ink-700">Why selected: </span>
              {product.selectionRationale}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2 pt-1">
            <VerificationBadge status={product.verification} />
            <Link
              href={`/tools/${product.slug}`}
              className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              View details →
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-6 flex flex-1 flex-col items-start justify-center">
          <VerificationBadge status="no_pick" />
          <p className="mt-3 text-sm text-ink-500">
            No candidate met the evidence threshold this week.
          </p>
        </div>
      )}
    </article>
  );
}
