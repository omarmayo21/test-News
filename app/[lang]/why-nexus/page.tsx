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

      {/* Content Blocks */}
      {contentBlocks.length > 0 && (
        <div className="space-y-32">
          {contentBlocks.map((block: any, idx: number) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`grid grid-cols-1 ${block.image ? 'md:grid-cols-2 gap-16' : ''} items-center ${block.image && !isEven ? 'md:flex-row-reverse' : ''}`}>
                <div className={`space-y-6 ${block.image && !isEven ? 'md:order-2' : 'md:order-1'}`}>
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
                </div>
                {block.image && urlForImage(block.image) && (
                  <div className={`relative h-[400px] border-4 border-white shadow-xl overflow-hidden bg-surface-container-high ${!isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <Image
                      src={urlForImage(block.image)!.url()}
                      alt={block.title?.[locale] || block.title?.en || "Content Image"}
                      fill
                      className="object-cover grayscale-[15%]"
                      sizes="(max-width: 767px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

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
