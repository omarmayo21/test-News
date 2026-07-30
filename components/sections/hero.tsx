import React from "react";
import Link from "next/link";
import Image from "next/image";
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
    backgroundImage?: any;
  };
}

export function Hero({ locale, data }: HeroProps) {
  const dict = getDictionary(locale);

  const headline = data?.headline?.[locale] || data?.headline?.en || dict.hero.title;
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en || dict.hero.subtitle;
  const ctaText = data?.ctaLabel?.[locale] || data?.ctaLabel?.en || dict.hero.ctaPrimary;
  const ctaHref = data?.ctaLink || `/${locale}/services`;
  const bgImageUrl = data?.backgroundImage ? urlForImage(data.backgroundImage)?.url() : null;

  return (
    <section className="relative h-[819px] min-h-[600px] flex items-center px-margin-mobile md:px-section-padding overflow-hidden">
      {/* Background Image & Editorial Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        {bgImageUrl && (
          <Image
            src={bgImageUrl}
            alt="Industrial landscape"
            fill
            className="object-cover object-center grayscale-[10%]"
            priority
            fetchPriority="high"
            sizes="100vw"
          />
        )}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-2xl">
        <h1 className="font-headline font-display-lg text-display-lg text-primary-navy mb-8 leading-[1.1]">
          {headline}
        </h1>

        <p className="font-body text-body-lg text-on-surface mb-12 max-w-xl opacity-90">
          {subtitle}
        </p>

        <div>
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center px-10 py-5 bg-primary-gold text-white font-label-md text-label-md uppercase tracking-widest hover:bg-primary-navy transition-colors duration-300 shadow-ambient"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
