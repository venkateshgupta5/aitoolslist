import type { Metadata } from "next";
import Link from "next/link";
import { allEditions } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI tool rankings, every fortnight | aitoolslist.ai",
  description:
    "How our AI tool rankings have evolved, fortnight by fortnight. The latest verified picks plus the preserved archive of standout AI tools, August 2026 onward.",
  alternates: { canonical: "/editions" },
};

export default function EditionsIndexPage() {
  const editions = allEditions();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <span className="text-ink-700">Rankings</span>
      </nav>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        AI tool rankings, every fortnight
      </h1>
      <p className="mt-3 max-w-2xl text-ink-600">
        We refresh our rankings twice a month, the 1st (1st–15th) and the 16th
        (16th–end of month). The latest picks are fully researched and verified;
        earlier ones are preserved so you can see how the landscape shifts over
        time.
      </p>

      <ul className="mt-10 space-y-3">
        {editions.map((e) => (
          <li key={e.slug}>
            <Link
              href={`/editions/${e.slug}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-ink-200/80 bg-white p-5 transition-all hover:border-brand-300 hover:shadow-md"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-[17px] font-bold tracking-tight text-ink-900">
                    {e.label}
                  </h2>
                  {e.isCurrent ? (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Current
                    </span>
                  ) : (
                    <span className="rounded-lg bg-ink-100 px-2.5 py-0.5 text-[11px] font-medium text-ink-500 ring-1 ring-inset ring-ink-500/20">
                      Archive
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-500">
                  {e.isCurrent
                    ? `${e.pickCount} verified picks · researched & fact-checked`
                    : `${e.pickCount} picks · backfilled from credible sources`}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-brand-600">
                View →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
