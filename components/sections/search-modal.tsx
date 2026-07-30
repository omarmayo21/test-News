"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export function SearchModal({ isOpen, onClose, locale }: SearchModalProps) {
  const dict = getDictionary(locale);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ news: any[]; pages: any[] }>({ news: [], pages: [] });

  if (!isOpen) return null;

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) {
      setResults({ news: [], pages: [] });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(val)}&lang=${locale}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4 bg-primary-navy/80 backdrop-blur-md" role="presentation">
      <div className="w-full max-w-2xl bg-white shadow-2xl border border-surface-container-high p-6 relative rounded-sm" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-6 right-6 text-on-surface hover:text-primary-gold transition-colors"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 id="search-modal-title" className="font-headline-md text-headline-md text-primary-navy mb-4">
          {dict.search.title}
        </h3>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
          <label htmlFor="site-search" className="sr-only">{dict.search.inputPlaceholder}</label>
          <input
            id="site-search"
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder={dict.search.inputPlaceholder}
            className="w-full pl-12 pr-10 py-4 bg-surface-container-low border-b-2 border-primary-gold text-on-surface focus:outline-none font-body-md"
            autoFocus
            aria-describedby={query.trim() && !loading && results.news.length === 0 && results.pages.length === 0 ? "search-no-results" : undefined}
          />
          {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-primary-gold" />}
        </div>

        <div className="max-h-96 overflow-y-auto space-y-4">
          {query.trim() !== "" && results.news.length === 0 && results.pages.length === 0 && !loading && (
            <p id="search-no-results" className="text-sm opacity-60 py-4 text-center">{dict.search.noResults}</p>
          )}

          {results.news.length > 0 && (
            <div>
              <h4 className="font-label-md text-xs uppercase tracking-wider text-primary-gold mb-2">
                {dict.search.categories.news}
              </h4>
              <div className="space-y-2">
                {results.news.map((item) => (
                  <Link
                    key={item._id}
                    href={`/${locale}/news/${item.slug?.en?.current || item.slug?.fr?.current || ""}`}
                    onClick={onClose}
                    className="block p-3 bg-surface-container-low hover:bg-surface-container transition-colors border-l-2 border-primary-gold"
                  >
                    <div className="font-headline-sm text-sm font-semibold text-primary-navy">
                      {item.title?.[locale] || item.title?.en}
                    </div>
                    {item.excerpt?.[locale] && (
                      <p className="text-xs opacity-70 line-clamp-1 mt-1">{item.excerpt[locale]}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.pages.length > 0 && (
            <div>
              <h4 className="font-label-md text-xs uppercase tracking-wider text-primary-gold mb-2">
                {dict.search.categories.page}
              </h4>
              <div className="space-y-2">
                {results.pages.map((item) => (
                  <Link
                    key={item._id}
                    href={`/${locale}/${item.slug?.en?.current || ""}`}
                    onClick={onClose}
                    className="block p-3 bg-surface-container-low hover:bg-surface-container transition-colors"
                  >
                    <div className="font-headline-sm text-sm font-semibold text-primary-navy">
                      {item.title?.[locale] || item.title?.en}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
