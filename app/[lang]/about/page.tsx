import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);

  return constructMetadata({
    title: `${dict.about.title} - Nexus Resources`,
    description: dict.about.subtitle,
    locale,
    path: "/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);

  return (
    <div className="w-full">
      {/* Hero: Legacy & Vision */}
      <section className="relative pt-16 pb-24 px-margin-mobile md:px-section-padding max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-5 z-10">
            <h1 className="font-headline font-headline-lg text-display-lg text-primary-navy mb-6">
              {dict.about.title}
            </h1>
            <p className="font-body text-body-lg text-on-surface opacity-80 mb-10 max-w-md">
              {dict.about.subtitle}
            </p>
          </div>
          <div className="lg:col-span-7 mt-8 lg:mt-0">
            <div className="aspect-[4/3] w-full relative">
              <div className="absolute inset-4 bg-surface-container-low translate-x-4 translate-y-4"></div>
              <div className="absolute inset-0 overflow-hidden bg-primary-navy/10 border border-surface-container-high">
                <Image
                  src="/logo/Original.svg"
                  alt="Nexus Resources Mining Site"
                  fill
                  className="object-cover grayscale contrast-125 p-8"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Core Principles */}
      <section className="bg-surface-container-low py-section-padding px-margin-mobile md:px-section-padding border-t border-surface-container-high">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter lg:gap-24">
            {/* Our Mission */}
            <div>
              <span className="font-label text-label-md text-primary-gold uppercase tracking-widest block mb-4">
                {dict.about.missionTitle}
              </span>
              <h2 className="font-headline text-headline-lg text-primary-navy mb-6">
                {dict.about.missionHeadline}
              </h2>
              <p className="font-body text-body-md text-on-surface opacity-80 leading-relaxed">
                {dict.about.missionDesc}
              </p>
            </div>

            {/* Core Principles */}
            <div>
              <span className="font-label text-label-md text-primary-gold uppercase tracking-widest block mb-4">
                {dict.about.principlesTitle}
              </span>
              <ul className="space-y-8">
                <li className="pl-4 border-l-2 border-primary-gold">
                  <h3 className="font-headline text-headline-sm text-primary-navy mb-2">
                    {dict.about.principle1Title}
                  </h3>
                  <p className="font-body text-body-md text-on-surface opacity-75">
                    {dict.about.principle1Desc}
                  </p>
                </li>
                <li className="pl-4 border-l-2 border-primary-gold">
                  <h3 className="font-headline text-headline-sm text-primary-navy mb-2">
                    {dict.about.principle2Title}
                  </h3>
                  <p className="font-body text-body-md text-on-surface opacity-75">
                    {dict.about.principle2Desc}
                  </p>
                </li>
                <li className="pl-4 border-l-2 border-primary-gold">
                  <h3 className="font-headline text-headline-sm text-primary-navy mb-2">
                    {dict.about.principle3Title}
                  </h3>
                  <p className="font-body text-body-md text-on-surface opacity-75">
                    {dict.about.principle3Desc}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-navy text-white py-20 px-margin-mobile md:px-section-padding text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline text-headline-md text-white mb-6">
            Interested in Partnering with Nexus?
          </h2>
          <p className="font-body text-body-lg opacity-80 mb-8">
            Connect with our executive management team to explore joint ventures and concessions across the Arabian-Nubian shield.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-8 py-4 bg-primary-gold text-white font-label text-label-md uppercase tracking-widest hover:bg-white hover:text-primary-navy transition-colors"
          >
            {dict.nav.contact}
          </Link>
        </div>
      </section>
    </div>
  );
}
