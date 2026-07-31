import React from "react";
import { Compass, Cpu, Layers } from "lucide-react";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface CapabilitiesGridProps {
  locale: Locale;
  data?: {
    sectionTitle?: { en?: string; fr?: string };
    sectionDescription?: { en?: string; fr?: string };
    cards?: Array<{
      icon?: string;
      title?: { en?: string; fr?: string };
      description?: { en?: string; fr?: string };
    }>;
  };
}

export function CapabilitiesGrid({ locale, data }: CapabilitiesGridProps) {
  const dict = getDictionary(locale);

  const title = data?.sectionTitle?.[locale] || data?.sectionTitle?.en || dict.capabilities.title;
  const description = data?.sectionDescription?.[locale] || data?.sectionDescription?.en || dict.capabilities.subtitle;

  const cards = data?.cards && data.cards.length > 0
    ? data.cards.map((c, idx) => ({
        icon: c.icon || "architecture",
        title: c.title?.[locale] || c.title?.en || `Capability ${idx + 1}`,
        description: c.description?.[locale] || c.description?.en || "",
        lucideIcon: idx === 0 ? Compass : idx === 1 ? Layers : Cpu,
      }))
    : [];

  return (
    <section className="py-section-padding px-margin-mobile md:px-section-padding bg-white">
      <div className="max-w-container-max mx-auto">
        <div className="mb-20 max-w-2xl">
          <h2 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-6">
            {title}
          </h2>
          <p className="font-body text-body-lg text-on-surface opacity-80">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {cards.map((card, idx) => {
            const IconComponent = card.lucideIcon;
            return (
              <div
                key={idx}
                className="p-8 bg-surface-container-low border-l-2 border-primary-gold hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="mb-8 text-primary-gold transition-transform group-hover:scale-110 duration-300">
                  <IconComponent className="w-10 h-10" />
                </div>
                <h3 className="font-headline text-headline-md text-primary-navy mb-4">
                  {card.title}
                </h3>
                <p className="font-body text-body-md text-on-surface opacity-70">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
