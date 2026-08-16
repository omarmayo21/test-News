import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Compass, 
  Mountain, 
  ShieldCheck, 
  Settings, 
  TrendingUp, 
  Handshake, 
  Leaf, 
  Users 
} from "lucide-react";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAboutPageData } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";

export const revalidate = 60;

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

function getValueIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes("integ")) return ShieldCheck;
  if (t.includes("tech") || t.includes("excel")) return Settings;
  if (t.includes("exec")) return TrendingUp;
  if (t.includes("part")) return Handshake;
  if (t.includes("resp") || t.includes("sustain")) return Leaf;
  
  const fallbacks = [ShieldCheck, Settings, TrendingUp, Handshake, Leaf];
  return fallbacks[index % fallbacks.length];
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
  const overviewTitle = data?.overviewTitle?.[locale] || data?.overviewTitle?.en || "About Nexus";
  const overviewHeadline = data?.overviewHeadline?.[locale] || data?.overviewHeadline?.en || "A Mining Company Built to Turn Potential into Progress.";
  const overviewDesc = data?.overviewDesc?.[locale] || data?.overviewDesc?.en || "";
  const visionTitle = data?.visionTitle?.[locale] || data?.visionTitle?.en || "OUR VISION";
  const visionDesc = data?.visionDesc?.[locale] || data?.visionDesc?.en || "To Build a Leading Egyptian Mining and Resources Company with International Reach.";
  const missionTitle = data?.missionTitle?.[locale] || data?.missionTitle?.en || "OUR MISSION";
  const missionHeadline = data?.missionHeadline?.[locale] || data?.missionHeadline?.en || "To Turn Mineral Potential into Lasting Value.";
  const missionDesc = data?.missionDesc?.[locale] || data?.missionDesc?.en || "By identifying, advancing, and developing viable mineral opportunities.";
  const principlesTitle = data?.principlesTitle?.[locale] || data?.principlesTitle?.en || "OUR VALUES";
  
  const ctaTitle = data?.ctaTitle?.[locale] || data?.ctaTitle?.en || "Meet the People Behind Nexus";
  const ctaSubtitle = data?.ctaSubtitle?.[locale] || data?.ctaSubtitle?.en || "Leadership, technical expertise, and specialist experience supporting Nexus Resources.";
  const ctaButtonLabel = data?.ctaButtonLabel?.[locale] || data?.ctaButtonLabel?.en || "EXPLORE CORPORATE →";
  const ctaButtonLink = data?.ctaButtonLink || `/${locale}/corporate`;
  const heroImageUrl = data?.heroImage ? urlForImage(data.heroImage)?.url() : "/logo/mining-hero.jpg";

  const principles = data?.principles || [
    { title: { en: "Integrity" }, description: { en: "We operate with transparency, accountability, and honesty in our relationships with partners, investors, authorities, and stakeholders." } },
    { title: { en: "Technical Excellence" }, description: { en: "We rely on sound engineering, geological understanding, data, and disciplined technical analysis to support informed decisions." } },
    { title: { en: "Execution" }, description: { en: "We believe expertise creates value when it is translated into practical action, measurable progress, and effective project delivery." } },
    { title: { en: "Partnership" }, description: { en: "We build long term around trust, aligned interests, shared objectives, and common value." } },
    { title: { en: "Responsible Development" }, description: { en: "We pursue mineral development with consideration for people, communities, the environment, and the long-term value of Egypt's mineral resources." } }
  ];

  return (
    <div className="w-full bg-background">
      {/* 1. Hero: Cinematic Dark Navy Split Banner */}
      <section className="relative min-h-[580px] lg:min-h-[660px] bg-primary-navy-dark text-white flex items-center overflow-hidden border-b border-primary-gold/20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={heroImageUrl!}
            alt={title}
            fill
            className="object-cover object-right md:object-center opacity-45 lg:opacity-75 scale-105 transition-transform duration-1000"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy-dark via-primary-navy-dark/90 lg:via-primary-navy-dark/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy-dark via-transparent to-primary-navy-dark/40" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
                {overviewTitle}
              </span>
              <span className="h-[1px] w-8 bg-primary-gold" />
            </div>

            <h1 className="font-headline text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.12] tracking-tight text-white font-bold">
              A Mining Company <br />
              <span className="text-primary-gold">Built to Turn Potential into Progress.</span>
            </h1>

            {overviewDesc ? (
              <div className="font-body text-body-md sm:text-body-lg text-white/85 leading-relaxed space-y-4 max-w-2xl whitespace-pre-wrap">
                {overviewDesc}
              </div>
            ) : subtitle ? (
              <p className="font-body text-body-md sm:text-body-lg text-white/85 leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission: 2-Column Cards side by side from scr pag */}
      <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-16 bg-white border-b border-surface-container-high">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision Card */}
          <div className="p-8 sm:p-12 bg-surface-container-low/60 border border-surface-container-high rounded-sm shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary-navy border-2 border-primary-gold flex items-center justify-center text-primary-gold mb-2 shadow-md">
              <Compass className="w-7 h-7 stroke-[1.75]" />
            </div>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
              {visionTitle}
            </span>
            <h2 className="font-headline text-2xl sm:text-[28px] text-primary-navy font-bold leading-snug">
              To Build a Leading Egyptian Mining and Resources Company with International Reach.
            </h2>
            {visionDesc && !visionDesc.includes("To Build a Leading") && (
              <p className="font-body text-body-md text-on-surface/80 leading-relaxed max-w-lg">
                {visionDesc}
              </p>
            )}
          </div>

          {/* Mission Card */}
          <div className="p-8 sm:p-12 bg-surface-container-low/60 border border-surface-container-high rounded-sm shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary-navy border-2 border-primary-gold flex items-center justify-center text-primary-gold mb-2 shadow-md">
              <Mountain className="w-7 h-7 stroke-[1.75]" />
            </div>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
              {missionTitle}
            </span>
            <h2 className="font-headline text-2xl sm:text-[28px] text-primary-navy font-bold leading-snug">
              {missionHeadline}
            </h2>
            {missionDesc && (
              <p className="font-body text-body-md text-on-surface/80 leading-relaxed max-w-lg">
                {missionDesc}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 3. Our Values: 5 Cards Grid */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-surface-container-low/40 border-b border-surface-container-high">
        <div className="max-w-[1440px] mx-auto space-y-16">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-3">
              <span className="h-[1px] w-6 bg-primary-gold" />
              <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
                {principlesTitle}
              </span>
              <span className="h-[1px] w-6 bg-primary-gold" />
            </div>
            <h2 className="font-headline text-[32px] sm:text-[40px] font-bold text-primary-navy tracking-tight">
              Principles Driving Responsible Mining
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {principles.map((p: any, idx: number) => {
              const pTitle = p.title?.[locale] || p.title?.en || `Value ${idx + 1}`;
              const pDesc = p.description?.[locale] || p.description?.en || "";
              const IconComponent = getValueIcon(pTitle, idx);

              return (
                <div
                  key={idx}
                  className="p-8 bg-white border border-surface-container-high hover:border-primary-gold/40 rounded-sm shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-primary-gold/40 bg-surface-container-low group-hover:bg-primary-gold/10 group-hover:border-primary-gold flex items-center justify-center text-primary-gold transition-all duration-300 group-hover:scale-105 shadow-sm">
                    <IconComponent className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="font-label text-[14px] font-bold text-primary-navy uppercase tracking-[0.1em] group-hover:text-primary-gold transition-colors">
                    {pTitle}
                  </h3>
                  <p className="font-body text-body-md text-on-surface/75 leading-relaxed">
                    {pDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Inset Corporate CTA Card from scr pag */}
      <section className="py-16 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="p-8 sm:p-12 bg-primary-navy-dark text-white rounded-sm border border-primary-gold/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-6 text-center lg:text-left">
              <div className="hidden sm:flex w-16 h-16 rounded-full border-2 border-primary-gold/50 bg-white/5 items-center justify-center text-primary-gold flex-shrink-0">
                <Users className="w-8 h-8 stroke-[1.75]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {ctaTitle}
                </h3>
                <p className="font-body text-body-md text-white/80 max-w-xl">
                  {ctaSubtitle}
                </p>
              </div>
            </div>

            <Link
              href={ctaButtonLink}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-gold hover:bg-primary-gold-light text-primary-navy font-label text-[13px] uppercase tracking-[0.12em] font-bold rounded-sm shadow-gold-glow transition-all duration-300 group flex-shrink-0"
            >
              <span>{ctaButtonLabel}</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
