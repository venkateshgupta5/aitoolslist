/**
 * Structured local JSON storage (PRD §8). Every edition run preserves raw
 * responses, enriched records, evidence and final decisions so runs are
 * reproducible. Never writes API secrets.
 *
 * On a read-only serverless filesystem (Vercel) writes fall back to /tmp and
 * are best-effort — the DB is the durable store there.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.env.AGENT_DATA_DIR || join(process.cwd(), "agent", "data");

function baseDir(): string {
  // Vercel's bundle dir is read-only except /tmp
  if (process.env.VERCEL) return join("/tmp", "aitoolslist-agent");
  return ROOT;
}

export function saveJson(
  bucket: "raw" | "enriched" | "verified" | "winners",
  periodKey: string,
  name: string,
  data: unknown,
): string | null {
  try {
    const dir =
      bucket === "raw"
        ? join(baseDir(), "raw", periodKey)
        : join(baseDir(), bucket);
    mkdirSync(dir, { recursive: true });
    const file = join(
      dir,
      bucket === "raw" ? `${name}.json` : `${periodKey}.json`,
    );
    writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
    return file;
  } catch (err) {
    console.warn("[storage] could not persist locally:", (err as Error).message);
    return null;
  }
}
