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

function formatNavPath(rawPath?: string, locale: string = "en"): string {
  if (!rawPath || rawPath === "#") return "#";
  if (
    rawPath.startsWith("http://") ||
    rawPath.startsWith("https://") ||
    rawPath.startsWith("mailto:") ||
    rawPath.startsWith("tel:")
  ) {
    return rawPath;
  }
  const clean = rawPath.replace(/^\/+/, "");
  if (!clean || clean === "en" || clean === "fr") {
    return `/${locale}`;
  }
  if (clean.startsWith("en/") || clean.startsWith("fr/")) {
    const withoutLang = clean.replace(/^(en|fr)\//, "");
    return `/${locale}/${withoutLang}`;
  }
  return `/${locale}/${clean}`;
}

export function Footer({ locale, data, navTree, themeSettings }: FooterProps) {
  const dict = getDictionary(locale);

  // Column 1: Brand & Tagline
  const aboutText =
    data?.aboutText?.[locale] ||
    data?.aboutText?.en ||
    "Egyptian mining and mineral development advancing promising gold and mineral opportunities through technical expertise, local execution, strategic partnerships, and disciplined project development.";

  const tagline =
    data?.tagline?.[locale] ||
    data?.tagline?.en ||
    "Egyptian Resources. Global Ambition.";

  // Column 2: Navigation
  const navHeading =
    data?.navHeading?.[locale] ||
    data?.navHeading?.en ||
    "NAVIGATION";

  const defaultNavLinks = [
    { label: "Home", path: `/${locale}` },
    { label: "About Nexus", path: `/${locale}/about` },
    { label: "Corporate & Team", path: `/${locale}/corporate` },
    { label: "Why Egypt", path: `/${locale}/why-egypt` },
    { label: "Why Nexus", path: `/${locale}/why-nexus` },
    { label: "News & Insights", path: `/${locale}/news` },
    { label: "Contact Us", path: `/${locale}/contact` },
  ];

  const navLinks =
    data?.resourceLinks && Array.isArray(data.resourceLinks) && data.resourceLinks.length > 0
      ? data.resourceLinks
          .filter((l: any) => l && l.enabled !== false)
          .map((l: any) => ({
            label: l.label?.[locale] || l.label?.en || l.path || "",
            path: formatNavPath(l.path, locale),
          }))
      : defaultNavLinks;

  // Column 3: Direct Inquiries
  const inquiriesHeading =
    data?.inquiriesHeading?.[locale] ||
    data?.inquiriesHeading?.en ||
    "DIRECT INQUIRIES";

  const generalEmailLabel =
    data?.generalEmailLabel?.[locale] ||
    data?.generalEmailLabel?.en ||
    "Cairo Office";

  const generalEmail =
    data?.generalEmail ||
    (Array.isArray(data?.contactEmails) && data.contactEmails[0]) ||
    "info@nexusmines.com";

  const investorEmailLabel =
    data?.investorEmailLabel?.[locale] ||
    data?.investorEmailLabel?.en ||
    "Investors & Partnerships";

  const investorEmail =
    data?.investorEmail ||
    (Array.isArray(data?.contactEmails) && data.contactEmails[1]) ||
    "invest@nexusmines.com";

  const contactPhoneLabel =
    data?.contactPhoneLabel?.[locale] ||
    data?.contactPhoneLabel?.en ||
    "International / WhatsApp";

  const contactPhone =
    data?.contactPhone ||
    "+20 10 9345 5282";

  const contactWhatsapp =
    data?.contactWhatsapp || "";

  const cleanPhone = contactPhone.replace(/[^\d+]/g, "");
  const phoneHref = contactWhatsapp
    ? (contactWhatsapp.startsWith("http") ? contactWhatsapp : `https://wa.me/${contactWhatsapp.replace(/[^\d]/g, "")}`)
    : (cleanPhone.startsWith("+") ? `tel:${cleanPhone}` : `tel:+${cleanPhone}`);

  // Column 4: Legal & Compliance
  const legalHeading =
    data?.legalHeading?.[locale] ||
    data?.legalHeading?.en ||
    "LEGAL";

  const complianceLinks =
    data?.complianceLinks?.length > 0
      ? data.complianceLinks
      : [
          { label: { en: dict.footer.privacyPolicy || "Privacy Policy" }, path: `/${locale}/legal/privacy-policy` },
          { label: { en: dict.footer.termsOfService || "Terms of Service" }, path: `/${locale}/legal/terms` },
        ];

  // Bottom Bar
  const copyright =
    data?.copyright?.[locale] ||
    data?.copyright?.en ||
    dict.footer.copyright;

  const footerNote =
    data?.footerNote?.[locale] ||
    data?.footerNote?.en ||
    "Cairo, Egypt • International Operations";

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
              {aboutText}
            </p>
            {tagline && (
              <div className="font-label text-xs uppercase tracking-[0.15em] text-primary-gold font-bold">
                {tagline}
              </div>
            )}
          </div>

          {/* Column 2: Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold mb-4">
              {navHeading}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link: any, idx: number) => (
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
              {inquiriesHeading}
            </h4>
            <div className="space-y-3 font-body text-xs sm:text-sm text-white/75">
              {generalEmail && (
                <div>
                  <span className="block text-white/50 text-[11px] uppercase tracking-wider">
                    {generalEmailLabel}
                  </span>
                  <a href={`mailto:${generalEmail}`} className="hover:text-primary-gold transition-colors">
                    {generalEmail}
                  </a>
                </div>
              )}
              {investorEmail && (
                <div>
                  <span className="block text-white/50 text-[11px] uppercase tracking-wider">
                    {investorEmailLabel}
                  </span>
                  <a href={`mailto:${investorEmail}`} className="hover:text-primary-gold transition-colors">
                    {investorEmail}
                  </a>
                </div>
              )}
              {contactPhone && (
                <div>
                  <span className="block text-white/50 text-[11px] uppercase tracking-wider">
                    {contactPhoneLabel}
                  </span>
                  <a
                    href={phoneHref}
                    className="text-white/90 font-medium hover:text-primary-gold transition-colors inline-block"
                  >
                    {contactPhone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Column 4: Legal & Compliance (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold mb-4">
              {legalHeading}
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
          {footerNote && (
            <p className="font-caption text-xs text-white/40 text-center sm:text-right">
              {footerNote}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}

