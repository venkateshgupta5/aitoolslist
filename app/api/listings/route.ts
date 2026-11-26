import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { listingSchema } from "@/lib/validation";
import { auth } from "@/auth";

export async function POST(req: Request) {
  // The signed-in account (used to show this order under "My orders").
  const session = await auth();
  const accountEmail = session?.user?.email ?? null;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = listingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validation failed" },
      { status: 400 },
    );
  }
  const data = parsed.data;

  if (!db) {
    console.warn("[listings] DATABASE_URL not configured, not persisted", {
      email: data.email,
      product: data.productName,
    });
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    const [category] = await db
      .select({ id: schema.categories.id })
      .from(schema.categories)
      .where(eq(schema.categories.slug, data.categorySlug))
      .limit(1);

    const [inserted] = await db
      .insert(schema.listingSubmissions)
      .values({
        companyName: data.companyName,
        productName: data.productName,
        websiteUrl: data.websiteUrl,
        contactName: data.contactName,
        email: data.email,
        accountEmail: accountEmail ?? data.email,
        categoryId: category?.id ?? null,
        description: data.description || null,
        paymentStatus: "pending",
      })
      .returning({ id: schema.listingSubmissions.id });

    return NextResponse.json({
      ok: true,
      persisted: true,
      submissionId: inserted?.id ?? null,
    });
  } catch (err) {
    console.error("[listings] insert failed", err);
    return NextResponse.json(
      { error: "Could not save your submission. Please try again." },
      { status: 500 },
    );
  }
}
