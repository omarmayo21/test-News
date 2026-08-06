"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X, ChevronDown, Linkedin } from "lucide-react";
import dynamic from "next/dynamic";
import { Logo } from "@/components/ui/logo";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const SearchModal = dynamic(
  () => import("@/components/sections/search-modal").then((mod) => mod.SearchModal),
  { ssr: false }
);

interface HeaderProps {
  locale: Locale;
  data?: any;
  navTree?: any[];
  themeSettings?: any;
}

export function Header({ locale, data, navTree, themeSettings }: HeaderProps) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSwitchingLang, setIsSwitchingLang] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resolvePath = (page: any) => {
    if (page.navigation?.externalUrl) return page.navigation.externalUrl;
    
    const typeMap: Record<string, string> = {
      homePage: `/${locale}`,
      aboutPage: `/${locale}/about`,
      servicesPage: `/${locale}/services`,
      teamPage: `/${locale}/team`,
      whyEgyptPage: `/${locale}/why-egypt`,
      contactPage: `/${locale}/contact`,
      investmentPage: `/${locale}/investment`,
      newsPage: `/${locale}/news`,
    };
    
    if (typeMap[page._type]) return typeMap[page._type];
    
    const slugStr = page.slug?.[locale]?.current || page.slug?.en?.current || page._id;
    return `/${locale}/${slugStr}`;
  };

  const allNavItems = (navTree || []).filter((p: any) => p.navigation?.showInNav);
  
  const roots = allNavItems.filter((p: any) => !p.navigation?.parent?._id || !allNavItems.find((n: any) => n._id === p.navigation.parent._id));
  
  const menuTree = roots.map((root: any) => {
    const children = allNavItems.filter((p: any) => p.navigation?.parent?._id === root._id);
    return { ...root, children };
  });

  const ctaLabel = data?.ctaButton?.label?.[locale] || data?.ctaButton?.label?.en || dict.hero.ctaPrimary;
  const ctaUrl = data?.ctaButton?.url || `/${locale}/contact`;
  const linkedinUrl = data?.linkedinUrl;

  const handleLanguageSwitch = (targetLocale: Locale) => {
    if (targetLocale === locale || isSwitchingLang) return;
    setIsSwitchingLang(true);
    const newPath = pathname.replace(`/${locale}`, `/${targetLocale}`);
    setTimeout(() => {
      router.push(newPath || `/${targetLocale}`);
      setTimeout(() => setIsSwitchingLang(false), 300);
    }, 150);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 bg-primary-navy text-white border-b border-white/10 ${
          scrolled
            ? "h-[70px] lg:h-[76px] shadow-xl"
            : "h-[76px] lg:h-[84px]"
        }`}
      >
        <div className="flex justify-between items-center px-4 md:px-10 lg:px-16 w-full h-full max-w-[1536px] mx-auto">
          {/* Clickable Corporate Vector Logo */}
          <Logo href={`/${locale}`} size="header" variant="dark" themeSettings={themeSettings} headerLogo={data?.logo} />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {menuTree.map((item: any) => {
              const itemPath = resolvePath(item);
              const isActive = pathname === itemPath || (pathname.startsWith(itemPath) && itemPath !== `/${locale}`);
              const itemLabel = item.navigation?.navTitle?.[locale] || item.navigation?.navTitle?.en || item.title?.[locale] || item.title?.en || "Link";
              const target = item.navigation?.openInNewTab ? "_blank" : undefined;

              if (item.children && item.children.length > 0) {
                return (
                  <div key={item._id} className="relative group">
                    <button className="relative py-2 font-label text-[15px] lg:text-[12px] font-medium uppercase tracking-wider text-white/90 hover:text-primary-gold transition-colors duration-200 flex items-center space-x-1">
                      <span className={isActive ? "text-primary-gold font-bold" : ""}>{itemLabel}</span>
                      <ChevronDown className="w-3 h-3 opacity-60" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-primary-navy shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                      {item.children.map((child: any) => {
                        const childPath = resolvePath(child);
                        const childLabel = child.navigation?.navTitle?.[locale] || child.navigation?.navTitle?.en || child.title?.[locale] || child.title?.en;
                        const childTarget = child.navigation?.openInNewTab ? "_blank" : undefined;
                        return (
                          <Link
                            key={child._id}
                            href={childPath}
                            target={childTarget}
                            className="block px-6 py-2.5 font-label text-[12px] uppercase tracking-wider text-white/90 hover:bg-white/5 hover:text-primary-gold transition-colors"
                          >
                            {childLabel}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item._id}
                  href={itemPath}
                  target={target}
                  className="relative py-2 font-label text-[15px] lg:text-[12px] font-medium uppercase tracking-wider text-white/90 hover:text-primary-gold transition-colors duration-200 group whitespace-nowrap"
                >
                  <span className={isActive ? "text-primary-gold font-bold" : ""}>
                    {itemLabel}
                  </span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-gold"
                    />
                  )}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-gold group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center space-x-1 sm:space-x-3 lg:space-x-5">
            {/* Global Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              type="button"
              className="text-white hover:text-primary-gold transition-colors p-2 sm:p-2.5 rounded-full hover:bg-white/10"
              aria-label="Search site"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* LinkedIn Icon */}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary-gold transition-colors p-2 sm:p-2.5 rounded-full hover:bg-white/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 border-l border-white/20 pl-2 sm:pl-4">
              <button
                onClick={() => handleLanguageSwitch("en")}
                type="button"
                disabled={isSwitchingLang}
                aria-pressed={locale === "en"}
                className={`font-label text-[14px] sm:text-[15px] uppercase transition-all duration-200 ${
                  locale === "en"
                    ? "text-primary-gold font-bold underline underline-offset-4"
                    : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => handleLanguageSwitch("fr")}
                type="button"
                disabled={isSwitchingLang}
                aria-pressed={locale === "fr"}
                className={`font-label text-[14px] sm:text-[15px] uppercase transition-all duration-200 ${
                  locale === "fr"
                    ? "text-primary-gold font-bold underline underline-offset-4"
                    : "text-white/60 hover:text-white"
                }`}
              >
                FR
              </button>
            </div>

            {/* Mobile / Laptop Drawer Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden text-white p-2 hover:text-primary-gold hover:bg-white/10 rounded-full transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Laptop Menu Drawer */}
      {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            role="navigation"
            aria-label="Primary navigation"
            className="fixed inset-x-0 top-[70px] bottom-0 z-40 bg-primary-navy text-white px-6 py-8 lg:hidden flex flex-col justify-between border-b border-white/10 overflow-y-auto"
          >
            <div className="flex flex-col space-y-5 pt-2">
              {menuTree.map((item: any) => {
                const itemPath = resolvePath(item);
                const itemLabel = item.navigation?.navTitle?.[locale] || item.navigation?.navTitle?.en || item.title?.[locale] || item.title?.en;
                
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = openSubmenuId === item._id;

                return (
                  <div key={item._id} className="flex flex-col">
                    {hasChildren ? (
                      <button
                        onClick={() => setOpenSubmenuId(isExpanded ? null : item._id)}
                        className="flex justify-between items-center w-full font-headline text-2xl text-white hover:text-primary-gold transition-colors text-left"
                      >
                        {itemLabel}
                        <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    ) : (
                      <Link
                        href={itemPath}
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-headline text-2xl text-white hover:text-primary-gold transition-colors"
                      >
                        {itemLabel}
                      </Link>
                    )}
                    
                    {hasChildren && (
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}`}>
                        <div className="pl-4 flex flex-col space-y-3 border-l-2 border-white/20 py-2">
                          {item.children.map((child: any) => {
                            const childPath = resolvePath(child);
                            const childLabel = child.navigation?.navTitle?.[locale] || child.navigation?.navTitle?.en || child.title?.[locale] || child.title?.en;
                            return (
                              <Link
                                key={child._id}
                                href={childPath}
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-label text-md text-white/70 hover:text-primary-gold transition-colors uppercase tracking-wider block py-1"
                              >
                                {childLabel}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-6 border-t border-white/20 mt-6">
              <Link
                href={ctaUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-4 bg-primary-gold text-white font-label text-label-md uppercase tracking-widest"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
      )}

      {/* Global Search Modal */}
      {searchOpen && (
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} locale={locale} />
      )}
    </>
  );
}
