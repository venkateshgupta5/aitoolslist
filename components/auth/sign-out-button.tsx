"use client";

import { signOut } from "next-auth/react";

/**
 * Client-side sign-out. Unlike the server-action signOut, this clears the
 * client SessionProvider cache too, so the navbar (useSession) updates to the
 * signed-out state immediately instead of showing a stale profile icon.
 */
export function SignOutButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className={className}
    >
      Sign out
    </button>
  );
}
