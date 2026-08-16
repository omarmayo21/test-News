import React from "react";
import type { Metadata } from "next";
import { PageBuilderRenderer } from "@/components/sections/page-builder-renderer";
import { getHomePageData } from "@/lib/sanity/queries";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const homeData = await getHomePageData();

  return constructMetadata({
    title: homeData?.seo?.metaTitle?.[locale] || "Nexus Resources - Engineering the Future of Egyptian Mining",
    description:
      homeData?.seo?.metaDescription?.[locale] ||
      "Nexus Resources is an Egyptian mining and mineral development company advancing high potential gold and mineral opportunities from exploration toward responsible production.",
    locale,
    path: "",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const homeData = await getHomePageData();

  return <PageBuilderRenderer locale={locale} blocks={homeData?.pageBuilder} />;
}
