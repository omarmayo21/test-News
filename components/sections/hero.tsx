import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { urlForImage } from "@/lib/sanity/image";

interface HeroProps {
  locale: Locale;
  data?: {
    headline?: { en?: string; fr?: string };
    subtitle?: { en?: string; fr?: string };
    ctaLabel?: { en?: string; fr?: string };
    ctaLink?: string;
    secondaryCtaLabel?: { en?: string; fr?: string };
    secondaryCtaLink?: string;
    backgroundImage?: any;
  };
}

export function Hero({ locale, data }: HeroProps) {
  const dict = getDictionary(locale);

  const headline = data?.headline?.[locale] || data?.headline?.en || dict.hero.title;
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en || dict.hero.subtitle;
  const ctaText = data?.ctaLabel?.[locale] || data?.ctaLabel?.en || dict.hero.ctaPrimary;
  const ctaHref = data?.ctaLink || `/${locale}/why-nexus`;
  const secondaryCtaText = data?.secondaryCtaLabel?.[locale] || data?.secondaryCtaLabel?.en || "Partner With Us →";
  const secondaryCtaHref = data?.secondaryCtaLink || `/${locale}/contact`;
  const bgImageUrl = data?.backgroundImage ? urlForImage(data.backgroundImage)?.url() : null;

  // Parse headline into primary and gold accent phrases
  const headlineParts = headline.includes(".") 
    ? headline.split(/(?<=\.)\s+/) 
    : headline.includes("\n") 
    ? headline.split("\n") 
    : [headline];

  const firstPart = headlineParts[0];
  const secondPart = headlineParts.slice(1).join(" ");

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] bg-primary-navy-dark text-white flex items-center overflow-hidden border-b border-primary-gold/20">
      {/* Background Image with Cinematic Gradient Masking */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {bgImageUrl && (
          <div className="relative w-full h-full">
            <Image
              src={bgImageUrl}
              alt={headline}
              fill
              className="object-cover object-right md:object-center opacity-45 lg:opacity-75 scale-105 transition-transform duration-1000"
              priority
              fetchPriority="high"
              sizes="100vw"
            />
            {/* Multi-directional Luxury Vignette & Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-navy-dark via-primary-navy-dark/85 lg:via-primary-navy-dark/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-navy-dark via-transparent to-primary-navy-dark/40" />
            <div className="absolute inset-0 bg-primary-navy-dark/30" />
          </div>
        )}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
        <div className="max-w-2xl lg:max-w-3xl space-y-8 animate-fade-in-up">
          {/* Main Display Headline */}
          <h1 className="font-headline text-[38px] sm:text-[48px] lg:text-[60px] leading-[1.12] tracking-tight text-white font-bold">
            <span>{firstPart}</span>{" "}
            {secondPart && (
              <span className="text-primary-gold block sm:inline">
                {secondPart}
              </span>
            )}
          </h1>

          {/* Subtitle / Descriptive Text */}
          {subtitle && (
            <div className="font-body text-body-md sm:text-body-lg text-white/85 leading-relaxed space-y-4 max-w-2xl whitespace-pre-wrap">
              {subtitle}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-gold hover:bg-primary-gold-light text-primary-navy font-label text-[13px] uppercase tracking-[0.12em] font-bold rounded-sm shadow-gold-glow transition-all duration-300 group"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href={secondaryCtaHref}
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 hover:border-primary-gold text-white hover:text-primary-gold font-label text-[13px] uppercase tracking-[0.12em] font-medium rounded-sm transition-all duration-300 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
            >
              <span>{secondaryCtaText}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle Gold Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-gold/40 to-transparent" />
    </section>
  );
}
