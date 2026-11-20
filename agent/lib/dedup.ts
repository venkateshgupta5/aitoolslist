/**
 * Deterministic canonical identity + deduplication key for a candidate.
 * Key is derived from the normalized website host, falling back to the
 * normalized name, so the same product discovered on multiple sources
 * collapses to one canonical record.
 */
export function canonicalHost(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function dedupKey(name: string, website?: string | null): string {
  const host = canonicalHost(website);
  if (host) return `host:${host}`;
  return `name:${slugify(name)}`;
}
