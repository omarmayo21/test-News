import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get("x-sanity-revalidate-secret") || new URL(request.url).searchParams.get("secret");
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET || "nexus-revalidate-secret-2026";

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid revalidate secret" }, { status: 401 });
    }

    let body = {};
    try {
      body = await request.json();
    } catch (e) {
      // Ignore if body is empty or invalid JSON
    }
    
    const { _type, slug } = body as any;

    // Revalidate paths based on content type
    revalidatePath("/", "layout");
    revalidateTag("sanity");
    revalidatePath("/en");
    revalidatePath("/fr");

    if (_type === "news") {
      revalidatePath("/en/news");
      revalidatePath("/fr/news");
      if (slug?.en?.current) revalidatePath(`/en/news/${slug.en.current}`);
      if (slug?.fr?.current) revalidatePath(`/fr/news/${slug.fr.current}`);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: "Error revalidating", error: err.message }, { status: 500 });
  }
}
