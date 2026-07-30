import React from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import dynamic from "next/dynamic";

const CapabilitiesGrid = dynamic(() => import("@/components/sections/capabilities-grid").then((mod) => mod.CapabilitiesGrid));
const WhyEgyptTeaser = dynamic(() => import("@/components/sections/why-egypt-teaser").then((mod) => mod.WhyEgyptTeaser));
const CtaBanner = dynamic(() => import("@/components/sections/cta-banner").then((mod) => mod.CtaBanner));
import { getHomePageData } from "@/lib/sanity/queries";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";

export const revalidate = 3600; // Revalidate ISR every 1 hour

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
      "Delivering structural excellence and strategic resource management through precision engineering and sustainable practices.",
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

  const heroBlock = homeData?.pageBuilder?.find((b: any) => b._type === "heroBlock");
  const capabilitiesBlock = homeData?.pageBuilder?.find((b: any) => b._type === "capabilitiesBlock");
  const statsBlock = homeData?.pageBuilder?.find((b: any) => b._type === "statsBlock");
  const ctaBlock = homeData?.pageBuilder?.find((b: any) => b._type === "ctaBlock");

  return (
    <>
      <Hero locale={locale} data={heroBlock} />
      <CapabilitiesGrid locale={locale} data={capabilitiesBlock} />
      <WhyEgyptTeaser locale={locale} data={statsBlock} />
      <CtaBanner locale={locale} data={ctaBlock} />
    </>
  );
}
