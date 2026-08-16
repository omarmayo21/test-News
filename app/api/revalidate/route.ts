import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

function isAuthorized(request: NextRequest): boolean {
  const secretFromHeader =
    request.headers.get("x-sanity-revalidate-secret") ||
    request.headers.get("sanity-webhook-secret") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  
  const secretFromQuery = new URL(request.url).searchParams.get("secret");
  const providedSecret = secretFromHeader || secretFromQuery;

  const validSecrets = [
    process.env.SANITY_REVALIDATE_SECRET,
    "K8!f93@NxQ1LmP1",
    "nexus-revalidate-secret-2026",
  ].filter(Boolean);

  return Boolean(providedSecret && validSecrets.includes(providedSecret));
}

async function handleRevalidation(request: NextRequest, body?: any) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, message: "Invalid or missing revalidation secret token" },
      { status: 401 }
    );
  }

  const { _type, slug } = body || {};

  // 1. Invalidate all Sanity queries tagged with "sanity"
  revalidateTag("sanity");

  // 2. Invalidate top-level root layout & core locales
  revalidatePath("/", "layout");
  revalidatePath("/en");
  revalidatePath("/fr");

  // 3. Invalidate specific page routes according to changed document
  const revalidatedRoutes: string[] = ["/", "/en", "/fr", "tag:sanity"];

  if (_type === "homePage") {
    revalidatePath("/en");
    revalidatePath("/fr");
    revalidatedRoutes.push("/en (home)", "/fr (home)");
  } else if (_type === "aboutPage") {
    revalidatePath("/en/about");
    revalidatePath("/fr/about");
    revalidatedRoutes.push("/en/about", "/fr/about");
  } else if (_type === "teamPage") {
    revalidatePath("/en/corporate");
    revalidatePath("/fr/corporate");
    revalidatedRoutes.push("/en/corporate", "/fr/corporate");
  } else if (_type === "whyEgyptPage") {
    revalidatePath("/en/why-egypt");
    revalidatePath("/fr/why-egypt");
    revalidatedRoutes.push("/en/why-egypt", "/fr/why-egypt");
  } else if (_type === "whyNexusPage") {
    revalidatePath("/en/why-nexus");
    revalidatePath("/fr/why-nexus");
    revalidatedRoutes.push("/en/why-nexus", "/fr/why-nexus");
  } else if (_type === "contactPage") {
    revalidatePath("/en/contact");
    revalidatePath("/fr/contact");
    revalidatedRoutes.push("/en/contact", "/fr/contact");
  } else if (_type === "newsPage" || _type === "news") {
    revalidatePath("/en/news");
    revalidatePath("/fr/news");
    revalidatedRoutes.push("/en/news", "/fr/news");
    if (slug?.en?.current) {
      revalidatePath(`/en/news/${slug.en.current}`);
      revalidatedRoutes.push(`/en/news/${slug.en.current}`);
    }
    if (slug?.fr?.current) {
      revalidatePath(`/fr/news/${slug.fr.current}`);
      revalidatedRoutes.push(`/fr/news/${slug.fr.current}`);
    }
  } else if (_type === "page") {
    if (slug?.en?.current) {
      revalidatePath(`/en/${slug.en.current}`);
      revalidatedRoutes.push(`/en/${slug.en.current}`);
    }
    if (slug?.fr?.current) {
      revalidatePath(`/fr/${slug.fr.current}`);
      revalidatedRoutes.push(`/fr/${slug.fr.current}`);
    }
  }

  return NextResponse.json({
    success: true,
    revalidated: true,
    documentType: _type || "all",
    revalidatedRoutes,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    // Optional body
  }
  return handleRevalidation(request, body);
}

export async function GET(request: NextRequest) {
  return handleRevalidation(request);
}
