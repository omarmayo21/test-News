import React from "react";
import type { Metadata } from "next";
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
    title: `${dict.investment.title} - Nexus Resources`,
    description: dict.investment.subtitle,
    locale,
    path: "/investment",
  });
}

export default async function InvestmentPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);

  const cards = [
    {
      title: dict.investment.card1Title,
      category: dict.investment.card1Category,
      location: dict.investment.card1Location,
      stage: dict.investment.card1Stage,
      description: dict.investment.card1Desc,
    },
    {
      title: dict.investment.card2Title,
      category: dict.investment.card2Category,
      location: dict.investment.card2Location,
      stage: dict.investment.card2Stage,
      description: dict.investment.card2Desc,
    },
    {
      title: dict.investment.card3Title,
      category: dict.investment.card3Category,
      location: dict.investment.card3Location,
      stage: dict.investment.card3Stage,
      description: dict.investment.card3Desc,
    },
  ];

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-section-padding py-section-padding space-y-16">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-6">
        <h1 className="font-headline font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-navy">
          {dict.investment.title}
        </h1>
        <p className="font-body text-body-lg text-on-surface opacity-80">
          {dict.investment.subtitle}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-surface-container-high pb-4">
        <button className="px-5 py-2.5 bg-primary-gold text-white font-label text-label-md uppercase tracking-wider">
          {dict.investment.filterAll}
        </button>
        <button className="px-5 py-2.5 text-secondary hover:text-primary-gold transition-colors font-label text-label-md uppercase tracking-wider">
          {dict.investment.filterGold}
        </button>
        <button className="px-5 py-2.5 text-secondary hover:text-primary-gold transition-colors font-label text-label-md uppercase tracking-wider">
          {dict.investment.filterCopper}
        </button>
        <button className="px-5 py-2.5 text-secondary hover:text-primary-gold transition-colors font-label text-label-md uppercase tracking-wider">
          {dict.investment.filterEasternDesert}
        </button>
        <button className="px-5 py-2.5 text-secondary hover:text-primary-gold transition-colors font-label text-label-md uppercase tracking-wider">
          {dict.investment.filterExploration}
        </button>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {cards.map((card, idx) => (
          <article
            key={idx}
            className="bg-surface-container-low border border-surface-container-high p-6 hover:bg-white hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-primary-navy text-white px-3 py-1 font-label text-xs uppercase tracking-wider">
                  {card.category}
                </span>
                <span className="font-caption text-caption text-primary-gold uppercase tracking-widest">
                  {card.stage}
                </span>
              </div>
              <h3 className="font-headline text-headline-sm text-primary-navy group-hover:text-primary-gold transition-colors">
                {card.title}
              </h3>
              <p className="font-caption text-caption text-on-surface opacity-60 uppercase tracking-wider">
                {card.location}
              </p>
              <p className="font-body text-body-md text-on-surface opacity-80 leading-relaxed">
                {card.description}
              </p>
            </div>
            <div className="pt-6 border-t border-surface-container-high mt-6">
              <Link
                href={`/${locale}/contact?subject=${encodeURIComponent(card.title)}`}
                className="inline-flex items-center text-primary-gold font-label text-label-md uppercase tracking-widest hover:underline"
              >
                Inquire Concession &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Investor Advisory Callout */}
      <div className="p-12 bg-surface-container border-l-4 border-primary-gold flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="font-headline text-headline-md text-primary-navy mb-2">
            Institutional & Private Investor Relations
          </h3>
          <p className="font-body text-body-md text-on-surface opacity-80 max-w-xl">
            Access confidential technical data rooms, competent person reports (CPR), and concession terms.
          </p>
        </div>
        <Link
          href={`/${locale}/contact`}
          className="px-8 py-4 bg-primary-navy text-white font-label text-label-md uppercase tracking-widest hover:bg-primary-gold transition-colors whitespace-nowrap"
        >
          {dict.nav.contact}
        </Link>
      </div>
    </div>
  );
}
