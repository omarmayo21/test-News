import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getWhyEgyptPageData } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  return constructMetadata({
    title: "Why Egypt — Strategic Advantages of the Arabian-Nubian Shield",
    description: "Explore the geological potential, infrastructure readiness, and competitive investment framework of Egypt's Eastern Desert mining sector.",
    locale,
    path: "/why-egypt",
  });
}

export default async function WhyEgyptPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);
  const data = await getWhyEgyptPageData();

  const kicker = data?.kicker?.[locale] || data?.kicker?.en || "Strategic Landscape";
  const title = data?.title?.[locale] || data?.title?.en || "Unlocking the Arabian-Nubian Shield";
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en || "The Arabian-Nubian Shield (ANS) represents one of the world's last remaining under-explored mineral frontiers.";

  const stats = data?.statsGrid?.length > 0 ? data.statsGrid : [
    { number: "1.2M", label: { en: "Ounces Discovered" } },
    { number: "40+", label: { en: "Active Concessions" } },
    { number: "$1.5B+", label: { en: "Sector Investment" } },
    { number: "6,000 km", label: { en: "Road Infrastructure" } },
  ];

  const deepDiveTitle = data?.deepDiveTitle?.[locale] || data?.deepDiveTitle?.en || "World-Class Infrastructure & Port Access";
  const deepDiveDesc = data?.deepDiveDesc?.[locale] || data?.deepDiveDesc?.en || "Egypt boasts direct access to the Red Sea ports of Safaga and Hamrawein, connecting extraction sites to international shipping lanes within hours.";
  
  const deepDiveList = data?.deepDiveList?.length > 0 ? data.deepDiveList : [
    { en: "Modernized Red Sea Deepwater Ports" },
    { en: "High-Voltage National Grid Connection" },
    { en: "Streamlined Mining Law Regulatory Framework" },
  ];

  const ctaTitle = data?.ctaTitle?.[locale] || data?.ctaTitle?.en || "Ready to Explore?";
  const ctaButtonLabel = data?.ctaButtonLabel?.[locale] || data?.ctaButtonLabel?.en || "Request Exploration Report";
  const ctaButtonLink = data?.ctaButtonLink || `/${locale}/contact`;

  return (
    <div className="py-section-padding px-margin-mobile md:px-section-padding max-w-container-max mx-auto space-y-20">
      {/* Hero Header */}
      <div className="max-w-3xl">
        <span className="font-label text-label-md text-primary-gold uppercase tracking-widest block mb-4">
          {kicker}
        </span>
        <h1 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-6">
          {title}
        </h1>
        <p className="font-body text-body-lg text-on-surface opacity-85 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Stats Counter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter bg-surface-container-low p-10 border-l-4 border-primary-gold">
        {stats.map((s: any, idx: number) => (
          <div key={idx}>
            <div className="font-headline text-display-lg text-primary-navy mb-1">{s.number}</div>
            <div className="font-label text-label-md text-primary-gold uppercase tracking-wider font-bold">
              {s.label?.[locale] || s.label?.en}
            </div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="font-headline text-headline-lg text-primary-navy">
            {deepDiveTitle}
          </h2>
          <p className="font-body text-body-md opacity-80 leading-relaxed">
            {deepDiveDesc}
          </p>
          <ul className="space-y-3 font-body text-body-md opacity-90">
            {deepDiveList.map((item: any, idx: number) => (
              <li key={idx} className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-primary-gold" />
                <span>{item?.[locale] || item?.en}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative h-[400px] border-4 border-white shadow-xl overflow-hidden bg-surface-container-high">
          {data?.deepDiveImage && urlForImage(data.deepDiveImage) && (
            <Image
              src={urlForImage(data.deepDiveImage)!.url()}
              alt="Deep Dive Image"
              fill
              className="object-cover grayscale-[15%]"
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8 border-t border-surface-container-high">
        {data?.ctaTitle && (
          <h3 className="font-headline text-headline-md text-primary-navy mb-6">
            {ctaTitle}
          </h3>
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
