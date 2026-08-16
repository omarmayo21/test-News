import React from "react";
import { Search, Compass, Map, Handshake, Mountain, Cpu, Wrench, Factory } from "lucide-react";
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

function getCapabilityIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes("eval")) return Search;
  if (t.includes("explor")) return Compass;
  if (t.includes("dev")) return Map;
  if (t.includes("part")) return Handshake;
  if (t.includes("min")) return Mountain;
  if (t.includes("proc")) return Factory;
  
  const fallbacks = [Search, Compass, Map, Handshake, Mountain, Factory, Cpu, Wrench];
  return fallbacks[index % fallbacks.length];
}

export function CapabilitiesGrid({ locale, data }: CapabilitiesGridProps) {
  const dict = getDictionary(locale);

  const title = data?.sectionTitle?.[locale] || data?.sectionTitle?.en || dict.capabilities.title;
  const description = data?.sectionDescription?.[locale] || data?.sectionDescription?.en || dict.capabilities.subtitle;

  const cards = data?.cards && data.cards.length > 0
    ? data.cards.map((c, idx) => {
        const cardTitle = c.title?.[locale] || c.title?.en || `Capability ${idx + 1}`;
        return {
          icon: c.icon || "architecture",
          title: cardTitle,
          description: c.description?.[locale] || c.description?.en || "",
          lucideIcon: getCapabilityIcon(cardTitle, idx),
        };
      })
    : [];

  return (
    <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-white border-b border-surface-container-high">
      <div className="max-w-[1440px] mx-auto">
        {/* Centered Editorial Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center space-x-3">
            <span className="h-[1px] w-6 bg-primary-gold" />
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
              CORE CAPABILITIES
            </span>
            <span className="h-[1px] w-6 bg-primary-gold" />
          </div>

          <h2 className="font-headline text-[32px] sm:text-[40px] text-primary-navy font-bold tracking-tight">
            {title}
          </h2>

          {description && (
            <p className="font-body text-body-md sm:text-body-lg text-on-surface/80 leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {cards.map((card, idx) => {
            const IconComponent = card.lucideIcon;
            
            // Format description: bold first sentence if present
            const desc = card.description;
            const periodIdx = desc.indexOf(".");
            const leadSentence = periodIdx !== -1 ? desc.slice(0, periodIdx + 1) : desc;
            const remainingDesc = periodIdx !== -1 ? desc.slice(periodIdx + 1).trim() : "";

            return (
              <div
                key={idx}
                className="p-6 bg-surface-container-low/70 hover:bg-white border border-surface-container-high hover:border-primary-gold/40 transition-all duration-300 group flex flex-col items-center text-center rounded-sm shadow-card hover:shadow-card-hover"
              >
                {/* Circular Gold Icon Badge */}
                <div className="w-16 h-16 rounded-full border-2 border-primary-gold/40 bg-white group-hover:bg-primary-gold/10 group-hover:border-primary-gold flex items-center justify-center text-primary-gold mb-6 transition-all duration-300 group-hover:scale-105 shadow-sm">
                  <IconComponent className="w-7 h-7 stroke-[1.75]" />
                </div>

                <h3 className="font-label text-[14px] font-bold text-primary-navy uppercase tracking-[0.1em] mb-3 group-hover:text-primary-gold transition-colors">
                  {card.title}
                </h3>

                <div className="font-body text-xs sm:text-[13px] text-on-surface/75 leading-relaxed space-y-1.5 flex-1">
                  {leadSentence && (
                    <p className="font-semibold text-primary-navy/90">
                      {leadSentence}
                    </p>
                  )}
                  {remainingDesc && (
                    <p className="opacity-80">
                      {remainingDesc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
