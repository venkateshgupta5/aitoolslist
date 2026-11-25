"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

const navLinks = [
  { href: "/#this-week", label: "Discover" },
  { href: "/categories", label: "Categories" },
  { href: "/editions", label: "Rankings" },
  { href: "/about", label: "About" },
];

function Avatar({
  user,
  className = "h-8 w-8",
}: {
  user: { name?: string | null; image?: string | null };
  className?: string;
}) {
  if (user.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={user.image}
        alt={user.name ?? "Your profile"}
        referrerPolicy="no-referrer"
        className={`${className} rounded-full object-cover ring-1 ring-ink-200`}
      />
    );
  }
  const initials = (user.name ?? "U")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span
      className={`${className} flex items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white`}
    >
      {initials}
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="border-b border-ink-200/70 bg-ink-50/80 backdrop-blur supports-[backdrop-filter]:bg-ink-50/70">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            ai
          </span>
          <span className="text-[15px] font-bold tracking-tight text-ink-900">
            aitoolslist<span className="text-brand-600">.ai</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/submit-tool"
            className="rounded-lg bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
          >
            List your product
          </Link>
          {user ? (
            <Link
              href="/profile"
              title={user.name ?? "Your profile"}
              className="rounded-full ring-offset-2 transition-shadow hover:ring-2 hover:ring-brand-300"
            >
              <Avatar user={user} />
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-700 hover:bg-ink-100 md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink-200/70 bg-ink-50 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-[15px] font-medium text-ink-700 hover:bg-ink-100"
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[15px] font-medium text-ink-700 hover:bg-ink-100"
              >
                <Avatar user={user} className="h-6 w-6" />
                {user.name ?? "Your profile"}
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-[15px] font-medium text-ink-700 hover:bg-ink-100"
              >
                Sign in
              </Link>
            )}
            <Link
              href="/submit-tool"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-ink-900 px-3 py-2.5 text-center text-[15px] font-semibold text-white"
            >
              List your product
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
