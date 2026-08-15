import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAboutPageData } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { PageBuilder } from "@/components/sections/page-builder";



export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);

  return constructMetadata({
    title: `${dict.about.title} - Nexus Resources`,
    description: dict.about.subtitle,
    locale,
    path: "/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);
  const data = await getAboutPageData();

  const title = data?.title?.[locale] || data?.title?.en || dict.about.title;
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en || dict.about.subtitle;
  const overviewTitle = data?.overviewTitle?.[locale] || data?.overviewTitle?.en || "Company Overview";
  const overviewHeadline = data?.overviewHeadline?.[locale] || data?.overviewHeadline?.en || "";
  const overviewDesc = data?.overviewDesc?.[locale] || data?.overviewDesc?.en || "";
  const visionTitle = data?.visionTitle?.[locale] || data?.visionTitle?.en || "Vision";
  const visionDesc = data?.visionDesc?.[locale] || data?.visionDesc?.en || "";
  const missionTitle = data?.missionTitle?.[locale] || data?.missionTitle?.en || dict.about.missionTitle;
  const missionHeadline = data?.missionHeadline?.[locale] || data?.missionHeadline?.en || dict.about.missionHeadline;
  const missionDesc = data?.missionDesc?.[locale] || data?.missionDesc?.en || dict.about.missionDesc;
  const principlesTitle = data?.principlesTitle?.[locale] || data?.principlesTitle?.en || dict.about.principlesTitle;
  
  const ctaTitle = data?.ctaTitle?.[locale] || data?.ctaTitle?.en || "Interested in Partnering with Nexus?";
  const ctaSubtitle = data?.ctaSubtitle?.[locale] || data?.ctaSubtitle?.en || "Connect with our executive management team to explore joint ventures and concessions across the Arabian-Nubian shield.";
  const ctaButtonLabel = data?.ctaButtonLabel?.[locale] || data?.ctaButtonLabel?.en || dict.nav.contact;
  const ctaButtonLink = data?.ctaButtonLink || `/${locale}/contact`;
  const heroImageUrl = data?.heroImage ? urlForImage(data.heroImage)?.url() : "/logo/Original.svg";

  return (
    <div className="w-full">
      {/* Hero: Legacy & Vision */}
      <section className="relative pt-16 pb-24 px-margin-mobile md:px-section-padding max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-5 z-10">
            <h1 className="font-headline font-headline-lg text-display-lg text-primary-navy mb-6">
              {title}
            </h1>
            <p className="font-body text-body-lg text-on-surface opacity-80 mb-10 max-w-md">
              {subtitle}
            </p>
          </div>
          <div className="lg:col-span-7 mt-8 lg:mt-0">
            <div className="aspect-[4/3] w-full relative">
              <div className="absolute inset-4 bg-surface-container-low translate-x-4 translate-y-4"></div>
              <div className="absolute inset-0 overflow-hidden bg-primary-navy/10 border border-surface-container-high">
                <Image
                  src={heroImageUrl!}
                  alt={title}
                  fill
                  className="object-cover grayscale contrast-125 p-8"
                  priority
                  sizes="(max-width: 1023px) 100vw, 58vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Page Builder Content */}
      <PageBuilder blocks={data?.pageBuilder || []} locale={locale} />

      {/* CTA Section */}
      <section className="bg-primary-navy text-white py-20 px-margin-mobile md:px-section-padding text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline text-headline-md text-white mb-6">
            {ctaTitle}
          </h2>
          <p className="font-body text-body-lg opacity-80 mb-8">
            {ctaSubtitle}
          </p>
          <Link
            href={ctaButtonLink}
            className="inline-block px-8 py-4 bg-primary-gold text-white font-label text-label-md uppercase tracking-widest hover:bg-white hover:text-primary-navy transition-colors"
          >
            {ctaButtonLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
