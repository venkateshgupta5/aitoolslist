import { NextResponse } from "next/server";
import { EDITION, editionPicks } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const picks = editionPicks().map((p) => ({
    category: p.category.name,
    categorySlug: p.category.slug,
    product: p.product
      ? { slug: p.product.slug, name: p.product.name }
      : null,
  }));
  return NextResponse.json({ edition: EDITION, picks });
}
