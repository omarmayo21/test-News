import React from "react";
import Image from "next/image";
import { Locale } from "@/i18n-config";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity/image";

interface SplitSectionProps {
  locale: Locale;
  data: {
    title?: { en?: string; fr?: string };
    subtitle?: { en?: string; fr?: string };
    layout?: "textLeft" | "textRight";
    image?: any;
    content?: any[];
    statValue?: string;
    statLabel?: { en?: string; fr?: string };
    statDisclaimer?: { en?: string; fr?: string };
  };
}

export function SplitSection({ locale, data }: SplitSectionProps) {
  const isTextRight = data.layout === "textRight";
  const title = data.title?.[locale] || data.title?.en;
  const subtitle = data.subtitle?.[locale] || data.subtitle?.en;
  const statLabel = data.statLabel?.[locale] || data.statLabel?.en;
  const statDisclaimer = data.statDisclaimer?.[locale] || data.statDisclaimer?.en;
  const imageUrl = data.image ? urlForImage(data.image)?.url() : null;

  return (
    <section className="py-16 px-margin-mobile md:px-section-padding max-w-container-max mx-auto">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${
          isTextRight ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className={`space-y-6 ${isTextRight ? "md:order-2" : "md:order-1"}`}>
          {title && (
            <h2 className="font-headline text-headline-lg text-primary-navy">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="font-body text-body-md opacity-80 leading-relaxed whitespace-pre-wrap">
              {subtitle}
            </p>
          )}
          {data.content && data.content.length > 0 && (
            <div className="prose prose-lg prose-p:font-body prose-p:text-body-md prose-p:opacity-80 max-w-none">
              <PortableText value={data.content} />
            </div>
          )}
          {data.statValue && (
            <div className="mt-8 p-6 bg-surface-container border-l-4 border-primary-gold">
              <div className="font-headline text-display-md text-primary-navy mb-2">
                {data.statValue}
              </div>
              {statLabel && (
                <div className="font-label text-label-md text-primary-gold uppercase tracking-wider font-bold mb-1">
                  {statLabel}
                </div>
              )}
              {statDisclaimer && (
                <div className="font-body text-xs text-on-surface opacity-60">
                  {statDisclaimer}
                </div>
              )}
            </div>
          )}
        </div>

        {imageUrl ? (
          <div
            className={`relative h-[400px] border-4 border-white shadow-xl overflow-hidden bg-surface-container-high ${
              isTextRight ? "md:order-1" : "md:order-2"
            }`}
          >
            <Image
              src={imageUrl}
              alt={title || "Section Media"}
              fill
              className="object-cover grayscale-[15%]"
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
