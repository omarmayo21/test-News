import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { getHeaderData, getFooterData } from "@/lib/sanity/queries";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";



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

  const headerData = await getHeaderData();
  const footerData = await getFooterData();

  const mainPages = headerData?.navItems?.length > 0 
    ? headerData.navItems.map((item: any) => ({
        title: item.navLink?.label?.[locale] || item.navLink?.label?.en || "Link",
        path: item.navLink?.path || `/${locale}`,
      }))
    : [];

  const legalPages = footerData?.complianceLinks?.length > 0
    ? footerData.complianceLinks.map((link: any) => ({
        title: link.label?.[locale] || link.label?.en || "Link",
        path: link.path || "#",
      }))
    : [];

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
            {mainPages.map((page: any) => (
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
            {legalPages.map((page: any) => (
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
