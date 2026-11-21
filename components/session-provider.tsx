"use client";

import { SessionProvider } from "next-auth/react";

// Client-side session context so the navbar can show auth state without
// forcing the whole (statically generated) site to render dynamically.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
