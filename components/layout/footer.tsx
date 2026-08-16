import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface FooterProps {
  locale: Locale;
  data?: any;
  navTree?: any[];
  themeSettings?: any;
}

export function Footer({ locale, data, navTree, themeSettings }: FooterProps) {
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

  const resolvePath = (page: any) => {
    if (page.navigation?.externalUrl) return page.navigation.externalUrl;
    const typeMap: Record<string, string> = {
      homePage: `/${locale}`,
      aboutPage: `/${locale}/about`,
      teamPage: `/${locale}/corporate`,
      whyEgyptPage: `/${locale}/why-egypt`,
      whyNexusPage: `/${locale}/why-nexus`,
      contactPage: `/${locale}/contact`,
      investmentPage: `/${locale}/investment`,
      newsPage: `/${locale}/news`,
    };
    if (typeMap[page._type]) return typeMap[page._type];
    const slugStr = page.slug?.[locale]?.current || page.slug?.en?.current || page._id;
    return `/${locale}/${slugStr}`;
  };

  const dynamicFooterLinks = (navTree || []).filter((p: any) => p.navigation?.showInFooter);

  const emails = data?.contactEmails || ["info@nexusmines.com", "invest@nexusmines.com"];

  return (
    <footer className="bg-primary-navy text-white px-margin-mobile md:px-section-padding py-section-padding w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-container-max mx-auto">
        {/* Column 1: Logo & Copyright */}
        <div className="col-span-1 md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="mb-6 flex items-center">
              <Logo variant="dark" size="footer" href={`/${locale}`} themeSettings={themeSettings} />
            </div>
            <p className="font-caption text-caption opacity-60 max-w-xs">
              {copyright}
            </p>
          </div>
        </div>

        {/* Column 2: Main Navigation */}
        <div className="col-span-1 flex flex-col space-y-4">
          {[
            { label: "Home", path: `/${locale}` },
            { label: "About", path: `/${locale}/about` },
            { label: "Corporate", path: `/${locale}/corporate` },
            { label: "Why Egypt", path: `/${locale}/why-egypt` },
            { label: "Why Nexus", path: `/${locale}/why-nexus` },
            { label: "Contact", path: `/${locale}/contact` },
          ].map((link: any, idx: number) => (
            <Link
              key={idx}
              href={link.path}
              className="font-label text-label-md opacity-70 hover:opacity-100 hover:text-primary-gold transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Column 3: Legal & Compliance */}
        <div className="col-span-1 flex flex-col space-y-4">
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

        {/* Column 4: Contact Emails */}
        <div className="col-span-1 flex flex-col space-y-4">
          {emails.map((email: string, idx: number) => (
            <a
              key={idx}
              href={`mailto:${email}`}
              className="font-label text-label-md opacity-70 hover:opacity-100 hover:text-primary-gold transition-all"
            >
              {email}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
