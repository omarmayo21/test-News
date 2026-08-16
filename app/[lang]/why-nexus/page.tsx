import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Search, 
  Compass, 
  BarChart3, 
  Handshake, 
  Hammer, 
  Cog, 
  Award, 
  MapPin, 
  Mountain, 
  Users, 
  Target, 
  Truck 
} from "lucide-react";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PortableText } from "@portabletext/react";
import { getWhyNexusPageData } from "@/lib/sanity/queries";
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
    title: "Why Nexus - Our Approach to Egyptian Mining",
    description: "Discover how Nexus combines local execution, technical expertise, and strategic partnerships to advance mineral opportunities.",
    locale,
    path: "/why-nexus",
  });
}

const lifecycleSteps = [
  { name: "EVALUATE", icon: Search },
  { name: "EXPLORE", icon: Compass },
  { name: "DEVELOP", icon: BarChart3 },
  { name: "PARTNER", icon: Handshake },
  { name: "BUILD", icon: Hammer },
  { name: "OPERATE", icon: Cog },
  { name: "PRODUCE", icon: Award },
];

export default async function WhyNexusPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);
  const data = await getWhyNexusPageData();

  const title = data?.title?.[locale] || data?.title?.en || "We Build Mining Projects.\nNot Introductions.";
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en || "";
  
  const contentBlocks = data?.contentBlocks || [];

  const ctaTitle = data?.ctaTitle?.[locale] || data?.ctaTitle?.en || "Egypt Has the Potential.\nNexus Is Built to Advance It.";
  const ctaSubtitle = data?.ctaSubtitle?.[locale] || data?.ctaSubtitle?.en || "Whether you are a mining company evaluating Egypt, an investor seeking project exposure, or a license holder looking to advance an asset, Nexus is ready to explore what we can build together.";
  const ctaButtonLabel = data?.ctaButtonLabel?.[locale] || data?.ctaButtonLabel?.en || "PARTNER WITH NEXUS →";
  const ctaButtonLink = data?.ctaButtonLink || `/${locale}/contact`;

  const heroImageUrl = data?.heroImage ? urlForImage(data.heroImage)?.url() : null;

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
                WHY NEXUS
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

      {/* 2. Lifecycle 7-Stage Progression Bar from scr pag */}
      <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-16 bg-white border-b border-surface-container-high">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="h-6 w-1.5 bg-primary-gold rounded-full" />
              <h2 className="font-label text-sm uppercase tracking-[0.15em] text-primary-navy font-bold">
                HOW WE THINK ABOUT A PROJECT
              </h2>
            </div>
            <p className="font-headline text-2xl sm:text-3xl text-primary-gold font-semibold">
              From Opportunity to Production.
            </p>
            <p className="font-body text-body-md text-on-surface/80 max-w-3xl leading-relaxed">
              Every opportunity Nexus evaluates is considered across the full development lifecycle — not only its exploration potential.
            </p>
          </div>

          {/* 7 Circular Badges Progression */}
          <div className="p-8 bg-surface-container-low/50 border border-surface-container-high rounded-sm shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between min-w-[760px] gap-2">
              {lifecycleSteps.map((step, idx) => {
                const IconComponent = step.icon;
                const isLast = idx === lifecycleSteps.length - 1;

                return (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center space-y-3 flex-1 group">
                      <div className="w-16 h-16 rounded-full bg-primary-navy border-2 border-primary-gold flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-primary-navy transition-all duration-300 shadow-md group-hover:scale-105">
                        <IconComponent className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <span className="font-label text-xs uppercase tracking-wider font-bold text-primary-navy group-hover:text-primary-gold transition-colors">
                        {step.name}
                      </span>
                    </div>

                    {!isLast && (
                      <div className="text-primary-gold/50 font-bold text-lg px-1 select-none">
                        →
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. What Sets Nexus Apart: 4-Pillar Differentiators from scr pag */}
      <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-16 bg-surface-container-low/40 border-b border-surface-container-high">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="flex items-center space-x-3">
            <span className="h-6 w-1.5 bg-primary-gold rounded-full" />
            <h2 className="font-label text-sm uppercase tracking-[0.15em] text-primary-navy font-bold">
              WHAT SETS NEXUS APART
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 bg-white border border-surface-container-high rounded-sm shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-start space-y-4 group">
              <div className="w-14 h-14 rounded-full border-2 border-primary-gold/40 bg-surface-container-low group-hover:bg-primary-gold/10 group-hover:border-primary-gold flex items-center justify-center text-primary-gold transition-all duration-300 shadow-sm">
                <MapPin className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-headline text-lg sm:text-xl font-bold text-primary-navy leading-snug">
                Local Execution. <br />
                <span className="text-on-surface/70 font-medium text-base">Not Just Local Presence.</span>
              </h3>
              <p className="font-body text-xs sm:text-[13px] text-on-surface/75 leading-relaxed flex-1">
                On-the-ground understanding of Egypt&apos;s mining environment, regulatory landscape, stakeholders, contractors, supply chains, and operating realities.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 bg-white border border-surface-container-high rounded-sm shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-start space-y-4 group">
              <div className="w-14 h-14 rounded-full border-2 border-primary-gold/40 bg-surface-container-low group-hover:bg-primary-gold/10 group-hover:border-primary-gold flex items-center justify-center text-primary-gold transition-all duration-300 shadow-sm">
                <Mountain className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-headline text-lg sm:text-xl font-bold text-primary-navy leading-snug">
                Technical Judgment.
              </h3>
              <p className="font-body text-xs sm:text-[13px] text-on-surface/75 leading-relaxed flex-1">
                Mining opportunities are evaluated through geology, engineering, processing, development potential, and operational practicality — not relationships alone.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 bg-white border border-surface-container-high rounded-sm shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-start space-y-4 group">
              <div className="w-14 h-14 rounded-full border-2 border-primary-gold/40 bg-surface-container-low group-hover:bg-primary-gold/10 group-hover:border-primary-gold flex items-center justify-center text-primary-gold transition-all duration-300 shadow-sm">
                <Users className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-headline text-lg sm:text-xl font-bold text-primary-navy leading-snug">
                Partnerships Built <br />
                <span className="text-on-surface/70 font-medium text-base">Around the Project.</span>
              </h3>
              <p className="font-body text-xs sm:text-[13px] text-on-surface/75 leading-relaxed flex-1">
                We work with mining companies, investors, license holders, project owners, and technical partners through structures built around project economics, aligned interests, and long-term value.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-8 bg-white border border-surface-container-high rounded-sm shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-start space-y-4 group">
              <div className="w-14 h-14 rounded-full border-2 border-primary-gold/40 bg-surface-container-low group-hover:bg-primary-gold/10 group-hover:border-primary-gold flex items-center justify-center text-primary-gold transition-all duration-300 shadow-sm">
                <Target className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-headline text-lg sm:text-xl font-bold text-primary-navy leading-snug">
                A Production Mindset <br />
                <span className="text-on-surface/70 font-medium text-base">from the Start.</span>
              </h3>
              <p className="font-body text-xs sm:text-[13px] text-on-surface/75 leading-relaxed flex-1">
                We look beyond whether an opportunity can be explored. We ask whether it can be developed, financed, built, operated, and ultimately brought into production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strategic Approach Content Blocks from Sanity */}
      {contentBlocks.length > 0 && (
        <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-16 bg-white border-b border-surface-container-high space-y-20">
          <div className="max-w-[1440px] mx-auto space-y-20">
            {contentBlocks.map((block: any, idx: number) => {
              const isEven = idx % 2 === 0;
              const imgUrl = block.image ? urlForImage(block.image)?.url() : null;

              return (
                <div 
                  key={idx} 
                  className={`grid grid-cols-1 ${imgUrl ? 'lg:grid-cols-12 gap-12 lg:gap-16 items-center' : 'max-w-4xl'}`}
                >
                  <div className={`space-y-6 ${imgUrl ? (isEven ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-2') : ''}`}>
                    {block.kicker && (
                      <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold block">
                        {block.kicker?.[locale] || block.kicker?.en}
                      </span>
                    )}

                    {block.title && (
                      <h2 className="font-headline text-2xl sm:text-3xl text-primary-navy font-bold tracking-tight">
                        {block.title?.[locale] || block.title?.en}
                      </h2>
                    )}

                    {block.description && (
                      <div className="font-body text-body-md sm:text-body-lg text-on-surface/80 leading-relaxed whitespace-pre-wrap space-y-3">
                        {block.description?.[locale] || block.description?.en}
                      </div>
                    )}

                    {block.content && (
                      <div className="prose prose-lg prose-p:font-body prose-p:text-body-md prose-p:text-on-surface/80 prose-li:font-body prose-li:text-body-md marker:text-primary-gold max-w-none">
                        <PortableText value={block.content} />
                      </div>
                    )}
                  </div>

                  {imgUrl && (
                    <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
                      <div className="relative h-[340px] sm:h-[400px] w-full border-4 border-white shadow-2xl rounded-sm overflow-hidden bg-surface-container-high">
                        <Image
                          src={imgUrl}
                          alt={block.title?.[locale] || block.title?.en || "Approach Media"}
                          fill
                          className="object-cover grayscale-[15%]"
                          sizes="(max-width: 1023px) 100vw, 42vw"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. "THE MEASURE IS PROGRESS" Inset Banner from scr pag */}
      <section className="py-12 px-6 sm:px-10 lg:px-16 bg-surface-container-low/50">
        <div className="max-w-[1440px] mx-auto">
          <div className="p-8 sm:p-12 bg-primary-navy-dark text-white rounded-sm border border-primary-gold/30 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-full border-2 border-primary-gold/50 bg-white/5 flex items-center justify-center text-primary-gold flex-shrink-0 shadow-md">
              <Truck className="w-8 h-8 stroke-[1.75]" />
            </div>
            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
                THE MEASURE IS PROGRESS
              </div>
              <p className="font-body text-sm sm:text-base text-white/80">
                The measure of our work is not simply a report, transaction, or new relationship.
              </p>
              <p className="font-headline text-lg sm:text-xl font-bold text-primary-gold">
                It is a project that moves toward production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Closing CTA Block from scr pag */}
      <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-16 bg-white border-t border-surface-container-high">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary-navy tracking-tight leading-snug whitespace-pre-line">
              {ctaTitle}
            </h2>
            {ctaSubtitle && (
              <p className="font-body text-body-md sm:text-body-lg text-on-surface/80 leading-relaxed">
                {ctaSubtitle}
              </p>
            )}
          </div>

          <Link
            href={ctaButtonLink}
            className="inline-flex items-center justify-center px-10 py-5 bg-primary-navy hover:bg-primary-navy-light text-white font-label text-[13px] uppercase tracking-[0.12em] font-bold rounded-sm shadow-elevated transition-all duration-300 group flex-shrink-0"
          >
            <span>{ctaButtonLabel}</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 text-primary-gold" />
          </Link>
        </div>
      </section>
    </div>
  );
}
