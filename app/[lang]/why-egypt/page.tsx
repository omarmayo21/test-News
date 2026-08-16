import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Mountain, 
  FileText, 
  Globe, 
  Award, 
  Calendar, 
  RefreshCw, 
  Compass 
} from "lucide-react";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PortableText } from "@portabletext/react";
import { getWhyEgyptPageData } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";

export const revalidate = 60;

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

function getBlockIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes("geo") || t.includes("shield")) return Mountain;
  if (t.includes("block") || t.includes("reform") || t.includes("window")) return FileText;
  if (t.includes("internat") || t.includes("global") || t.includes("partic")) return Globe;
  if (t.includes("prod") || t.includes("gold")) return Award;
  
  const fallbacks = [Mountain, FileText, Globe, Award, Compass];
  return fallbacks[index % fallbacks.length];
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

  const kicker = data?.kicker?.[locale] || data?.kicker?.en || "WHY EGYPT";
  const title = data?.title?.[locale] || data?.title?.en || "Proven Production. New Access. Underexplored Ground.";
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en || "";

  const stats = data?.statsGrid || [];
  const contentBlocks = data?.contentBlocks || [];

  const ctaTitle = data?.ctaTitle?.[locale] || data?.ctaTitle?.en || "The Geology Is Established. The Access Is Changing. The Opportunity Is Now.";
  const ctaSubtitle = data?.ctaSubtitle?.[locale] || data?.ctaSubtitle?.en || "Egypt Creates the Opportunity. Nexus Helps Advance It.";
  const ctaButtonLabel = data?.ctaButtonLabel?.[locale] || data?.ctaButtonLabel?.en || "Why Nexus →";
  const ctaButtonLink = data?.ctaButtonLink || `/${locale}/why-nexus`;

  const heroImageUrl = data?.heroImage 
    ? urlForImage(data.heroImage)?.url() 
    : (data?.backgroundImage ? urlForImage(data.backgroundImage)?.url() : null);

  return (
    <div className="w-full bg-background">
      {/* 1. Hero: Cinematic Dark Navy Split Banner */}
      <section className="relative min-h-[580px] lg:min-h-[660px] bg-primary-navy-dark text-white flex items-center overflow-hidden border-b border-primary-gold/20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={title}
              fill
              className="object-cover object-right md:object-center opacity-45 lg:opacity-75 scale-105 transition-transform duration-1000"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary-navy-dark via-primary-navy to-[#050A15]">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px]" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy-dark via-primary-navy-dark/90 lg:via-primary-navy-dark/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy-dark via-transparent to-primary-navy-dark/40" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
                {kicker}
              </span>
              <span className="h-[1px] w-8 bg-primary-gold" />
            </div>

            <h1 className="font-headline text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.12] tracking-tight text-white font-bold whitespace-pre-line">
              {title}
            </h1>

            {subtitle && (
              <div className="font-body text-body-md sm:text-body-lg text-white/85 leading-relaxed space-y-4 max-w-2xl whitespace-pre-wrap">
                {subtitle}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Deep-Dive Split Content Sections from scr pag */}
      {contentBlocks.length > 0 && (
        <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-white border-b border-surface-container-high space-y-24">
          <div className="max-w-[1440px] mx-auto space-y-24">
            {contentBlocks.map((block: any, idx: number) => {
              const isEven = idx % 2 === 0;
              const blockTitle = block.title?.[locale] || block.title?.en || "";
              const IconComponent = getBlockIcon(blockTitle, idx);
              const imgUrl = block.image ? urlForImage(block.image)?.url() : null;

              return (
                <div 
                  key={idx} 
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center`}
                >
                  {/* Text Column */}
                  <div className={`lg:col-span-6 space-y-6 ${!isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-full border-2 border-primary-gold/40 bg-surface-container-low flex items-center justify-center text-primary-gold flex-shrink-0 shadow-sm">
                        <IconComponent className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <div>
                        {block.kicker && (
                          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold block mb-1">
                            {block.kicker?.[locale] || block.kicker?.en}
                          </span>
                        )}
                        <h2 className="font-headline text-2xl sm:text-3xl text-primary-navy font-bold tracking-tight">
                          {blockTitle}
                        </h2>
                      </div>
                    </div>

                    {block.description && (
                      <p className="font-body text-body-md sm:text-body-lg text-on-surface/80 leading-relaxed whitespace-pre-wrap">
                        {block.description?.[locale] || block.description?.en}
                      </p>
                    )}

                    {block.content && (
                      <div className="prose prose-lg prose-p:font-body prose-p:text-body-md prose-p:text-on-surface/80 prose-li:font-body prose-li:text-body-md marker:text-primary-gold max-w-none">
                        <PortableText value={block.content} />
                      </div>
                    )}
                  </div>

                  {/* Image / Diagram Column */}
                  <div className={`lg:col-span-6 ${!isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    {imgUrl ? (
                      <div className="relative h-[380px] sm:h-[440px] w-full border-4 border-white shadow-2xl rounded-sm overflow-hidden bg-surface-container-low">
                        <Image
                          src={imgUrl}
                          alt={blockTitle}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 1023px) 100vw, 50vw"
                        />
                      </div>
                    ) : block.statValue ? (
                      <div className="bg-primary-navy-dark text-white border border-primary-gold/30 rounded-sm p-10 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[340px]">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]" />
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
                            {block.statLabel?.[locale] || block.statLabel?.en || "KEY BENCHMARK"}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center text-primary-gold">
                            <IconComponent className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="relative z-10 my-8">
                          <div className="font-headline text-5xl sm:text-6xl font-bold text-white tracking-tight">
                            {block.statValue}
                          </div>
                          <div className="h-[2px] w-16 bg-primary-gold mt-4" />
                        </div>

                        {block.statDisclaimer && (
                          <div className="relative z-10 font-body text-xs text-white/60 italic leading-relaxed">
                            {block.statDisclaimer?.[locale] || block.statDisclaimer?.en}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-surface-container-low via-surface-container-high/40 to-white border border-surface-container-high rounded-sm p-10 sm:p-12 shadow-card relative overflow-hidden flex flex-col justify-between min-h-[320px]">
                        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#050A15_1px,transparent_1px)] [background-size:24px_24px]" />
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
                            EGYPTIAN MINING SECTOR
                          </span>
                          <div className="w-10 h-10 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center text-primary-gold">
                            <IconComponent className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="relative z-10 my-6 space-y-2">
                          <h3 className="font-headline text-2xl font-bold text-primary-navy">
                            {blockTitle}
                          </h3>
                          <div className="h-[2px] w-12 bg-primary-gold" />
                        </div>

                        <div className="relative z-10 flex items-center justify-between font-label text-xs text-on-surface/60 uppercase tracking-widest pt-4 border-t border-surface-container-high">
                          <span>Nexus Resources</span>
                          <span className="text-primary-gold font-bold">Strategic Context</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Egyptian Sector Benchmark Cards from scr pag */}
      <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-16 bg-surface-container-low/50 border-b border-surface-container-high">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="p-8 bg-white border border-surface-container-high rounded-sm shadow-card flex flex-col items-start space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold">
                <Award className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <div className="font-headline text-3xl sm:text-4xl font-bold text-primary-navy mb-1">
                  500,000 oz
                </div>
                <div className="font-label text-xs uppercase tracking-wider text-primary-gold font-bold mb-1">
                  Sukari Gold
                </div>
                <div className="font-body text-xs text-on-surface/70">
                  Production — 2025
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-8 bg-white border border-surface-container-high rounded-sm shadow-card flex flex-col items-start space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold">
                <Mountain className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <div className="font-headline text-3xl sm:text-4xl font-bold text-primary-navy mb-1">
                  1,389 km²
                </div>
                <div className="font-label text-xs uppercase tracking-wider text-primary-gold font-bold mb-1">
                  AngloGold Ashanti
                </div>
                <div className="font-body text-xs text-on-surface/70">
                  Eastern Desert Exploration Ground
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-8 bg-white border border-surface-container-high rounded-sm shadow-card flex flex-col items-start space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold">
                <Calendar className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <div className="font-headline text-3xl sm:text-4xl font-bold text-primary-navy mb-1">
                  30 Days
                </div>
                <div className="font-label text-xs uppercase tracking-wider text-primary-gold font-bold mb-1">
                  Competitive Window
                </div>
                <div className="font-body text-xs text-on-surface/70">
                  After the First Open Blocks Offer
                </div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-8 bg-white border border-surface-container-high rounded-sm shadow-card flex flex-col items-start space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold">
                <RefreshCw className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <div className="font-headline text-3xl sm:text-4xl font-bold text-primary-navy mb-1">
                  Year-Round
                </div>
                <div className="font-label text-xs uppercase tracking-wider text-primary-gold font-bold mb-1">
                  Access to Opportunities
                </div>
                <div className="font-body text-xs text-on-surface/70">
                  Through the Open Blocks System
                </div>
              </div>
            </div>
          </div>

          <p className="text-center font-body text-xs text-on-surface/60 italic">
            Egyptian sector benchmarks. Not Nexus Resources figures.
          </p>
        </div>
      </section>

      {/* 4. Closing Inset CTA Banner from scr pag */}
      <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="p-10 sm:p-14 bg-primary-navy-dark text-white rounded-sm border border-primary-gold/30 shadow-2xl flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              {ctaTitle}
            </h2>

            {ctaSubtitle && (
              <p className="font-body text-body-lg text-primary-gold font-medium max-w-2xl whitespace-pre-wrap">
                {ctaSubtitle}
              </p>
            )}

            <div className="pt-2">
              <Link
                href={ctaButtonLink}
                className="inline-flex items-center justify-center px-10 py-4 bg-primary-gold hover:bg-primary-gold-light text-primary-navy font-label text-[13px] uppercase tracking-[0.12em] font-bold rounded-sm shadow-gold-glow transition-all duration-300 group"
              >
                <span>{ctaButtonLabel}</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
