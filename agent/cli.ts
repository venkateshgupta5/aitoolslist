/**
 * CLI for the fortnightly discovery agent (PRD §10).
 *
 *   npm run agent                      → get this edition's tool (writes needs_review)
 *   npm run agent -- --dry-run         → research + rank, no DB writes
 *   npm run agent -- --category "AI Agents"
 *   npm run agent -- --publish         → mark edition approved/published
 *
 * Requires DATABASE_URL (and optionally GITHUB_TOKEN) in the environment.
 */
import { runAgent } from "./orchestrator";
import { agentCategories } from "./config/categories";

function parseArgs(argv: string[]) {
  const opts: {
    dryRun?: boolean;
    publish?: boolean;
    autoSignoff?: boolean;
    category?: string;
    command: string;
  } = { command: "get this edition's tool" };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--publish") opts.publish = true;
    else if (a === "--auto-signoff") opts.autoSignoff = true;
    else if (a === "--no-auto-signoff") opts.autoSignoff = false;
    else if (a === "--reverify") opts.command = "get this edition's tool --reverify";
    else if (a === "--category") {
      const name = argv[++i] ?? "";
      const match = agentCategories.find(
        (c) =>
          c.name.toLowerCase() === name.toLowerCase() ||
          c.slug === name.toLowerCase(),
      );
      if (!match) {
        console.error(`Unknown category: "${name}"`);
        process.exit(1);
      }
      opts.category = match.slug;
    }
  }
  return opts;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  console.log(`▶ Running agent: ${opts.command}${opts.dryRun ? " (dry-run)" : ""}`);
  const edition = await runAgent(opts);

  console.log(`\n── ${edition.periodKey} (${edition.periodStart} → ${edition.periodEnd}) ──`);
  console.log("Sources:", JSON.stringify(edition.sourceStatus));
  console.log("Stats:", JSON.stringify(edition.stats));
  console.log("\nWinners:");
  for (const w of edition.winners) {
    if (w.tool) {
      console.log(
        `  ✓ ${w.categoryName}: ${w.tool.name} (score ${w.tool.total}, ${w.verificationStatus})`,
      );
    } else {
      console.log(`  — ${w.categoryName}: insufficient evidence`);
    }
  }
}

main().catch((err) => {
  console.error("Agent run failed:", err);
  process.exit(1);
});
