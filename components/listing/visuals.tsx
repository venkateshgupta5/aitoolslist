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

/** 1. A sample product page. */
export function ProductPageMock() {
  return (
    <div className="rounded-2xl border border-ink-200/80 bg-white p-5 card-ring">
      <div className="flex items-center gap-2 border-b border-ink-100 pb-3 text-[11px] text-ink-400">
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-2 rounded-full bg-amber-300" />
        <span className="h-2 w-2 rounded-full bg-emerald-300" />
        <span className="ml-2 truncate">aitoolslist.ai/tools/your-product</span>
      </div>
      <div className="mt-4 flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-base font-bold text-white">
          YP
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-base font-bold text-ink-900">Your Product</p>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              Listed
            </span>
          </div>
          <p className="text-xs text-ink-500">One line that nails what you do</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
        {[["Category", "AI Image Generation"], ["Pricing", "From $19/mo"], ["Type", "Web app · API"], ["Website", "yourproduct.com"]].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-ink-50 px-2.5 py-2">
            <p className="text-ink-400">{k}</p>
            <p className="mt-0.5 font-semibold text-ink-800">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-1.5">
        {["Key features, described clearly", "Who it's for and real use cases", "Structured for search and AI"].map((t) => (
          <p key={t} className="flex items-center gap-2 text-xs text-ink-600">{check}{t}</p>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-brand-500 py-2 text-center text-xs font-semibold text-white">
        Visit website ↗
      </div>
    </div>
  );
}

/** 2. A category page with the featured product pinned on top. */
export function CategoryPlacementMock() {
  return (
    <div className="rounded-2xl border border-ink-200/80 bg-white p-5 card-ring">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">AI Image Generation</p>
      <p className="mt-0.5 text-xs text-ink-400">Hundreds of tools · one featured spot</p>

      <div className="mt-4 rounded-xl border-2 border-brand-300 bg-brand-50/60 p-3 ring-2 ring-brand-500/10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">YP</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-ink-900">Your Product</p>
            <p className="text-[11px] text-ink-500">Featured at the top</p>
          </div>
          <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-semibold text-white">Featured</span>
        </div>
      </div>

      <div className="mt-2 space-y-2 opacity-60">
        {["Competing tool A", "Competing tool B", "Competing tool C"].map((n, i) => (
          <div key={n} className="flex items-center gap-2.5 rounded-xl border border-ink-200/70 bg-white p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-100 text-[11px] font-bold text-ink-400">{String.fromCharCode(65 + i)}</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink-700">{n}</p>
              <div className="mt-1 h-1.5 w-24 rounded-full bg-ink-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">dofollow link</span>
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
        <span className="mt-2 flex w-fit items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-ink-500 ring-1 ring-inset ring-ink-200">
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
