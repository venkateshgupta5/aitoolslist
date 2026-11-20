"use client";

import { track, LISTING_EVENTS } from "@/lib/analytics";

/** Primary listing CTA. Tracks clicks and scrolls to the application form. */
export function ListingCta({
  where,
  className,
  children,
  href = "#apply",
}: {
  where: string;
  className?: string;
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      onClick={() => track(LISTING_EVENTS.ctaClick, { where })}
      className={className}
    >
      {children}
    </a>
  );
}
