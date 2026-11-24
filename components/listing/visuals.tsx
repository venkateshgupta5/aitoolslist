/**
 * Illustrative, self-contained mockups for the "List your product" page.
 * No external images, styled with the site's ink/brand tokens so they stay
 * crisp and on-brand in light and dark.
 */

const check = (
  <svg className="h-3.5 w-3.5 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/** Framed real screenshot. */
function Screenshot({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-xl shadow-ink-900/5 card-ring">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={w} height={h} loading="lazy" className="h-auto w-full" />
    </div>
  );
}

/** 1. An actual aitoolslist.ai product page (annotated). */
export function ProductPageMock() {
  return <Screenshot src="/screens/product-page.webp" w={2460} h={2345} alt="An actual product page on aitoolslist.ai, with a verified profile, structured details and a link to the product's website" />;
}

/** 2. An actual category page with the featured product at the top (annotated). */
export function CategoryPlacementMock() {
  return <Screenshot src="/screens/category-page.webp" w={2460} h={2290} alt="An actual category page on aitoolslist.ai, with the featured product highlighted at the top" />;
}

/** 3. SEO ecosystem: our profile links out to your site. */
export function BacklinkSeoMock() {
  return (
    <div className="rounded-2xl border border-ink-200/80 bg-white p-5 card-ring">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 rounded-xl border border-ink-200 bg-paper p-3 text-center">
          <p className="text-[11px] font-semibold text-ink-900">aitoolslist.ai</p>
          <p className="text-[10px] text-ink-400">/tools/your-product</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">dofollow link</span>
          <span className="mt-0.5 text-brand-500">→</span>
        </div>
        <div className="flex-1 rounded-xl border border-brand-300 bg-brand-50/60 p-3 text-center">
          <p className="text-[11px] font-semibold text-ink-900">yourproduct.com</p>
          <p className="text-[10px] text-ink-400">your website</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px]">
        {["Indexed entry point", "Category associations", "Stronger backlink profile"].map((t) => (
          <div key={t} className="rounded-lg bg-ink-50 px-2 py-2.5 font-medium text-ink-600">{t}</div>
        ))}
      </div>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-ink-500">
        {check} Supports your organic search visibility
      </p>
    </div>
  );
}

/** 4. AI assistant citing a listed product. */
export function AiCitationMock() {
  return (
    <div className="rounded-2xl border border-ink-200/80 bg-white p-5 card-ring">
      <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-ink-900 px-3.5 py-2 text-xs text-white">
        What&apos;s the best AI tool for image generation?
      </div>
      <div className="mt-3 max-w-[90%] rounded-2xl rounded-bl-sm bg-ink-50 px-3.5 py-3 text-xs leading-relaxed text-ink-700">
        A few strong options depending on your needs. For your use case,{" "}
        <span className="font-semibold text-ink-900">Your Product</span> stands out for its
        quality and pricing.
        <span className="mt-2 flex w-fit items-center gap-1.5 rounded-md bg-white px-2 py-0.5 text-[10px] font-medium text-ink-500 ring-1 ring-inset ring-ink-200">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          Source: aitoolslist.ai
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["ChatGPT", "Claude", "Perplexity", "Gemini"].map((e) => (
          <span key={e} className="rounded-md bg-ink-100 px-2 py-0.5 text-[10px] font-semibold text-ink-500">{e}</span>
        ))}
      </div>
    </div>
  );
}

/** 5. Newsletter with a featured placement. */
export function NewsletterMock() {
  return (
    <div className="rounded-2xl border border-ink-200/80 bg-white p-5 card-ring">
      <div className="flex items-center justify-between border-b border-ink-100 pb-3">
        <p className="text-sm font-bold text-ink-900">The aitoolslist.ai briefing</p>
        <span className="text-[10px] text-ink-400">Fortnightly</span>
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-brand-600">Featured this edition</p>
      <div className="mt-2 rounded-xl border-2 border-brand-300 bg-brand-50/60 p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">YP</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-ink-900">Your Product</p>
            <p className="text-[11px] text-ink-500">Your one-line pitch, in front of AI-tool buyers</p>
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-2 opacity-60">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-ink-100" />
            <div className="flex-1">
              <div className="h-2 w-28 rounded-full bg-ink-100" />
              <div className="mt-1 h-1.5 w-40 rounded-full bg-ink-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
