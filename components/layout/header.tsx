"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
}

export function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSwitchingLang, setIsSwitchingLang] = useState(false);

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

  const navLinks = [
    { label: dict.nav.home, path: `/${locale}` },
    { label: dict.nav.about, path: `/${locale}/about` },
    { label: dict.nav.team, path: `/${locale}/team` },
    { label: dict.nav.services, path: `/${locale}/services` },
    { label: dict.nav.investment, path: `/${locale}/investment` },
    { label: dict.nav.whyEgypt, path: `/${locale}/why-egypt` },
    { label: dict.nav.news, path: `/${locale}/news` },
    { label: dict.nav.contact, path: `/${locale}/contact` },
  ];

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
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-ambient border-b border-surface-container-high h-[76px] lg:h-[80px]"
            : "bg-white/90 backdrop-blur-sm border-b border-surface-container-high h-[84px] lg:h-[90px]"
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-12 lg:px-16 w-full h-full max-w-[1536px] mx-auto">
          {/* Clickable Corporate Vector Logo */}
          <Logo href={`/${locale}`} size="header" variant="light" />

          {/* Desktop Nav Links (8 items including Home) */}
          <div className="hidden 2xl:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="relative py-2 font-label text-[15px] lg:text-[12px] font-medium uppercase tracking-wider text-primary-navy hover:text-primary-gold transition-colors duration-200 group whitespace-nowrap"
                >
                  <span className={isActive ? "text-primary-gold font-bold" : ""}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Global Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-primary-navy hover:text-primary-gold transition-colors p-2.5 rounded-full hover:bg-surface-container-low"
              aria-label="Search site"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 border-l border-surface-container-high pl-4">
              <button
                onClick={() => handleLanguageSwitch("en")}
                disabled={isSwitchingLang}
                className={`font-label text-[15px] uppercase transition-all duration-200 ${
                  locale === "en"
                    ? "text-primary-gold font-bold underline underline-offset-4"
                    : "text-secondary hover:text-primary-navy opacity-70 hover:opacity-100"
                }`}
              >
                EN
              </button>
              <span className="text-surface-container-high">|</span>
              <button
                onClick={() => handleLanguageSwitch("fr")}
                disabled={isSwitchingLang}
                className={`font-label text-[15px] uppercase transition-all duration-200 ${
                  locale === "fr"
                    ? "text-primary-gold font-bold underline underline-offset-4"
                    : "text-secondary hover:text-primary-navy opacity-70 hover:opacity-100"
                }`}
              >
                FR
              </button>
            </div>

            {/* Mobile / Laptop Drawer Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="2xl:hidden text-primary-navy p-2 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Laptop Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[84px] bottom-0 z-40 bg-white p-8 2xl:hidden flex flex-col justify-between border-b border-surface-container-high overflow-y-auto"
          >
            <div className="flex flex-col space-y-5 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-headline text-2xl text-primary-navy hover:text-primary-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-surface-container-high mt-6">
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-4 bg-primary-gold text-white font-label text-label-md uppercase tracking-widest"
              >
                {dict.hero.ctaPrimary}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      {searchOpen && (
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} locale={locale} />
      )}
    </>
  );
}
