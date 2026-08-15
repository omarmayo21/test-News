import React from "react";
import Link from "next/link";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface CtaBannerProps {
  locale: Locale;
  data?: {
    title?: { en?: string; fr?: string };
    subtitle?: { en?: string; fr?: string };
    buttonText?: { en?: string; fr?: string };
    buttonLink?: string;
  };
}

export function CtaBanner({ locale, data }: CtaBannerProps) {
  const dict = getDictionary(locale);

  const title = data?.title?.[locale] || data?.title?.en || dict.ctaBanner.title;
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en;
  const buttonText = data?.buttonText?.[locale] || data?.buttonText?.en;
  const buttonLink = data?.buttonLink || `/${locale}/contact`;

  return (
    <section className="py-24 px-margin-mobile md:px-section-padding bg-white text-center border-t border-surface-container-high">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-8">
          {title}
        </h2>
        {subtitle && (
          <div className="font-body text-body-lg text-on-surface opacity-85 leading-relaxed whitespace-pre-wrap mb-10 max-w-2xl text-left md:text-center mx-auto">
            {subtitle}
          </div>
        )}
        {buttonText && (
          <Link
            href={buttonLink}
            className="inline-flex items-center justify-center px-10 py-5 bg-primary-gold text-white font-label-md text-label-md uppercase tracking-widest hover:bg-primary-navy transition-colors duration-300 shadow-ambient"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
