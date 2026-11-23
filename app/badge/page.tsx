import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Featured badge",
  description:
    "Were you featured on aitoolslist.ai? Add the official “Featured on aitoolslist.ai” badge to your site, linking back to your independent, researched product profile.",
  alternates: { canonical: "/badge" },
};

const darkSnippet = `<a href="${absoluteUrl("/tools/YOUR-TOOL-SLUG")}" target="_blank" rel="noopener">
  <img src="${absoluteUrl("/badge.svg")}"
       alt="Featured on aitoolslist.ai" width="240" height="56" />
</a>`;

const lightSnippet = `<a href="${absoluteUrl("/tools/YOUR-TOOL-SLUG")}" target="_blank" rel="noopener">
  <img src="${absoluteUrl("/badge.svg?theme=light")}"
       alt="Featured on aitoolslist.ai" width="240" height="56" />
</a>`;

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg border border-ink-200 bg-ink-50 p-4 text-[12.5px] leading-relaxed text-ink-800">
      <code>{code}</code>
    </pre>
  );
}

export default function BadgePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>{" "}
        <span className="text-ink-300">/</span>{" "}
        <span className="text-ink-700">Featured badge</span>
      </nav>

      <span className="mt-4 block text-[11px] font-semibold uppercase tracking-wide text-brand-600">
        For featured companies
      </span>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
        The &ldquo;Featured on aitoolslist.ai&rdquo; badge
      </h1>
      <p className="mt-4 text-lg text-ink-600">
        Was your product researched and featured in an edition? Show it. Add the official
        badge to your homepage, press page, or footer &mdash; it links back to your
        independent, fact-checked profile on aitoolslist.ai.
      </p>

      {/* Preview */}
      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
          Preview
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-6 rounded-xl border border-ink-200 p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/badge.svg" alt="Featured on aitoolslist.ai (dark)" width={240} height={56} />
          <div className="rounded-lg bg-ink-900 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/badge.svg?theme=light"
              alt="Featured on aitoolslist.ai (light)"
              width={240}
              height={56}
            />
          </div>
        </div>
      </div>

      {/* Embed */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-ink-900">Add it to your site</h2>
        <p className="mt-2 text-ink-600">
          Copy the snippet below and replace{" "}
          <code className="rounded bg-ink-100 px-1.5 py-0.5 text-[13px] text-ink-800">
            YOUR-TOOL-SLUG
          </code>{" "}
          with your product&rsquo;s profile path (you&rsquo;ll find it in the URL of your
          page on this site, e.g.{" "}
          <code className="rounded bg-ink-100 px-1.5 py-0.5 text-[13px] text-ink-800">
            /tools/langfuse
          </code>
          ).
        </p>

        <h3 className="mt-6 text-sm font-semibold text-ink-900">Dark badge</h3>
        <CodeBlock code={darkSnippet} />

        <h3 className="mt-6 text-sm font-semibold text-ink-900">
          Light badge (for dark backgrounds)
        </h3>
        <CodeBlock code={lightSnippet} />
      </div>

      {/* Guidelines */}
      <div className="mt-10 rounded-xl border border-ink-200 bg-ink-50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
          A few notes
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-600">
          <li>The badge is free to use for any product we have independently featured.</li>
          <li>
            Please keep the link pointing to your aitoolslist.ai profile and don&rsquo;t
            alter the badge artwork.
          </li>
          <li>
            The badge reflects editorial coverage, not an endorsement, partnership, or paid
            placement.
          </li>
          <li>
            Not featured yet?{" "}
            <Link href="/submit-tool" className="text-brand-600 hover:underline">
              Submit your tool
            </Link>
            .
          </li>
        </ul>
      </div>
    </div>
  );
}
