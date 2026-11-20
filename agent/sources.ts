/**
 * Source connectors. Each returns raw candidates for the week plus a status.
 * Keyless connectors (GitHub, Hacker News, Reddit, TechCrunch) do real network
 * calls. Keyed connectors degrade to "skipped" with a logged reason when their
 * key is absent (PRD §11: all sources attempted, failures logged).
 */
import type { WeekWindow } from "./lib/date-window";
import { dedupKey, canonicalHost } from "./lib/dedup";
import { sources, sourceIsAvailable, type SourceDef } from "./config/sources";
import type { Candidate } from "./schemas";

export type SourceStatus = "ok" | "skipped" | "error";

export interface SourceResult {
  sourceId: string;
  status: SourceStatus;
  reason?: string;
  candidates: Candidate[];
}

const UA = "aitoolslist-agent/1.0 (+https://aitoolslist.ai)";

function mk(
  name: string,
  website: string | null,
  sourceId: string,
  url: string,
  extra: Partial<Candidate> = {},
): Candidate {
  return {
    name: name.trim(),
    website,
    dedupKey: dedupKey(name, website),
    signals: {},
    evidence: [{ sourceId, url }],
    discoveredFrom: [sourceId],
    ...extra,
  };
}

// ── GitHub ───────────────────────────────────────────────────────────────
async function github(win: WeekWindow): Promise<SourceResult> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": UA,
  };
  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const q = encodeURIComponent(
    `created:>=${win.weekStart} topic:ai stars:>20`,
  );
  const url = `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=40`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`github ${res.status}`);
  const data = (await res.json()) as {
    items?: Array<{
      name: string;
      full_name: string;
      html_url: string;
      homepage?: string;
      description?: string;
      stargazers_count: number;
      forks_count: number;
      owner?: { login: string };
    }>;
  };
  const candidates = (data.items ?? []).map((r) =>
    mk(r.name, r.homepage || r.html_url, "github", r.html_url, {
      description: r.description ?? undefined,
      signals: { stars: r.stargazers_count, forks: r.forks_count },
      evidence: [
        { sourceId: "github", url: r.html_url, title: r.full_name },
      ],
    }),
  );
  return { sourceId: "github", status: "ok", candidates };
}

// ── Hacker News (Algolia) ──────────────────────────────────────────────────
async function hackernews(win: WeekWindow): Promise<SourceResult> {
  const url = `https://hn.algolia.com/api/v1/search?tags=(story,show_hn)&numericFilters=created_at_i>${win.startUnix},created_at_i<${win.endUnix}&query=AI&hitsPerPage=50`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`hn ${res.status}`);
  const data = (await res.json()) as {
    hits?: Array<{
      title: string;
      url?: string;
      objectID: string;
      points?: number;
      num_comments?: number;
    }>;
  };
  const candidates = (data.hits ?? [])
    .filter((h) => h.title)
    .map((h) => {
      const name = h.title.replace(/^Show HN:\s*/i, "").split(/[–—-]/)[0].trim();
      const hnUrl = `https://news.ycombinator.com/item?id=${h.objectID}`;
      return mk(name, h.url ?? null, "hackernews", hnUrl, {
        signals: { points: h.points ?? 0, comments: h.num_comments ?? 0 },
        evidence: [{ sourceId: "hackernews", url: hnUrl, title: h.title }],
      });
    });
  return { sourceId: "hackernews", status: "ok", candidates };
}

// ── Reddit (public JSON) ───────────────────────────────────────────────────
async function reddit(_win: WeekWindow): Promise<SourceResult> {
  const subs = ["artificial", "LocalLLaMA", "machinelearningnews"];
  const candidates: Candidate[] = [];
  for (const sub of subs) {
    try {
      const res = await fetch(
        `https://www.reddit.com/r/${sub}/top.json?t=week&limit=25`,
        { headers: { "User-Agent": UA } },
      );
      if (!res.ok) continue;
      const data = (await res.json()) as {
        data?: { children?: Array<{ data: Record<string, unknown> }> };
      };
      for (const child of data.data?.children ?? []) {
        const p = child.data;
        const title = String(p.title ?? "");
        const permalink = `https://www.reddit.com${p.permalink ?? ""}`;
        const ext = typeof p.url_overridden_by_dest === "string" ? p.url_overridden_by_dest : null;
        if (!title) continue;
        candidates.push(
          mk(title.slice(0, 80), ext, "reddit", permalink, {
            signals: {
              votes: Number(p.ups ?? 0),
              comments: Number(p.num_comments ?? 0),
            },
            evidence: [{ sourceId: "reddit", url: permalink, title }],
          }),
        );
      }
    } catch {
      /* skip this subreddit */
    }
  }
  if (candidates.length === 0)
    return {
      sourceId: "reddit",
      status: "error",
      reason: "no reddit data (rate-limited or blocked)",
      candidates: [],
    };
  return { sourceId: "reddit", status: "ok", candidates };
}

// ── TechCrunch (RSS) ───────────────────────────────────────────────────────
async function techcrunch(_win: WeekWindow): Promise<SourceResult> {
  const res = await fetch(
    "https://techcrunch.com/tag/artificial-intelligence/feed/",
    { headers: { "User-Agent": UA } },
  );
  if (!res.ok) throw new Error(`techcrunch ${res.status}`);
  const xml = await res.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 25);
  const candidates = items
    .map((m) => {
      const block = m[1];
      const title = (block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1];
      const link = (block.match(/<link>([\s\S]*?)<\/link>/) || [])[1];
      if (!title || !link) return null;
      return mk(title.trim().slice(0, 80), null, "techcrunch", link.trim(), {
        evidence: [{ sourceId: "techcrunch", url: link.trim(), title: title.trim() }],
      });
    })
    .filter((c): c is Candidate => c !== null);
  return { sourceId: "techcrunch", status: "ok", candidates };
}

const connectors: Record<
  string,
  (win: WeekWindow) => Promise<SourceResult>
> = { github, hackernews, reddit, techcrunch };

export async function runDiscovery(win: WeekWindow): Promise<{
  candidates: Candidate[];
  status: Record<string, SourceStatus>;
}> {
  const status: Record<string, SourceStatus> = {};
  const all: Candidate[] = [];

  await Promise.all(
    sources.map(async (s: SourceDef) => {
      const connector = connectors[s.id];
      if (!connector) {
        // keyed source without a real connector / key
        if (!sourceIsAvailable(s)) {
          status[s.id] = "skipped";
          console.warn(`[discovery] ${s.id} skipped — ${s.note}`);
        } else {
          status[s.id] = "skipped";
          console.warn(`[discovery] ${s.id} connector not implemented`);
        }
        return;
      }
      try {
        const r = await connector(win);
        status[s.id] = r.status;
        if (r.reason) console.warn(`[discovery] ${s.id}: ${r.reason}`);
        all.push(...r.candidates);
      } catch (err) {
        status[s.id] = "error";
        console.error(`[discovery] ${s.id} error:`, (err as Error).message);
      }
    }),
  );

  // Deduplicate by canonical key, merging signals + evidence.
  const byKey = new Map<string, Candidate>();
  for (const c of all) {
    const existing = byKey.get(c.dedupKey);
    if (existing) {
      existing.evidence.push(...c.evidence);
      existing.discoveredFrom = Array.from(
        new Set([...existing.discoveredFrom, ...c.discoveredFrom]),
      );
      existing.signals = { ...existing.signals, ...c.signals };
      if (!existing.website && c.website) existing.website = c.website;
    } else {
      byKey.set(c.dedupKey, { ...c });
    }
  }

  return { candidates: [...byKey.values()], status };
}

export { canonicalHost };
