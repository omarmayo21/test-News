import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBuilderRenderer } from "@/components/sections/page-builder-renderer";
import { getPage, getAllPages } from "@/lib/sanity/queries";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";

export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await getAllPages();
  const params: any[] = [];
  
  pages.forEach((page: any) => {
    if (page.slugEn) params.push({ lang: "en", slug: page.slugEn });
    if (page.slugFr) params.push({ lang: "fr", slug: page.slugFr });
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = (lang as Locale) || "en";
  const pageData = await getPage(slug);

  if (!pageData) {
    return constructMetadata({
      title: "Page Not Found",
      locale,
      path: `/${slug}`,
    });
  }

  return constructMetadata({
    title: pageData?.seo?.metaTitle?.[locale] || pageData?.title?.[locale] || pageData?.title?.en || "Nexus Resources",
    description: pageData?.seo?.metaDescription?.[locale],
    locale,
    path: `/${slug}`,
  });
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = (lang as Locale) || "en";
  const pageData = await getPage(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="w-full">
      <PageBuilderRenderer locale={locale} blocks={pageData.pageBuilder} />
    </div>
  );
}
