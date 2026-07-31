"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function InvestmentClient({
  opportunities,
  categories,
  locale,
  filterAllLabel,
}: {
  opportunities: any[];
  categories: any[];
  locale: string;
  filterAllLabel: string;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredOpportunities =
    activeCategory === "all"
      ? opportunities
      : opportunities.filter((opp) => opp.category?.slug?.current === activeCategory);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-surface-container-high pb-4">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-5 py-2.5 font-label text-label-md uppercase tracking-wider transition-colors ${
            activeCategory === "all"
              ? "bg-primary-gold text-white"
              : "text-secondary hover:text-primary-gold"
          }`}
        >
          {filterAllLabel}
        </button>
        {categories.map((cat: any) => (
          <button
            key={cat.slug.current}
            onClick={() => setActiveCategory(cat.slug.current)}
            className={`px-5 py-2.5 font-label text-label-md uppercase tracking-wider transition-colors ${
              activeCategory === cat.slug.current
                ? "bg-primary-gold text-white"
                : "text-secondary hover:text-primary-gold"
            }`}
          >
            {cat.title?.[locale] || cat.title?.en || cat.title}
          </button>
        ))}
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filteredOpportunities.map((card: any, idx: number) => (
          <article
            key={idx}
            className="bg-surface-container-low border border-surface-container-high p-6 hover:bg-white hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-primary-navy text-white px-3 py-1 font-label text-xs uppercase tracking-wider">
                  {card.category?.title?.[locale] || card.category?.title?.en}
                </span>
                <span className="font-caption text-caption text-primary-gold uppercase tracking-widest">
                  {card.stage?.[locale] || card.stage?.en}
                </span>
              </div>
              <h3 className="font-headline text-headline-sm text-primary-navy group-hover:text-primary-gold transition-colors">
                {card.title?.[locale] || card.title?.en}
              </h3>
              <p className="font-caption text-caption text-on-surface opacity-60 uppercase tracking-wider">
                {card.location?.[locale] || card.location?.en}
              </p>
              <p className="font-body text-body-md text-on-surface opacity-80 leading-relaxed">
                {card.description?.[locale] || card.description?.en}
              </p>
            </div>
            <div className="pt-6 border-t border-surface-container-high mt-6">
              <Link
                href={`/${locale}/contact?subject=${encodeURIComponent(card.title?.[locale] || card.title?.en)}`}
                className="inline-flex items-center text-primary-gold font-label text-label-md uppercase tracking-widest hover:underline"
              >
                Inquire Concession &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
