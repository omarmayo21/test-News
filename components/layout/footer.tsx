import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface FooterProps {
  locale: Locale;
  data?: any;
}

export function Footer({ locale, data }: FooterProps) {
  const dict = getDictionary(locale);
  
  const copyright = data?.copyright?.[locale] || data?.copyright?.en || dict.footer.copyright;
  
  const officesTitle = dict.footer.officesTitle;
  const offices = data?.offices?.length > 0 ? data.offices : [
    { title: { en: dict.footer.cairoOffice } },
    { title: { en: dict.footer.internationalOffice } }
  ];

  const resourcesTitle = dict.footer.resourcesTitle;
  const resourceLinks = data?.resourceLinks?.length > 0 ? data.resourceLinks : [
    { label: { en: dict.footer.siteMap }, path: `/${locale}/sitemap` },
    { label: { en: dict.footer.newsletter }, path: `/${locale}/news` }
  ];

  const complianceTitle = dict.footer.complianceTitle;
  const complianceLinks = data?.complianceLinks?.length > 0 ? data.complianceLinks : [
    { label: { en: dict.footer.privacyPolicy }, path: `/${locale}/legal/privacy-policy` },
    { label: { en: dict.footer.termsOfService }, path: `/${locale}/legal/terms` }
  ];

  return (
    <footer className="bg-primary-navy text-white px-margin-mobile md:px-section-padding py-section-padding w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-container-max mx-auto">
        {/* Column 1: Logo & Copyright */}
        <div className="col-span-1 md:col-span-1">
          <div className="mb-8 flex items-center">
            <Logo variant="dark" size="footer" href={`/${locale}`} />
          </div>
          <p className="font-caption text-caption opacity-60 whitespace-pre-line">
            {copyright}
          </p>
        </div>

        {/* Column 2 - 4: Links */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <h4 className="font-label text-label-md text-primary-gold uppercase tracking-widest mb-2">
              {officesTitle}
            </h4>
            {offices.map((office: any, idx: number) => (
              <span key={idx} className="font-label text-label-md opacity-70">
                {office.title?.[locale] || office.title?.en}
              </span>
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="font-label text-label-md text-primary-gold uppercase tracking-widest mb-2">
              {resourcesTitle}
            </h4>
            {resourceLinks.map((link: any, idx: number) => (
              <Link
                key={idx}
                href={link.path || "#"}
                className="font-label text-label-md opacity-70 hover:opacity-100 hover:text-primary-gold transition-all"
              >
                {link.label?.[locale] || link.label?.en}
              </Link>
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="font-label text-label-md text-primary-gold uppercase tracking-widest mb-2">
              {complianceTitle}
            </h4>
            {complianceLinks.map((link: any, idx: number) => (
              <Link
                key={idx}
                href={link.path || "#"}
                className="font-label text-label-md opacity-70 hover:opacity-100 hover:text-primary-gold transition-all"
              >
                {link.label?.[locale] || link.label?.en}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
