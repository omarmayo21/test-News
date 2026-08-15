import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PortableText } from "@portabletext/react";
import { getWhyNexusPageData } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { PageBuilder } from "@/components/sections/page-builder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  return constructMetadata({
    title: "Why Nexus - Our Approach to Egyptian Mining",
    description: "Discover how Nexus combines local execution, technical expertise, and strategic partnerships to advance mineral opportunities.",
    locale,
    path: "/why-nexus",
  });
}

export default async function WhyNexusPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);
  const data = await getWhyNexusPageData();

  const title = data?.title?.[locale] || data?.title?.en || "Why Nexus";
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en || "";
  
  const contentBlocks = data?.contentBlocks || [];

  const ctaTitle = data?.ctaTitle?.[locale] || data?.ctaTitle?.en || "Partner With Nexus";
  const ctaSubtitle = data?.ctaSubtitle?.[locale] || data?.ctaSubtitle?.en || "";
  const ctaButtonLabel = data?.ctaButtonLabel?.[locale] || data?.ctaButtonLabel?.en || "Contact Us";
  const ctaButtonLink = data?.ctaButtonLink || `/${locale}/contact`;

  return (
    <div className="py-section-padding px-margin-mobile md:px-section-padding max-w-container-max mx-auto space-y-20">
      {/* Hero Header */}
      <div className="max-w-3xl">
        <h1 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-body-lg text-on-surface opacity-85 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Dynamic Page Builder Content */}
      <PageBuilder blocks={data?.pageBuilder || []} locale={locale} />

      {/* CTA */}
      <div className="text-center pt-8 border-t border-surface-container-high">
        {ctaTitle && (
          <h3 className="font-headline text-headline-md text-primary-navy mb-6">
            {ctaTitle}
          </h3>
        )}
        {ctaSubtitle && (
          <p className="font-body text-body-lg opacity-80 mb-8 max-w-2xl mx-auto">
            {ctaSubtitle}
          </p>
        )}
        <Link
          href={ctaButtonLink}
          className="inline-block px-10 py-5 bg-primary-gold text-white font-label text-label-md uppercase tracking-widest hover:bg-primary-navy transition-colors"
        >
          {ctaButtonLabel}
        </Link>
      </div>
    </div>
  );
}
