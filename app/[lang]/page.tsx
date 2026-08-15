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

  return (
    <>
      {homeData?.pageBuilder?.map((block: any, idx: number) => {
        if (block._type === "heroBlock") {
          return <Hero key={block._key || idx} locale={locale} data={block} />;
        }
        if (block._type === "capabilitiesBlock") {
          return <CapabilitiesGrid key={block._key || idx} locale={locale} data={block} />;
        }
        if (block._type === "statsBlock") {
          return <WhyEgyptTeaser key={block._key || idx} locale={locale} data={block} />;
        }
        if (block._type === "ctaBlock") {
          return <CtaBanner key={block._key || idx} locale={locale} data={block} />;
        }
        return null;
      })}
    </>
  );
}
