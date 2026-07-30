import React from "react";
import Image from "next/image";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { urlForImage } from "@/lib/sanity/image";

interface WhyEgyptTeaserProps {
  locale: Locale;
  data?: {
    title?: { en?: string; fr?: string };
    subtitle?: { en?: string; fr?: string };
    stats?: Array<{
      number?: string;
      label?: { en?: string; fr?: string };
    }>;
    sideImage?: any;
  };
}

export function WhyEgyptTeaser({ locale, data }: WhyEgyptTeaserProps) {
  const dict = getDictionary(locale);

  const title = data?.title?.[locale] || data?.title?.en || dict.whyEgypt.title;
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en || dict.whyEgypt.subtitle;

  const stat1Number = data?.stats?.[0]?.number || dict.whyEgypt.stat1Number;
  const stat1Label = data?.stats?.[0]?.label?.[locale] || data?.stats?.[0]?.label?.en || dict.whyEgypt.stat1Label;

  const stat2Number = data?.stats?.[1]?.number || dict.whyEgypt.stat2Number;
  const stat2Label = data?.stats?.[1]?.label?.[locale] || data?.stats?.[1]?.label?.en || dict.whyEgypt.stat2Label;

  const sideImageUrl = data?.sideImage ? urlForImage(data.sideImage)?.url() : null;

  return (
    <section className="py-section-padding px-margin-mobile md:px-section-padding bg-surface-container-low border-t border-surface-container-high">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Text Content */}
        <div>
          <h2 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-8">
            {title}
          </h2>
          <p className="font-body text-body-lg text-on-surface mb-12 opacity-90">
            {subtitle}
          </p>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <div className="font-headline font-display-lg text-display-lg text-primary-navy mb-2">
                {stat1Number}
              </div>
              <div className="font-label text-label-md text-primary-gold uppercase tracking-wider font-bold">
                {stat1Label}
              </div>
            </div>
            <div>
              <div className="font-headline font-display-lg text-display-lg text-primary-navy mb-2">
                {stat2Number}
              </div>
              <div className="font-label text-label-md text-primary-gold uppercase tracking-wider font-bold">
                {stat2Label}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Image Block */}
        <div className="relative h-[500px] border-4 border-white shadow-2xl overflow-hidden bg-surface-container-high">
          {sideImageUrl && (
            <Image
              src={sideImageUrl}
              alt="Arabian-Nubian Shield Geology"
              fill
              className="object-cover object-center grayscale-[15%]"
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
    </section>
  );
}
