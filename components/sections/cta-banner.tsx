import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mountain, ShieldCheck, Users, Globe } from "lucide-react";
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

  const rawTitle = data?.title?.[locale] || data?.title?.en || dict.ctaBanner.title;
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en;
  const buttonText = data?.buttonText?.[locale] || data?.buttonText?.en;
  const buttonLink = data?.buttonLink || `/${locale}/contact`;

  const isWhyEgyptBanner = rawTitle.toUpperCase().includes("WHY NOW") || rawTitle.toUpperCase().includes("WHY EGYPT");
  const isBuiltForEgyptBanner = rawTitle.toUpperCase().includes("BUILT FOR EGYPT");
  const isDiscoverNexusBanner = rawTitle.toUpperCase().includes("DISCOVER NEXUS");

  // Variant 1: Dark Cinematic Split Banner (Why Egypt / Why Now)
  if (isWhyEgyptBanner) {
    return (
      <section className="relative bg-primary-navy-dark text-white overflow-hidden border-y border-primary-gold/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px] items-stretch">
          {/* Text Content Column */}
          <div className="lg:col-span-6 px-8 sm:px-12 lg:px-16 py-16 lg:py-20 flex flex-col justify-center space-y-6 z-10">
            <div className="inline-flex items-center space-x-2 text-primary-gold font-label text-xs uppercase tracking-[0.2em] font-bold">
              <span>WHY EGYPT</span>
            </div>

            <h2 className="font-headline text-[32px] sm:text-[42px] leading-[1.15] font-bold text-white tracking-tight">
              A New Era in{" "}
              <span className="text-primary-gold">Egyptian Mining</span>
            </h2>

            {subtitle && (
              <div className="font-body text-body-md sm:text-body-lg text-white/85 leading-relaxed space-y-3 whitespace-pre-wrap">
                {subtitle}
              </div>
            )}

            {buttonText && (
              <div className="pt-2">
                <Link
                  href={buttonLink}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-gold hover:bg-primary-gold-light text-primary-navy font-label text-[13px] uppercase tracking-[0.12em] font-bold rounded-sm shadow-gold-glow transition-all duration-300 group"
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>

          {/* Cinematic Desert Landscape Image Column */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full">
            <Image
              src="/logo/desert-landscape.jpg"
              alt="Egyptian Mining Opportunity"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-navy-dark via-primary-navy-dark/30 to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-navy-dark via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </section>
    );
  }

  // Variant 2: Discover Nexus / Opportunity Banner with Benchmark Icons
  if (isDiscoverNexusBanner) {
    return (
      <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-16 bg-surface-container-low/60 border-b border-surface-container-high">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Dark Navy Button */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-headline text-[32px] sm:text-[40px] text-primary-navy font-bold leading-[1.15] tracking-tight">
              From Opportunity <br />
              to <span className="text-primary-gold">Progress.</span>
            </h2>

            {subtitle && (
              <p className="font-body text-body-md sm:text-body-lg text-on-surface/80 leading-relaxed whitespace-pre-wrap">
                {subtitle}
              </p>
            )}

            {buttonText && (
              <div className="pt-2">
                <Link
                  href={buttonLink}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-navy hover:bg-primary-navy-light text-white font-label text-[13px] uppercase tracking-[0.12em] font-bold rounded-sm transition-all duration-300 group shadow-md"
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 text-primary-gold" />
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: 4 Minimalist Metric Pillars from scr pag */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white border border-surface-container-high rounded-sm shadow-card flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold">
                <Mountain className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="font-headline text-2xl sm:text-3xl font-bold text-primary-navy">6,000+</div>
              <div className="font-label text-xs text-on-surface/70 uppercase tracking-wider font-semibold">Years of Mining Heritage</div>
            </div>

            <div className="p-6 bg-white border border-surface-container-high rounded-sm shadow-card flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold">
                <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="font-headline text-2xl sm:text-3xl font-bold text-primary-navy">20+</div>
              <div className="font-label text-xs text-on-surface/70 uppercase tracking-wider font-semibold">Experienced Mining Professionals</div>
            </div>

            <div className="p-6 bg-white border border-surface-container-high rounded-sm shadow-card flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold">
                <Users className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="font-headline text-2xl sm:text-3xl font-bold text-primary-navy">End-to-End</div>
              <div className="font-label text-xs text-on-surface/70 uppercase tracking-wider font-semibold">From Evaluation to Production</div>
            </div>

            <div className="p-6 bg-white border border-surface-container-high rounded-sm shadow-card flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold">
                <Globe className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="font-headline text-2xl sm:text-3xl font-bold text-primary-navy">Global</div>
              <div className="font-label text-xs text-on-surface/70 uppercase tracking-wider font-semibold">Partnerships & Ambition</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Variant 3: Default Clean Editorial Banner (e.g. Built for Egypt)
  return (
    <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-16 bg-white text-center border-b border-surface-container-high">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
        <div className="inline-flex items-center space-x-3">
          <span className="h-[1px] w-6 bg-primary-gold" />
          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
            {rawTitle}
          </span>
          <span className="h-[1px] w-6 bg-primary-gold" />
        </div>

        <h2 className="font-headline text-[32px] sm:text-[42px] font-bold text-primary-navy tracking-tight leading-[1.2]">
          Local Knowledge. International Perspective.
        </h2>

        {subtitle && (
          <div className="font-body text-body-md sm:text-body-lg text-on-surface/80 leading-relaxed whitespace-pre-wrap max-w-2xl mx-auto">
            {subtitle}
          </div>
        )}

        {buttonText && (
          <div className="pt-4">
            <Link
              href={buttonLink}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-gold hover:bg-primary-gold-light text-primary-navy font-label text-[13px] uppercase tracking-[0.12em] font-bold rounded-sm shadow-gold-glow transition-all duration-300 group"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
