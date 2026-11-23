"use client";

import { useSession, signIn } from "next-auth/react";
import { track, LISTING_EVENTS } from "@/lib/analytics";

/**
 * Primary "List your product" CTA. Requires sign-in: authenticated users jump
 * to the application form; everyone else is sent through Google sign-in and
 * returned to the form.
 */
export function GateCta({
  where,
  className,
  children,
}: {
  where: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { status } = useSession();

  function handleClick(e: React.MouseEvent) {
    track(LISTING_EVENTS.ctaClick, { where });
    if (status !== "authenticated") {
      e.preventDefault();
      signIn("google", { callbackUrl: "/submit-tool#apply" });
    }
  }

  return (
    <a href="#apply" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
