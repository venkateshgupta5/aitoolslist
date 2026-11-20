/**
 * Applies the generated SQL migrations to Neon non-interactively.
 * Run with DATABASE_URL in the environment.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql as raw } from "drizzle-orm";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Aborting migration.");
  process.exit(1);
}

const db = drizzle(neon(url));
const dir = join(process.cwd(), "drizzle", "migrations");

async function main() {
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    console.log(`Applying ${file}…`);
    const content = readFileSync(join(dir, file), "utf8");
    // drizzle separates statements with a custom breakpoint marker
    const statements = content
      .split("--> statement-breakpoint")
      .map((s) => s.trim())
      .filter(Boolean);

    for (const stmt of statements) {
      try {
        await db.execute(raw.raw(stmt));
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (/already exists/i.test(msg)) {
          console.log(`  skip (exists): ${msg.split("\n")[0]}`);
          continue;
        }
        throw err;
      }
    }
  }
  console.log("✓ Migrations applied.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
