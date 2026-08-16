import React from "react";
import { Locale } from "@/i18n-config";
import { PortableText } from "@portabletext/react";

interface TwoColumnSectionProps {
  locale: Locale;
  data: {
    theme?: string;
    leftColumn?: {
      title?: { en?: string; fr?: string };
      heading?: { en?: string; fr?: string };
      content?: any[];
      cards?: Array<{
        title?: { en?: string; fr?: string };
        description?: { en?: string; fr?: string };
      }>;
    };
    rightColumn?: {
      title?: { en?: string; fr?: string };
      heading?: { en?: string; fr?: string };
      content?: any[];
      cards?: Array<{
        title?: { en?: string; fr?: string };
        description?: { en?: string; fr?: string };
      }>;
    };
  };
}

export function TwoColumnSection({ locale, data }: TwoColumnSectionProps) {
  const theme = data.theme || "white";
  const bgClass =
    theme === "gray"
      ? "bg-surface-container-low"
      : theme === "navy"
      ? "bg-primary-navy text-white"
      : "bg-white";

  const renderColumn = (col?: TwoColumnSectionProps["data"]["leftColumn"]) => {
    if (!col) return null;
    const title = col.title?.[locale] || col.title?.en;
    const heading = col.heading?.[locale] || col.heading?.en;

    return (
      <div className="space-y-6">
        {title && (
          <span className="font-label text-label-md text-primary-gold uppercase tracking-widest block mb-2">
            {title}
          </span>
        )}
        {heading && (
          <h2
            className={`font-headline text-headline-lg ${
              theme === "navy" ? "text-white" : "text-primary-navy"
            } mb-6`}
          >
            {heading}
          </h2>
        )}
        {col.content && col.content.length > 0 && (
          <div
            className={`prose prose-lg ${
              theme === "navy" ? "prose-invert" : ""
            } max-w-none space-y-4`}
          >
            <PortableText value={col.content} />
          </div>
        )}
        {col.cards && col.cards.length > 0 && (
          <ul className="space-y-6 mt-6">
            {col.cards.map((card, idx) => {
              const cardTitle = card.title?.[locale] || card.title?.en;
              const cardDesc = card.description?.[locale] || card.description?.en;
              return (
                <li key={idx} className="pl-4 border-l-2 border-primary-gold">
                  {cardTitle && (
                    <h3
                      className={`font-headline text-headline-sm ${
                        theme === "navy" ? "text-white" : "text-primary-navy"
                      } mb-1`}
                    >
                      {cardTitle}
                    </h3>
                  )}
                  {cardDesc && (
                    <p
                      className={`font-body text-body-md ${
                        theme === "navy" ? "text-white/80" : "text-on-surface/75"
                      }`}
                    >
                      {cardDesc}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  return (
    <section className={`py-section-padding px-margin-mobile md:px-section-padding border-t border-surface-container-high ${bgClass}`}>
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter lg:gap-24 items-start">
          {renderColumn(data.leftColumn)}
          {renderColumn(data.rightColumn)}
        </div>
      </div>
    </section>
  );
}
