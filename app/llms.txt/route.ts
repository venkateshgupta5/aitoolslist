import {
  categories,
  products,
  archiveProducts,
  EDITION,
  segments,
  categoriesForSegment,
} from "@/lib/content";
import { siteConfig, absoluteUrl } from "@/lib/site";

// Serves /llms.txt: a markdown index for LLMs / answer engines (the emerging
// llms.txt convention). Lists our curated categories and researched tool
// profiles so retrieval-augmented models can find and cite the right pages.
// Regenerated from live content on every request.
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");
  lines.push(
    `${siteConfig.name} is an independent AI tool discovery and evaluation platform. It helps people find the right AI tool across ${categories.length} categories organised into ${segments.length} segments, with independently researched, verified profiles refreshed every fortnight. Every tool profile states what was verified, when it was last verified, and links to primary sources. Last updated: ${EDITION.label}.`,
  );
  lines.push("");

  lines.push("## Key pages");
  lines.push(`- [Home](${absoluteUrl("/")}): ${siteConfig.tagline}`);
  lines.push(`- [Categories](${absoluteUrl("/categories")}): All ${categories.length} AI tool categories we track.`);
  lines.push(`- [Current edition](${absoluteUrl(`/editions/${EDITION.slug}`)}): ${EDITION.label}, this fortnight's researched picks.`);
  lines.push(`- [Methodology](${absoluteUrl("/methodology")}): Sources, scoring, evidence standard and what "Verified" means.`);
  lines.push(`- [About](${absoluteUrl("/about")}): What ${siteConfig.name} is and how it stays independent.`);
  lines.push("");

  for (const segment of segments) {
    lines.push(`## ${segment.name}`);
    lines.push(`${segment.tagline}`);
    for (const c of categoriesForSegment(segment.slug)) {
      lines.push(`- [${c.name}](${absoluteUrl(`/categories/${c.slug}`)}): ${c.coverage}`);
    }
    lines.push("");
  }

  lines.push("## Tool profiles");
  for (const p of products) {
    const desc = p.shortDescription || p.tagline || p.overview;
    lines.push(`- [${p.name}](${absoluteUrl(`/tools/${p.slug}`)}): ${desc}`);
  }
  lines.push("");

  if (archiveProducts.length > 0) {
    lines.push("## Past-edition tools");
    lines.push("Standout tools from earlier fortnightly editions, each with a verified profile.");
    for (const p of archiveProducts) {
      const desc = p.shortDescription || p.tagline;
      lines.push(`- [${p.name}](${absoluteUrl(`/tools/${p.slug}`)}): ${desc}`);
    }
    lines.push("");
  }

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
