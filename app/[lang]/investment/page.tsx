import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getInvestmentPageData, getInvestmentOpportunities, getInvestmentCategories } from "@/lib/sanity/queries";
import InvestmentClient from "./InvestmentClient";

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
  const data = await getInvestmentPageData();
  const opportunities = await getInvestmentOpportunities();
  const categories = await getInvestmentCategories();

  const title = data?.title?.[locale] || data?.title?.en || dict.investment.title;
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en || dict.investment.subtitle;
  
  const ctaTitle = data?.ctaTitle?.[locale] || data?.ctaTitle?.en || "Institutional & Private Investor Relations";
  const ctaDesc = data?.ctaDesc?.[locale] || data?.ctaDesc?.en || "Access confidential technical data rooms, competent person reports (CPR), and concession terms.";
  const ctaButtonLabel = data?.ctaButtonLabel?.[locale] || data?.ctaButtonLabel?.en || dict.nav.contact;
  const ctaButtonLink = data?.ctaButtonLink || `/${locale}/contact`;

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-section-padding py-section-padding space-y-16">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-6">
        <h1 className="font-headline font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-navy">
          {title}
        </h1>
        <p className="font-body text-body-lg text-on-surface opacity-80">
          {subtitle}
        </p>
      </div>

      <InvestmentClient 
        opportunities={opportunities} 
        categories={categories} 
        locale={locale} 
        filterAllLabel={dict.investment.filterAll} 
      />

      {/* Investor Advisory Callout */}
      <div className="p-12 bg-surface-container border-l-4 border-primary-gold flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="font-headline text-headline-md text-primary-navy mb-2">
            {ctaTitle}
          </h3>
          <p className="font-body text-body-md text-on-surface opacity-80 max-w-xl">
            {ctaDesc}
          </p>
        </div>
        <Link
          href={ctaButtonLink}
          className="px-8 py-4 bg-primary-navy text-white font-label text-label-md uppercase tracking-widest hover:bg-primary-gold transition-colors whitespace-nowrap"
        >
          {ctaButtonLabel}
        </Link>
      </div>
    </div>
  );
}
