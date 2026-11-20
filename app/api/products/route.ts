import { NextResponse } from "next/server";
import { products } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const summary = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    categorySlug: p.categorySlug,
    shortDescription: p.shortDescription,
    officialUrl: p.officialUrl,
    verification: p.verification,
  }));
  return NextResponse.json({ products: summary });
}
