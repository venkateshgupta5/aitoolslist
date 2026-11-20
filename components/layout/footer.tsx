import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { sortedCategories } from "@/lib/content";

export function Footer() {
  const cats = sortedCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-200/70 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                ai
              </span>
              <span className="text-[15px] font-bold tracking-tight text-ink-900">
                aitoolslist<span className="text-brand-600">.ai</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              An AI intelligence and discovery publication. Independently
              researched. Fact-checked. Updated every week.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5">
              {cats.slice(0, 7).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="text-sm text-ink-600 hover:text-ink-900"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              More
            </h3>
            <ul className="mt-4 space-y-2.5">
              {cats.slice(7).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="text-sm text-ink-600 hover:text-ink-900"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-ink-600 hover:text-ink-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-sm text-ink-600 hover:text-ink-900">
                  Research methodology
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-sm text-ink-600 hover:text-ink-900">
                  Editorial independence
                </Link>
              </li>
              <li>
                <Link href="/submit-tool" className="text-sm text-ink-600 hover:text-ink-900">
                  List your app · {siteConfig.listingPrice}
                </Link>
              </li>
              <li>
                <Link href="/editions/2026-11-16" className="text-sm text-ink-600 hover:text-ink-900">
                  Editions
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-sm text-ink-600 hover:text-ink-900">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-200/70 pt-6 text-xs">
          {[
            ["/about", "About"],
            ["/contact", "Contact"],
            ["/listing-guidelines", "Listing guidelines"],
            ["/terms", "Terms of service"],
            ["/privacy", "Privacy policy"],
            ["/refund-policy", "Refund policy"],
            ["/editorial-policy", "Editorial policy"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="text-ink-500 hover:text-ink-900">
              {label}
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-ink-200/70 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p>Research-driven AI discovery. Not another unfiltered directory.</p>
        </div>
      </div>
    </footer>
  );
}
