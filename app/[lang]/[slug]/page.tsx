import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import dynamic from "next/dynamic";
import { getPage, getAllPages } from "@/lib/sanity/queries";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";

const CapabilitiesGrid = dynamic(() => import("@/components/sections/capabilities-grid").then((mod) => mod.CapabilitiesGrid));
const WhyEgyptTeaser = dynamic(() => import("@/components/sections/why-egypt-teaser").then((mod) => mod.WhyEgyptTeaser));
const CtaBanner = dynamic(() => import("@/components/sections/cta-banner").then((mod) => mod.CtaBanner));



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
      {pageData.pageBuilder?.map((block: any, index: number) => {
        switch (block._type) {
          case "heroBlock":
            return <Hero key={index} locale={locale} data={block} />;
          case "capabilitiesBlock":
            return <CapabilitiesGrid key={index} locale={locale} data={block} />;
          case "statsBlock":
            return <WhyEgyptTeaser key={index} locale={locale} data={block} />;
          case "ctaBlock":
            return <CtaBanner key={index} locale={locale} data={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
