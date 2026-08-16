import React from "react";
import { Locale } from "@/i18n-config";
import { Hero } from "@/components/sections/hero";
import { CapabilitiesGrid } from "@/components/sections/capabilities-grid";
import { WhyEgyptTeaser } from "@/components/sections/why-egypt-teaser";
import { CtaBanner } from "@/components/sections/cta-banner";
import { TwoColumnSection } from "@/components/sections/two-column-section";
import { SplitSection } from "@/components/sections/split-section";

interface PageBuilderRendererProps {
  locale: Locale;
  blocks?: any[];
}

export function PageBuilderRenderer({ locale, blocks }: PageBuilderRendererProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block: any, idx: number) => {
        const key = block._key || `pb-block-${idx}`;

        switch (block._type) {
          case "heroBlock":
            return <Hero key={key} locale={locale} data={block} />;
          case "capabilitiesBlock":
            return <CapabilitiesGrid key={key} locale={locale} data={block} />;
          case "statsBlock":
            return <WhyEgyptTeaser key={key} locale={locale} data={block} />;
          case "ctaBlock":
            return <CtaBanner key={key} locale={locale} data={block} />;
          case "twoColumnBlock":
            return <TwoColumnSection key={key} locale={locale} data={block} />;
          case "splitBlock":
            return <SplitSection key={key} locale={locale} data={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
