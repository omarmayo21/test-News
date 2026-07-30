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
  return constructMetadata({
    title: "Visual Site Map - Nexus Resources",
    description: "Overview of all primary navigation pages, services, concessions, and news insights on Nexus Resources.",
    locale,
    path: "/sitemap",
  });
}

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);

  const mainPages = [
    { title: dict.nav.home, path: `/${locale}` },
    { title: dict.nav.about, path: `/${locale}/about` },
    { title: dict.nav.team, path: `/${locale}/team` },
    { title: dict.nav.services, path: `/${locale}/services` },
    { title: dict.nav.investment, path: `/${locale}/investment` },
    { title: dict.nav.whyEgypt, path: `/${locale}/why-egypt` },
    { title: dict.nav.news, path: `/${locale}/news` },
    { title: dict.nav.contact, path: `/${locale}/contact` },
  ];

  const legalPages = [
    { title: dict.footer.privacyPolicy, path: `/${locale}/legal/privacy-policy` },
    { title: dict.footer.termsOfService, path: `/${locale}/legal/terms` },
  ];

  return (
    <div className="py-section-padding px-margin-mobile md:px-section-padding max-w-container-max mx-auto">
      <h1 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-4">
        {dict.footer.siteMap}
      </h1>
      <p className="font-body text-body-lg text-on-surface opacity-80 mb-12 max-w-2xl">
        Complete structure of all published pages across Nexus Resources.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Main Navigation Pages */}
        <div className="p-8 bg-surface-container-low border-t-2 border-primary-gold">
          <h2 className="font-headline text-headline-md text-primary-navy mb-6">
            Main Pages
          </h2>
          <ul className="space-y-4">
            {mainPages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className="font-label text-label-md text-primary-navy hover:text-primary-gold transition-colors block"
                >
                  &rarr; {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div className="p-8 bg-surface-container-low border-t-2 border-primary-gold">
          <h2 className="font-headline text-headline-md text-primary-navy mb-6">
            Legal & Compliance
          </h2>
          <ul className="space-y-4">
            {legalPages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className="font-label text-label-md text-primary-navy hover:text-primary-gold transition-colors block"
                >
                  &rarr; {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
