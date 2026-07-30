import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);

  return (
    <footer className="bg-primary-navy text-white px-margin-mobile md:px-section-padding py-section-padding w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-container-max mx-auto">
        {/* Column 1: Logo & Copyright */}
        <div className="col-span-1 md:col-span-1">
          <div className="mb-8 flex items-center">
            <Logo variant="dark" size="footer" href={`/${locale}`} />
          </div>
          <p className="font-caption text-caption opacity-60">
            {dict.footer.copyright}
          </p>
        </div>

        {/* Column 2 - 4: Links */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <h4 className="font-label text-label-md text-primary-gold uppercase tracking-widest mb-2">
              {dict.footer.officesTitle}
            </h4>
            <span className="font-label text-label-md opacity-70">
              {dict.footer.cairoOffice}
            </span>
            <span className="font-label text-label-md opacity-70">
              {dict.footer.internationalOffice}
            </span>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="font-label text-label-md text-primary-gold uppercase tracking-widest mb-2">
              {dict.footer.resourcesTitle}
            </h4>
            <Link
              href={`/${locale}/sitemap`}
              className="font-label text-label-md opacity-70 hover:opacity-100 hover:text-primary-gold transition-all"
            >
              {dict.footer.siteMap}
            </Link>
            <Link
              href={`/${locale}/news`}
              className="font-label text-label-md opacity-70 hover:opacity-100 hover:text-primary-gold transition-all"
            >
              {dict.footer.newsletter}
            </Link>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="font-label text-label-md text-primary-gold uppercase tracking-widest mb-2">
              {dict.footer.complianceTitle}
            </h4>
            <Link
              href={`/${locale}/legal/privacy-policy`}
              className="font-label text-label-md opacity-70 hover:opacity-100 hover:text-primary-gold transition-all"
            >
              {dict.footer.privacyPolicy}
            </Link>
            <Link
              href={`/${locale}/legal/terms`}
              className="font-label text-label-md opacity-70 hover:opacity-100 hover:text-primary-gold transition-all"
            >
              {dict.footer.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
