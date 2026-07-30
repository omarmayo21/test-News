"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface WhyEgyptTeaserProps {
  locale: Locale;
  data?: {
    title?: { en?: string; fr?: string };
    subtitle?: { en?: string; fr?: string };
    stats?: Array<{
      number?: string;
      label?: { en?: string; fr?: string };
    }>;
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

  return (
    <section className="py-section-padding px-margin-mobile md:px-section-padding bg-surface-container-low border-t border-surface-container-high">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
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
        </motion.div>

        {/* Visual Image Block */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[500px] border-4 border-white shadow-2xl overflow-hidden"
        >
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCpy1Um9NwhUGEsMkB4jzFg5GX1jjViJxSfiBHiNZiOGY25CTcPUhY0mQZ3F-IB6mXIihNeVTWxO3N5fqSKPCcjoyOLbumWIg2McvhKn0jEspvHs-avXi2kvtDxRlifUqbs7jiWSa_hzxtnIO_mlBPIEyXMTQ_27ynF0Nbi5vOPxaDa2bZB7hgPa2vh3ssChe2kPjlO1XHEdMh4u25ZmaLaMdTgNeY76WCiNCdYdHGCjlD8Cn8_spjl4R3i9HQlxClcxeu-g9L56IC"
            alt="Arabian-Nubian Shield Geology"
            fill
            className="object-cover object-center grayscale-[15%]"
          />
        </motion.div>
      </div>
    </section>
  );
}
