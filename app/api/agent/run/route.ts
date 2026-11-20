/**
 * Weekly Discovery Agent trigger (PRD §10).
 *
 * - GET  : used by Vercel Cron (Mon 00:00 UTC). Auth via Vercel's
 *          `Authorization: Bearer $CRON_SECRET` header.
 * - POST : manual/on-demand run. Auth via `x-agent-secret: $AGENT_SECRET`.
 *          Body/query: dryRun, publish, category.
 *
 * Runs produce a needs_review edition (never auto-publishes to the public site
 * unless `publish` is explicitly set AND an editor has approved).
 */
import { NextResponse } from "next/server";
import { runAgent } from "@/agent/orchestrator";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function authorized(req: Request): boolean {
  const auth = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;

  const agentSecret = process.env.AGENT_SECRET;
  const provided = req.headers.get("x-agent-secret");
  if (agentSecret && provided === agentSecret) return true;

  // If no secrets are configured at all, refuse (fail closed).
  return false;
}

async function handle(
  req: Request,
  opts: { dryRun?: boolean; publish?: boolean; category?: string },
) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const edition = await runAgent({ ...opts, command: "get this week's tool" });
    return NextResponse.json({
      ok: true,
      isoWeek: edition.isoWeek,
      weekStart: edition.weekStart,
      weekEnd: edition.weekEnd,
      sourceStatus: edition.sourceStatus,
      stats: edition.stats,
      winners: edition.winners.map((w) => ({
        category: w.categoryName,
        tool: w.tool?.name ?? null,
        score: w.tool?.total ?? null,
        verificationStatus: w.verificationStatus,
      })),
    });
  } catch (err) {
    console.error("[agent/run]", err);
    return NextResponse.json(
      { error: "Agent run failed", detail: (err as Error).message },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  // Cron runs are research-only (needs_review); never auto-publish.
  return handle(req, { dryRun: false, publish: false });
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    /* no body */
  }
  const dryRun =
    url.searchParams.get("dryRun") === "true" || body.dryRun === true;
  const publish =
    url.searchParams.get("publish") === "true" || body.publish === true;
  const category =
    url.searchParams.get("category") ?? (body.category as string | undefined);
  return handle(req, { dryRun, publish, category });
}
