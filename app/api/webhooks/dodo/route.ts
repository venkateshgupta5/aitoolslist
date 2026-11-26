import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";
import { and, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";

// Dodo posts a signed webhook here. We verify the signature on the raw body,
// then mark the matching listing submission paid. Access/record state is
// granted ONLY from this verified webhook, never from the return_url.

function client() {
  const bearerToken = process.env.DODO_PAYMENTS_API_KEY;
  const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  if (!bearerToken || !webhookKey) return null;
  return new DodoPayments({
    bearerToken,
    webhookKey,
    environment:
      process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode"
        ? "live_mode"
        : "test_mode",
  });
}

export async function POST(req: Request) {
  const dodo = client();
  if (!dodo) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const raw = await req.text();

  let event: DodoPayments.UnwrapWebhookEvent;
  try {
    event = dodo.webhooks.unwrap(raw, {
      headers: {
        "webhook-id": req.headers.get("webhook-id") ?? "",
        "webhook-signature": req.headers.get("webhook-signature") ?? "",
        "webhook-timestamp": req.headers.get("webhook-timestamp") ?? "",
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    if (event.type === "payment.succeeded") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = event.data as any;
      const paymentId: string | undefined = data?.payment_id;
      const submissionId: string | undefined = data?.metadata?.submission_id;
      const email: string | undefined = data?.customer?.email;

      if (db) {
        if (submissionId) {
          await db
            .update(schema.listingSubmissions)
            .set({ paymentStatus: "paid", paymentReference: paymentId ?? null })
            .where(eq(schema.listingSubmissions.id, submissionId));
        } else if (email) {
          // Fallback: the most recent pending submission for this email.
          const [row] = await db
            .select({ id: schema.listingSubmissions.id })
            .from(schema.listingSubmissions)
            .where(
              and(
                eq(schema.listingSubmissions.email, email),
                eq(schema.listingSubmissions.paymentStatus, "pending"),
              ),
            )
            .orderBy(schema.listingSubmissions.createdAt)
            .limit(1);
          if (row) {
            await db
              .update(schema.listingSubmissions)
              .set({ paymentStatus: "paid", paymentReference: paymentId ?? null })
              .where(eq(schema.listingSubmissions.id, row.id));
          }
        }
      }
      console.log(`[webhook] payment.succeeded ${paymentId} → submission ${submissionId ?? email ?? "unknown"}`);
    } else if (event.type === "payment.failed") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = event.data as any;
      const submissionId: string | undefined = data?.metadata?.submission_id;
      if (db && submissionId) {
        await db
          .update(schema.listingSubmissions)
          .set({ paymentStatus: "failed" })
          .where(eq(schema.listingSubmissions.id, submissionId));
      }
    }
  } catch (err) {
    // Log but still 200 so Dodo doesn't retry forever on our DB hiccup; the
    // payment is safe in Dodo and can be reconciled.
    console.error("[webhook] handler error", err);
  }

  return NextResponse.json({ received: true });
}

export const runtime = "nodejs";
