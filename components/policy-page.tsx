import Link from "next/link";

/** Shared shell for policy/legal pages: breadcrumb, title, last-updated, prose. */
export function PolicyPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">Home</Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <span className="text-ink-700">{title}</span>
      </nav>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-ink-400">Last updated: {updated}</p>
      {intro && <p className="mt-5 text-lg leading-relaxed text-ink-600">{intro}</p>}
      <div className="mt-8 space-y-8">{children}</div>
    </div>
  );
}

export function PolicySection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">{heading}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-700">{children}</div>
    </section>
  );
}
