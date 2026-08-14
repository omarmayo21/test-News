import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PortableText } from "@portabletext/react";
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

  const stats = data?.statsGrid || [];

  const contentBlocks = data?.contentBlocks || [];

  const ctaTitle = data?.ctaTitle?.[locale] || data?.ctaTitle?.en || "Egypt Creates the Opportunity. Nexus Helps Advance It.";
  const ctaSubtitle = data?.ctaSubtitle?.[locale] || data?.ctaSubtitle?.en || "Egypt's geology, evolving mining framework, international\nparticipation, and proven production create the opportunity.\n\nDiscover how Nexus combines local execution, technical expertise, and\nstrategic partnerships to participate in Egypt's next phase of\nmineral development.";
  const ctaButtonLabel = data?.ctaButtonLabel?.[locale] || data?.ctaButtonLabel?.en || "Why Nexus →";
  const ctaButtonLink = data?.ctaButtonLink || `/${locale}/why-nexus`;

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
      {stats.length > 0 && (
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
      )}

      {/* Content Blocks */}
      {contentBlocks.length > 0 && (
        <div className="space-y-32">
          {contentBlocks.map((block: any, idx: number) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                <div className={`space-y-6 ${!isEven ? 'md:order-2' : 'md:order-1'}`}>
                  {block.title && (
                    <h2 className="font-headline text-headline-lg text-primary-navy">
                      {block.title?.[locale] || block.title?.en}
                    </h2>
                  )}
                  {block.description && (
                    <p className="font-body text-body-md opacity-80 leading-relaxed whitespace-pre-wrap">
                      {block.description?.[locale] || block.description?.en}
                    </p>
                  )}
                  {block.content && (
                    <div className="prose prose-lg prose-p:font-body prose-p:text-body-md prose-p:opacity-80 prose-li:font-body prose-li:text-body-md prose-li:opacity-90 marker:text-primary-gold max-w-none">
                      <PortableText value={block.content} />
                    </div>
                  )}
                  {block.statValue && (
                    <div className="mt-8 p-6 bg-surface-container border-l-4 border-primary-gold">
                      <div className="font-headline text-display-md text-primary-navy mb-2">{block.statValue}</div>
                      <div className="font-label text-label-md text-primary-gold uppercase tracking-wider font-bold mb-1">
                        {block.statLabel?.[locale] || block.statLabel?.en}
                      </div>
                      {block.statDisclaimer && (
                        <div className="font-body text-xs text-on-surface opacity-60">
                          {block.statDisclaimer?.[locale] || block.statDisclaimer?.en}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className={`relative h-[400px] border-4 border-white shadow-xl overflow-hidden bg-surface-container-high ${!isEven ? 'md:order-1' : 'md:order-2'}`}>
                  {block.image && urlForImage(block.image) ? (
                    <Image
                      src={urlForImage(block.image)!.url()}
                      alt={block.title?.[locale] || block.title?.en || "Deep Dive Image"}
                      fill
                      className="object-cover grayscale-[15%]"
                      sizes="(max-width: 767px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-highest flex items-center justify-center text-on-surface opacity-30 font-label tracking-widest uppercase">
                      No Image Provided
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CTA */}
      <div className="text-center pt-8 border-t border-surface-container-high bg-surface-container-low p-12">
        <div className="max-w-3xl mx-auto">
          {ctaTitle && (
            <h3 className="font-headline text-headline-md text-primary-navy mb-6">
              {ctaTitle}
            </h3>
          )}
          {ctaSubtitle && (
            <div className="font-body text-body-lg text-on-surface opacity-85 leading-relaxed whitespace-pre-wrap mb-8">
              {ctaSubtitle}
            </div>
          )}
          <Link
            href={ctaButtonLink}
            className="inline-block px-10 py-5 bg-primary-gold text-white font-label text-label-md uppercase tracking-widest hover:bg-primary-navy transition-colors"
          >
            {ctaButtonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
