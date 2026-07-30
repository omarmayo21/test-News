"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface CtaBannerProps {
  locale: Locale;
  data?: {
    title?: { en?: string; fr?: string };
    buttonText?: { en?: string; fr?: string };
    buttonLink?: string;
  };
}

export function CtaBanner({ locale, data }: CtaBannerProps) {
  const dict = getDictionary(locale);

  const title = data?.title?.[locale] || data?.title?.en || dict.ctaBanner.title;
  const buttonText = data?.buttonText?.[locale] || data?.buttonText?.en || dict.ctaBanner.buttonText;
  const buttonLink = data?.buttonLink || `/${locale}/contact`;

  return (
    <section className="py-24 px-margin-mobile md:px-section-padding bg-white text-center border-t border-surface-container-high">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-8">
          {title}
        </h2>
        <Link
          href={buttonLink}
          className="inline-flex items-center justify-center px-10 py-5 bg-primary-gold text-white font-label-md text-label-md uppercase tracking-widest hover:bg-primary-navy transition-colors duration-300 shadow-ambient"
        >
          {buttonText}
        </Link>
      </motion.div>
    </section>
  );
}
