import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";
import { z } from "zod";

// The listing checkout. The browser sends only customer details; the product
// (the $199 listing) is fixed server-side so a client can never change price.
const bodySchema = z.object({
  email: z.string().email(),
  contactName: z.string().min(1).max(120),
  companyName: z.string().min(1).max(160),
  productName: z.string().min(1).max(160),
  categorySlug: z.string().min(1).max(120),
  submissionId: z.string().max(64).nullish(),
});

function client() {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  if (!apiKey) return null;
  return new DodoPayments({
    bearerToken: apiKey,
    environment:
      process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode"
        ? "live_mode"
        : "test_mode",
  });
}

export async function POST(req: Request) {
  const dodo = client();
  const productId = process.env.DODO_LISTING_PRODUCT_ID;
  if (!dodo || !productId) {
    return NextResponse.json(
      { error: "Checkout is not configured yet." },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    new URL(req.url).origin;

  try {
    // Create the session and read the product price (shown to the buyer).
    const [session, product] = await Promise.all([
      dodo.checkoutSessions.create({
        product_cart: [{ product_id: productId, quantity: 1 }],
        customer: { email: data.email, name: data.contactName },
        metadata: {
          company_name: data.companyName,
          product_name: data.productName,
          category_slug: data.categorySlug,
          source: "submit-tool",
          ...(data.submissionId ? { submission_id: data.submissionId } : {}),
        },
        customization: { show_order_details: true },
        return_url: `${origin}/submit-tool?checkout=success`,
      }),
      dodo.products.retrieve(productId),
    ]);

    const price = product.price as { price?: number; currency?: string } | undefined;

    return NextResponse.json({
      checkoutUrl: session.checkout_url,
      productName: product.name ?? "Sponsored listing",
      amount: typeof price?.price === "number" ? price.price : null, // smallest unit
      currency: price?.currency ?? "USD",
    });
  } catch (err) {
    console.error("[checkout] failed to create session", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 },
    );
  }
}

export const runtime = "nodejs";
