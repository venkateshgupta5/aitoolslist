/**
 * The 10 research sources (PRD §3). `auth` describes what each needs:
 *  - "none": public API / permitted feed, works with no key
 *  - env var name: requires that key; connector degrades (logs a source
 *    failure) when the key is absent, per acceptance criteria §11.
 */
export interface SourceDef {
  id: string;
  name: string;
  auth: "none" | string;
  note: string;
}

export const sources: SourceDef[] = [
  { id: "producthunt", name: "Product Hunt", auth: "PRODUCTHUNT_API_KEY", note: "GraphQL v2, OAuth client-credentials (PRODUCTHUNT_API_KEY/SECRET)." },
  { id: "hackernews", name: "Hacker News", auth: "none", note: "Algolia HN Search API — keyless." },
  { id: "github", name: "GitHub", auth: "none", note: "Public Search API (GITHUB_TOKEN lifts rate limits)." },
  { id: "reddit", name: "Reddit", auth: "none", note: "Public .json listing endpoints — keyless, rate-limited." },
  { id: "peerlist", name: "Peerlist", auth: "FIRECRAWL_API_KEY", note: "No public API; needs compliant crawl." },
  { id: "betalist", name: "BetaList", auth: "FIRECRAWL_API_KEY", note: "No public API; needs compliant crawl." },
  { id: "techcrunch", name: "TechCrunch", auth: "none", note: "Public RSS feed." },
  { id: "crunchbase", name: "Crunchbase", auth: "CRUNCHBASE_API_KEY", note: "Funding data API requires a key." },
  { id: "g2", name: "G2", auth: "FIRECRAWL_API_KEY", note: "No public API; needs compliant crawl." },
  { id: "official", name: "Official sites & changelogs", auth: "TAVILY_API_KEY", note: "Tavily/Firecrawl for enrichment; WebFetch otherwise." },
];

export function sourceIsAvailable(s: SourceDef): boolean {
  if (s.auth === "none") return true;
  return Boolean(process.env[s.auth]);
}
