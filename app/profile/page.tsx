import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Your profile",
  robots: { index: false, follow: false },
};

function initials(name?: string | null) {
  return (name ?? "U")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <span className="text-ink-700">Profile</span>
      </nav>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        Your profile
      </h1>

      {/* Identity card */}
      <div className="mt-8 flex items-center gap-5 rounded-2xl border border-ink-200/70 bg-white p-6 card-ring">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name ?? "Your profile"}
            referrerPolicy="no-referrer"
            className="h-16 w-16 rounded-full object-cover ring-1 ring-ink-200"
          />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
            {initials(user.name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="font-display text-xl font-semibold text-ink-900">
            {user.name ?? "Signed-in user"}
          </p>
          <p className="truncate text-ink-600">{user.email}</p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Signed in with Google
          </span>
        </div>
      </div>

      {/* Account details */}
      <div className="mt-6 rounded-2xl border border-ink-200/70 bg-white p-6 card-ring">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-400">
          Account
        </h2>
        <dl className="mt-4 divide-y divide-ink-100 text-sm">
          <div className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-ink-500">Name</dt>
            <dd className="font-medium text-ink-900">{user.name ?? "Not set"}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-ink-500">Email</dt>
            <dd className="truncate font-medium text-ink-900">{user.email}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-ink-500">Sign-in method</dt>
            <dd className="font-medium text-ink-900">Google</dd>
          </div>
        </dl>
      </div>

      {/* Quick links */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          href="/editions"
          className="rounded-2xl border border-ink-200/70 bg-white p-5 card-ring transition-colors hover:border-brand-300"
        >
          <p className="font-display text-base font-semibold text-ink-900">
            Browse editions →
          </p>
          <p className="mt-1 text-sm text-ink-500">
            The latest fortnightly edition and the full archive.
          </p>
        </Link>
        <Link
          href="/submit-tool"
          className="rounded-2xl border border-ink-200/70 bg-white p-5 card-ring transition-colors hover:border-brand-300"
        >
          <p className="font-display text-base font-semibold text-ink-900">
            List your product →
          </p>
          <p className="mt-1 text-sm text-ink-500">
            Submit your product for a sponsored listing.
          </p>
        </Link>
      </div>

      {/* Sign out */}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
        className="mt-8"
      >
        <button className="rounded-lg border border-ink-300 bg-white px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50">
          Sign out
        </button>
      </form>
    </div>
  );
}
