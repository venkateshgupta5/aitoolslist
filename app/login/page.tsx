import type { Metadata } from "next";
import Link from "next/link";
import { signIn, signOut, auth } from "@/auth";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center sm:px-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-lg font-bold text-white">
        ai
      </span>

      {user ? (
        <>
          <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink-900">
            You&apos;re signed in
          </h1>
          <p className="mt-2 text-ink-600">
            {user.name ? `${user.name} · ` : ""}
            {user.email}
          </p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
            className="mt-8 w-full"
          >
            <button className="w-full rounded-lg border border-ink-300 bg-white px-6 py-3 text-sm font-semibold text-ink-800 hover:bg-ink-50">
              Sign out
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink-900">
            Sign in to aitoolslist.ai
          </h1>
          <p className="mt-2 text-ink-600">
            Sign-in is optional, you can browse and submit enquiries without an
            account. It&apos;s a convenience for managing your profile and
            enquiries.
          </p>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
            className="mt-8 w-full"
          >
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-ink-300 bg-white px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50">
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22 22-9.8 22-22c0-1.2-.1-2.3-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 15.9 2 8.9 6.6 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 46c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.6 36.3 26.9 37.3 24 37.3c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C8.8 41.4 15.8 46 24 46z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.6 5.6C41.4 36.2 44 30.6 44 24c0-1.2-.1-2.3-.4-3.5z" />
              </svg>
              Continue with Google
            </button>
          </form>
          <p className="mt-6 text-xs text-ink-400">
            By continuing you agree to our terms. We only use your Google
            profile to create your account.
          </p>
        </>
      )}

      <Link
        href="/"
        className="mt-8 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        ← Back to home
      </Link>
    </div>
  );
}
