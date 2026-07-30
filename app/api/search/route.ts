import { NextRequest, NextResponse } from "next/server";
import { getGlobalSearchResults } from "@/lib/sanity/queries";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json({ news: [], pages: [] });
  }

  const results = await getGlobalSearchResults(query);
  return NextResponse.json(results);
}
