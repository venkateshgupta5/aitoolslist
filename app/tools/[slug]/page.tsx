import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  toolPages,
  toolPageBySlug,
  categoryBySlug,
  atAGlance,
  claimStatuses,
  toIsoDate,
  hasFreeTier,
  buildProductFaq,
  faqJsonLd,
  type ClaimRow,
} from "@/lib/content";
import { VerificationBadge } from "@/components/verification-badge";
import { ToolLogo } from "@/components/tool-logo";
import { SectionNav, type NavSection } from "@/components/tools/section-nav";
import { EnquiryDisclosure } from "@/components/tools/enquiry-disclosure";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return toolPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = toolPageBySlug(slug);
  if (!product) return {};
  const title = `${product.name} – Features, Pricing & Review`;
  const description = `Discover ${product.name}: ${product.shortDescription} Explore features, pricing, benchmarks, alternatives and independent research in our verified AI product profile.`;
  return {
    title,
    description,
    alternates: { canonical: `/tools/${slug}` },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: absoluteUrl(`/tools/${slug}`),
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Standard content section with an anchor and sticky-nav offset. */
function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  // Skip sections whose content is empty (e.g. fields left blank for a tool).
  if (children == null || children === "" || (Array.isArray(children) && children.length === 0)) {
    return null;
  }
  return (
    <section id={id} className="scroll-mt-32 border-t border-ink-200/70 py-7 first:border-t-0 first:pt-0">
      {eyebrow && (
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-lg font-bold tracking-tight text-ink-900">{title}</h2>
      <div className="mt-3 text-[15px] leading-relaxed text-ink-700">{children}</div>
    </section>
  );
}

function Chips({ items }: { items: string[] }) {
  if (!items.length) return <span className="text-ink-400">Not verified</span>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <span key={i} className="rounded-lg bg-ink-100 px-2.5 py-1 text-[13px] font-medium text-ink-700">
          {i}
        </span>
      ))}
    </div>
  );
}

const claimColor: Record<ClaimRow["status"], string> = {
  Confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "Cross-checked": "bg-brand-50 text-brand-700 ring-brand-600/20",
  "Vendor-reported": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Unverified: "bg-ink-100 text-ink-600 ring-ink-500/20",
  Unavailable: "bg-ink-100 text-ink-500 ring-ink-500/20",
  "N/A": "bg-ink-100 text-ink-400 ring-ink-500/20",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = toolPageBySlug(slug);
  if (!product) notFound();

  const category = categoryBySlug(product.categorySlug);
  const specs = atAGlance(product);
  const claims = claimStatuses(product);
  const hasBenchmarks = (product.benchmarks?.length ?? 0) > 0;
  const hasAnalysis = (product.strengths?.length ?? 0) > 0 || (product.limitations?.length ?? 0) > 0;
  const hasCompare = (product.compare?.length ?? 0) > 0;

  const sections: NavSection[] = [
    { id: "specs", label: "At a glance" },
    { id: "overview", label: "Overview" },
    { id: "features", label: "Capabilities" },
    { id: "pricing", label: "Pricing" },
    ...(hasBenchmarks ? [{ id: "benchmarks", label: "Benchmarks" }] : []),
    { id: "usecases", label: "Use cases" },
    ...(hasAnalysis ? [{ id: "analysis", label: "Analysis" }] : []),
    ...(hasCompare ? [{ id: "alternatives", label: "Alternatives" }] : []),
    { id: "weekly", label: "This edition" },
    { id: "research", label: "Research" },
  ];

  const datePublished = toIsoDate(product.launchDate);
  const dateModified = toIsoDate(product.lastVerified);
  const free = hasFreeTier(product.pricing);
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: category?.name,
    description: product.overview,
    url: product.officialUrl,
    ...(product.productType ? { applicationSubCategory: product.productType } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(free
      ? {
          isAccessibleForFree: true,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: product.officialUrl,
          },
        }
      : {}),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: category?.name ?? "Categories", item: absoluteUrl(`/categories/${product.categorySlug}`) },
      { "@type": "ListItem", position: 3, name: product.name, item: absoluteUrl(`/tools/${slug}`) },
    ],
  };
  const faq = buildProductFaq(product);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
      )}

      {/* Breadcrumb */}
      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">Home</Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        {category && (
          <>
            <Link href={`/categories/${category.slug}`} className="hover:text-ink-900">{category.name}</Link>{" "}
            <span className="text-ink-300">/</span>{" "}
          </>
        )}
        <span className="text-ink-700">{product.name}</span>
      </nav>

      {/* Hero */}
      <header className="mt-5">
        {category && (
          <Link href={`/categories/${category.slug}`} className="text-[11px] font-semibold uppercase tracking-wide text-brand-600 hover:text-brand-700">
            {category.name}
          </Link>
        )}
        <div className="mt-2 flex items-start gap-4">
          <ToolLogo name={product.name} logo={product.logo} categorySlug={product.categorySlug} size={56} className="rounded-2xl" />
          <div className="min-w-0">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">{product.name}</h1>
            <p className="mt-1 text-ink-600">{product.tagline}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <VerificationBadge status={product.verification} />
          {product.researchConfidence && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-ink-100 px-2.5 py-0.5 text-[11px] font-medium text-ink-600 ring-1 ring-inset ring-ink-500/20">
              Research confidence: {product.researchConfidence}
            </span>
          )}
          {product.productType && (
            <span className="inline-flex items-center rounded-lg bg-ink-100 px-2.5 py-0.5 text-[11px] font-medium text-ink-600">
              {product.productType}
            </span>
          )}
        </div>

        {product.differentiators && (
          <div className="mt-3">
            <Chips items={product.differentiators} />
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-500">
          <span>Launched: <span className="text-ink-700">{product.launchDate ?? "Not verified"}</span></span>
          <span>Last verified: <span className="text-ink-700">{product.lastVerified ?? "Not verified"}</span></span>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a href={product.officialUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
            Visit official website ↗
          </a>
          {product.documentationUrl && (
            <a href={product.documentationUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-ink-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50">
              View documentation
            </a>
          )}
          {hasCompare && (
            <a href="#alternatives" className="rounded-lg border border-ink-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50">
              Compare alternatives
            </a>
          )}
        </div>
      </header>

      <div className="mt-6">
        <SectionNav sections={sections} />
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-start">
        {/* Main column */}
        <div className="rounded-2xl border border-ink-200/80 bg-white p-6">
          {/* At a glance */}
          <section id="specs" className="scroll-mt-32 pb-7">
            <h2 className="text-lg font-bold tracking-tight text-ink-900">At a glance</h2>
            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 border-b border-ink-100 pb-2">
                  <dt className="text-sm text-ink-500">{s.label}</dt>
                  <dd className={`text-sm font-medium text-right ${/not verified|not publicly/i.test(s.value) ? "text-ink-400" : "text-ink-800"}`}>
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Overview + why it matters */}
          <Section id="overview" title="Overview">
            <p>{product.overview}</p>
            {product.whyItMatters && (
              <div className="mt-4 rounded-lg border-l-2 border-brand-400 bg-brand-50/50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-700">Why it matters</p>
                <p className="mt-1 text-sm text-ink-700">{product.whyItMatters}</p>
              </div>
            )}
          </Section>

          <Section id="problem" title="Problem it solves">{product.problemSolved}</Section>
          <Section id="how" title="How it works">{product.howItWorks}</Section>

          {/* Capabilities */}
          <Section id="features" title="Key capabilities">
            <ul className="space-y-1.5">
              {product.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-sm font-semibold text-ink-700">Integrations</p>
              <div className="mt-2"><Chips items={product.integrations} /></div>
            </div>
          </Section>

          {/* Pricing */}
          <Section id="pricing" title="Pricing & plans">
            <p>{product.pricing}</p>
            <a href={product.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium text-brand-600 hover:text-brand-700">
              View official pricing ↗
            </a>
          </Section>

          {/* Benchmarks */}
          {hasBenchmarks && (
            <Section id="benchmarks" title="Performance & benchmarks" eyebrow="Reported figures, not LLM-generated">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {product.benchmarks!.map((b) => (
                      <tr key={b.label} className="border-b border-ink-100">
                        <td className="py-2 pr-4 text-ink-600">{b.label}</td>
                        <td className="py-2 pr-4 font-medium text-ink-800">{b.value}</td>
                        <td className="py-2 text-right">
                          <span className={`rounded-lg px-2 py-0.5 text-[11px] font-medium ${b.kind === "independent" ? "bg-emerald-50 text-emerald-700" : b.kind === "vendor" ? "bg-amber-50 text-amber-700" : "bg-ink-100 text-ink-600"}`}>
                            {b.kind === "independent" ? "Independent" : b.kind === "vendor" ? "Vendor-reported" : "Community"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {/* Use cases */}
          <Section id="usecases" title="Use cases">
            <ul className="space-y-1.5">
              {product.useCases.map((u) => (
                <li key={u} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
            {(product.whoShouldUse || product.notSuitableWhen) && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {product.whoShouldUse && (
                  <div className="rounded-lg bg-ink-50 p-4">
                    <p className="text-sm font-semibold text-ink-800">Who should use it</p>
                    <ul className="mt-2 space-y-1 text-sm text-ink-600">
                      {product.whoShouldUse.map((w) => <li key={w}>• {w}</li>)}
                    </ul>
                  </div>
                )}
                {product.notSuitableWhen && (
                  <div className="rounded-lg bg-ink-50 p-4">
                    <p className="text-sm font-semibold text-ink-800">May not suit</p>
                    <ul className="mt-2 space-y-1 text-sm text-ink-600">
                      {product.notSuitableWhen.map((w) => <li key={w}>• {w}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Section>

          {/* Strengths & limitations, editorial analysis */}
          {hasAnalysis && (
            <Section id="analysis" title="Strengths & limitations" eyebrow="Independent editorial analysis">
              <div className="grid gap-4 sm:grid-cols-2">
                {product.strengths && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
                    <p className="text-sm font-semibold text-emerald-800">Strengths</p>
                    <ul className="mt-2 space-y-1.5 text-sm text-ink-700">
                      {product.strengths.map((s) => <li key={s} className="flex gap-2"><span className="text-emerald-600">+</span>{s}</li>)}
                    </ul>
                  </div>
                )}
                {product.limitations && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
                    <p className="text-sm font-semibold text-amber-800">Limitations</p>
                    <ul className="mt-2 space-y-1.5 text-sm text-ink-700">
                      {product.limitations.map((l) => <li key={l} className="flex gap-2"><span className="text-amber-600">–</span>{l}</li>)}
                    </ul>
                  </div>
                )}
              </div>
              <p className="mt-3 text-xs text-ink-400">Editorial assessment by aitoolslist.ai, distinct from vendor claims.</p>
            </Section>
          )}

          {/* Alternatives & comparison */}
          {hasCompare && (
            <Section id="alternatives" title="Alternatives & comparison">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="border-b border-ink-200 text-left text-ink-500">
                      <th className="py-2 pr-4 font-medium">Option</th>
                      <th className="py-2 pr-4 font-medium">Positioning</th>
                      <th className="py-2 font-medium">When to prefer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-ink-100 bg-brand-50/40">
                      <td className="py-2.5 pr-4 font-semibold text-ink-900">{product.name}</td>
                      <td className="py-2.5 pr-4 text-ink-700">{product.tagline}</td>
                      <td className="py-2.5 text-ink-700">Featured pick this edition</td>
                    </tr>
                    {product.compare!.map((c) => (
                      <tr key={c.name} className="border-b border-ink-100">
                        <td className="py-2.5 pr-4 font-medium text-ink-800">{c.name}</td>
                        <td className="py-2.5 pr-4 text-ink-600">{c.positioning}</td>
                        <td className="py-2.5 text-ink-600">{c.whenPreferable}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-ink-400">Comparison reflects positioning; pricing and spec parity are not independently verified across all options.</p>
            </Section>
          )}

          {/* Why selected this edition */}
          <Section id="weekly" title="Why it was selected this edition" eyebrow={`Edition intelligence · ${category?.name ?? ""}`}>
            <p>{product.selectionRationale}</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-500">
              <span>Category rank: <span className="text-ink-700">#1 this edition</span></span>
              {product.researchConfidence && <span>Research confidence: <span className="text-ink-700">{product.researchConfidence}</span></span>}
              {product.launchDate && <span>Launch relevance: <span className="text-ink-700">{product.launchDate}</span></span>}
            </div>
          </Section>

          {/* Research & verification */}
          <Section id="research" title="Research & verification" eyebrow="Claim-level transparency">
            <p className="text-sm text-ink-600">
              Our verification scope is explicit. A checked website does not mean the whole product has been independently audited.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {claims.map((c) => (
                    <tr key={c.field} className="border-b border-ink-100">
                      <td className="py-2 pr-4 text-ink-600">{c.field}</td>
                      <td className="py-2 pr-4">
                        <span className={`rounded-lg px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${claimColor[c.status]}`}>{c.status}</span>
                      </td>
                      <td className="py-2 text-right text-xs text-ink-400">{c.note ?? ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-ink-700">Sources</p>
              <ul className="mt-2 space-y-2">
                {product.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-brand-600 hover:text-brand-700 hover:underline">{s.title}</a>
                    <span className="ml-2 text-xs text-ink-400">({s.type})</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-32">
          <div className="rounded-2xl border border-ink-200/80 bg-white p-5">
            <div className="flex items-center gap-3">
              <ToolLogo name={product.name} logo={product.logo} categorySlug={product.categorySlug} size={40} className="rounded-xl" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink-900">{product.name}</p>
                <p className="truncate text-xs text-ink-500">{product.productType ?? category?.name}</p>
              </div>
            </div>
            <a href={product.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block w-full rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-700">
              Visit website ↗
            </a>
            {product.documentationUrl && (
              <a href={product.documentationUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block w-full rounded-lg border border-ink-300 bg-white px-4 py-2.5 text-center text-sm font-semibold text-ink-800 hover:bg-ink-50">
                Documentation
              </a>
            )}
            <dl className="mt-4 space-y-2 border-t border-ink-100 pt-4 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-ink-500">Status</dt>
                <dd className="font-medium text-ink-800">{product.productStatus ?? "Not verified"}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-ink-500">Pricing</dt>
                <dd className="text-right font-medium text-ink-800">{/not verified|not publicly/i.test(atAGlance(product).find((r) => r.label === "Pricing")?.value ?? "") ? <span className="text-ink-400">Not verified</span> : "See pricing"}</dd>
              </div>
            </dl>
          </div>

          {hasCompare && (
            <div className="rounded-2xl border border-ink-200/80 bg-white p-5">
              <p className="text-sm font-semibold text-ink-800">Alternatives</p>
              <ul className="mt-2 space-y-1.5 text-sm text-ink-600">
                {product.compare!.map((c) => <li key={c.name}>• {c.name}</li>)}
              </ul>
              <a href="#alternatives" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:text-brand-700">Compare →</a>
            </div>
          )}

          <EnquiryDisclosure productSlug={product.slug} productName={product.name} />
        </aside>
      </div>
    </div>
  );
}
