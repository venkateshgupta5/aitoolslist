import Link from "next/link";
import type { ArchivePickSlot } from "@/lib/content";
import { archivePickSlug } from "@/lib/content";
import { VerificationBadge } from "@/components/verification-badge";
import { ToolLogo } from "@/components/tool-logo";

/**
 * Card for a historical (archive) edition pick. Archive picks now have their
 * own /tools profile; the card links to it and shows the dated source evidence
 * they were drawn from.
 */
export function ArchivePickCard({
  slot,
  editionLabel,
  editionHref,
}: {
  slot: ArchivePickSlot;
  editionLabel?: string;
  editionHref?: string;
}) {
  const { category, pick } = slot;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-ink-200/80 bg-white p-5 card-ring transition-all hover:border-brand-300 hover:shadow-md">
      {editionHref && editionLabel ? (
        <Link
          href={editionHref}
          className="text-[11px] font-semibold uppercase tracking-wide text-brand-600 hover:text-brand-700"
        >
          {editionLabel} edition
        </Link>
      ) : (
        <Link
          href={`/categories/${category.slug}`}
          className="text-[11px] font-semibold uppercase tracking-wide text-brand-600 hover:text-brand-700"
        >
          {category.name}
        </Link>
      )}

      {pick ? (
        <>
          <Link href={`/tools/${archivePickSlug(pick)}`} className="mt-3 flex items-start gap-3">
            <ToolLogo
              name={pick.name}
              logo={`/logos/${archivePickSlug(pick)}.png`}
              categorySlug={category.slug}
              size={44}
              className="rounded-xl"
            />
            <div className="min-w-0">
              <h3 className="text-[17px] font-bold leading-snug tracking-tight text-ink-900 hover:text-brand-700">
                {pick.name}
              </h3>
              <p className="mt-0.5 text-sm text-ink-500">{pick.tagline}</p>
            </div>
          </Link>

          <p className="mt-3 text-sm leading-relaxed text-ink-600">
            {pick.shortDescription}
          </p>

          {pick.overview && (
            <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
              {pick.overview}
            </p>
          )}

          <div className="mt-3 flex-1 rounded-lg bg-ink-50 px-3 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
              Why it mattered
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-600">
              {pick.whyItMatters}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-400">
            <span>Evidence dated {pick.launchDate}</span>
            {pick.sources.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                {s.type} ↗
              </a>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-ink-100 pt-3">
            <VerificationBadge status={pick.verification} />
            <Link
              href={`/tools/${archivePickSlug(pick)}`}
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
            No credible in-window candidate met the evidence bar for this
            category this edition, we flag it rather than force a weak pick.
          </p>
        </div>
      )}
    </article>
  );
}
