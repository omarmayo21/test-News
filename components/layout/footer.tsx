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

  const complianceLinks = data?.complianceLinks?.length > 0 ? data.complianceLinks : [
    { label: { en: dict.footer.privacyPolicy || "Privacy Policy" }, path: `/${locale}/legal/privacy-policy` },
    { label: { en: dict.footer.termsOfService || "Terms of Service" }, path: `/${locale}/legal/terms` }
  ];

  const emails = data?.contactEmails || ["info@nexusmines.com", "invest@nexusmines.com"];

  return (
    <footer className="bg-primary-navy-dark text-white border-t border-primary-gold/25 w-full">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <Logo variant="dark" size="footer" href={`/${locale}`} themeSettings={themeSettings} />
            </div>
            <p className="font-body text-xs sm:text-[13px] text-white/70 leading-relaxed max-w-sm">
              Egyptian mining and mineral development advancing promising gold and mineral opportunities through technical expertise, local execution, strategic partnerships, and disciplined project development.
            </p>
            <div className="font-label text-xs uppercase tracking-[0.15em] text-primary-gold font-bold">
              Egyptian Resources. Global Ambition.
            </div>
          </div>

          {/* Column 2: Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", path: `/${locale}` },
                { label: "About Nexus", path: `/${locale}/about` },
                { label: "Corporate & Team", path: `/${locale}/corporate` },
                { label: "Why Egypt", path: `/${locale}/why-egypt` },
                { label: "Why Nexus", path: `/${locale}/why-nexus` },
                { label: "News & Insights", path: `/${locale}/news` },
                { label: "Contact Us", path: `/${locale}/contact` },
              ].map((link: any, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.path}
                    className="font-body text-xs sm:text-sm text-white/75 hover:text-primary-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Direct Inquiries (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold mb-4">
              DIRECT INQUIRIES
            </h4>
            <div className="space-y-3 font-body text-xs sm:text-sm text-white/75">
              <div>
                <span className="block text-white/50 text-[11px] uppercase tracking-wider">Cairo Office</span>
                <a href="mailto:info@nexusmines.com" className="hover:text-primary-gold transition-colors">
                  info@nexusmines.com
                </a>
              </div>
              <div>
                <span className="block text-white/50 text-[11px] uppercase tracking-wider">Investors & Partnerships</span>
                <a href="mailto:invest@nexusmines.com" className="hover:text-primary-gold transition-colors">
                  invest@nexusmines.com
                </a>
              </div>
              <div>
                <span className="block text-white/50 text-[11px] uppercase tracking-wider">International / WhatsApp</span>
                <span className="text-white/90 font-medium">+20 10 9345 5282</span>
              </div>
            </div>
          </div>

          {/* Column 4: Legal & Compliance (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold mb-4">
              LEGAL
            </h4>
            <ul className="space-y-2.5">
              {complianceLinks.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.path || "#"}
                    className="font-body text-xs sm:text-sm text-white/75 hover:text-primary-gold transition-colors duration-200"
                  >
                    {link.label?.[locale] || link.label?.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Divider & Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-caption text-xs text-white/50 text-center sm:text-left">
            {copyright}
          </p>
          <p className="font-caption text-xs text-white/40 text-center sm:text-right">
            Cairo, Egypt • International Operations
          </p>
        </div>
      </div>
    </footer>
  );
}
