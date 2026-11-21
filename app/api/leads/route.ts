import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { leadSchema } from "@/lib/validation";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validation failed" },
      { status: 400 },
    );
  }
  const data = parsed.data;

  if (!db) {
    console.warn("[leads] DATABASE_URL not configured, lead not persisted", {
      email: data.email,
      product: data.productSlug,
    });
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    const [product] = await db
      .select({ id: schema.products.id })
      .from(schema.products)
      .where(eq(schema.products.slug, data.productSlug))
      .limit(1);

    if (!product) {
      return NextResponse.json({ error: "Unknown product" }, { status: 404 });
    }

    await db.insert(schema.leads).values({
      productId: product.id,
      fullName: data.fullName,
      email: data.email,
      location: data.location,
      profession: data.profession,
      message: data.message || null,
      consent: data.consent,
    });

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error("[leads] insert failed", err);
    return NextResponse.json(
      { error: "Could not save your enquiry. Please try again." },
      { status: 500 },
    );
  }
}
