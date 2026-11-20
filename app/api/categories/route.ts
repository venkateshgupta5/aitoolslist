import { NextResponse } from "next/server";
import { sortedCategories } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({ categories: sortedCategories() });
}
