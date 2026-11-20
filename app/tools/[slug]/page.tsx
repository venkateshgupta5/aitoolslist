import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  products,
  productBySlug,
  categoryBySlug,
} from "@/lib/content";
import { VerificationBadge } from "@/components/verification-badge";
import { LeadForm } from "@/components/forms/lead-form";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  const title = `${product.name} – Features, Pricing & Review`;
  const description = `Discover ${product.name}: ${product.shortDescription} Explore its features, use cases, pricing and capabilities in our verified AI tool profile.`;
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-ink-200/70 py-6 first:border-t-0 first:pt-0">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-400">
        {title}
      </h2>
      <div className="mt-3 text-[15px] leading-relaxed text-ink-700">
        {children}
      </div>
    </section>
  );
}

function Chips({ items }: { items: string[] }) {
  if (!items.length) return <span className="text-ink-400">Not verified</span>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <span
          key={i}
          className="rounded-lg bg-ink-100 px-2.5 py-1 text-[13px] font-medium text-ink-700"
        >
          {i}
        </span>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const category = categoryBySlug(product.categorySlug);

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: category?.name,
    description: product.overview,
    url: product.officialUrl,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: category?.name ?? "Categories",
        item: absoluteUrl(`/categories/${product.categorySlug}`),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: absoluteUrl(`/tools/${slug}`),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        {category && (
          <>
            <Link
              href={`/categories/${category.slug}`}
              className="hover:text-ink-900"
            >
              {category.name}
            </Link>{" "}
            <span className="text-ink-300">/</span>{" "}
          </>
        )}
        <span className="text-ink-700">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-start">
        {/* Main column */}
        <div>
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink-900 text-lg font-bold text-white">
              {initials(product.name)}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-1 text-ink-500">{product.tagline}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <VerificationBadge status={product.verification} />
            <span className="text-sm text-ink-500">
              Last verified:{" "}
              {product.lastVerified ?? (
                <span className="text-ink-400">Not verified</span>
              )}
            </span>
          </div>

          <div className="mt-8 rounded-2xl border border-ink-200/80 bg-white p-6">
            <Section title="Overview">{product.overview}</Section>
            <Section title="Problem it solves">{product.problemSolved}</Section>
            <Section title="How it works">{product.howItWorks}</Section>
            <Section title="Key features">
              <ul className="space-y-1.5">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Use cases">
              <Chips items={product.useCases} />
            </Section>
            <Section title="Target audience">
              <Chips items={product.targetAudience} />
            </Section>
            <Section title="Pricing">{product.pricing}</Section>
            <Section title="Integrations">
              <Chips items={product.integrations} />
            </Section>
            <Section title="Alternatives">
              <Chips items={product.alternatives} />
            </Section>
            <Section title="Why it was selected">
              {product.selectionRationale}
            </Section>
            <Section title="Sources">
              <ul className="space-y-2">
                {product.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-brand-600 hover:text-brand-700 hover:underline"
                    >
                      {s.title}
                    </a>
                    <span className="ml-2 text-xs text-ink-400">
                      ({s.type})
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-ink-200/80 bg-white p-5">
            <a
              href={product.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-lg bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Visit website ↗
            </a>
            <p className="mt-3 text-center text-xs text-ink-400">
              {new URL(product.officialUrl).hostname}
            </p>
          </div>

          <div className="rounded-2xl border border-ink-200/80 bg-white p-5">
            <h2 className="text-base font-bold text-ink-900">
              Request information
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              No account needed. We&apos;ll route your enquiry to the right
              place.
            </p>
            <div className="mt-4">
              <LeadForm
                productId={product.slug}
                productSlug={product.slug}
                productName={product.name}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
