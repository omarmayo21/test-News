import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { constructMetadata } from "@/lib/seo/metadata";
import { getNewsArticles, getNewsPageData } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  return constructMetadata({
    title: "News & Industry Insights - Nexus Resources",
    description: "The latest structural engineering breakthroughs, mining concessions, and operational updates from Nexus Resources.",
    locale,
    path: "/news",
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);

  const sanityNews = await getNewsArticles();
  const pageData = await getNewsPageData();

  const title = pageData?.title?.[locale] || pageData?.title?.en || dict.news.title;
  const subtitle = pageData?.subtitle?.[locale] || pageData?.subtitle?.en || dict.news.subtitle;

  const articles = sanityNews;

  const heroImageUrl = pageData?.heroImage ? urlForImage(pageData.heroImage)?.url() : null;

  return (
    <div className="w-full bg-background">
      {/* 1. Hero: Cinematic Dark Navy Split Banner */}
      <section className="relative min-h-[480px] lg:min-h-[540px] bg-primary-navy-dark text-white flex items-center overflow-hidden border-b border-primary-gold/20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={title}
              fill
              className="object-cover object-right md:object-center opacity-40 lg:opacity-65 scale-105 transition-transform duration-1000"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary-navy-dark via-primary-navy to-[#050A15]">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px]" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy-dark via-primary-navy-dark/90 lg:via-primary-navy-dark/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy-dark via-transparent to-primary-navy-dark/40" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
                INSIGHTS & UPDATES
              </span>
              <span className="h-[1px] w-8 bg-primary-gold" />
            </div>

            <h1 className="font-headline text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.12] tracking-tight text-white font-bold">
              {title}
            </h1>

            {subtitle && (
              <div className="font-body text-body-md sm:text-body-lg text-white/85 leading-relaxed space-y-4 max-w-2xl whitespace-pre-wrap">
                {subtitle}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Articles Grid */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item: any) => {
            const articleTitle = item.title?.[locale] || item.title?.en || "News Article";
            const articleExcerpt = item.excerpt?.[locale] || item.excerpt?.en || "";
            const slugStr = item.slug?.[locale]?.current || item.slug?.en?.current || item._id;

            return (
              <div
                key={item._id}
                className="bg-white border border-surface-container-high hover:border-primary-gold/40 rounded-sm overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-surface-container-high">
                    {item.coverImage && urlForImage(item.coverImage) ? (
                      <Image
                        src={urlForImage(item.coverImage)!.url()}
                        alt={articleTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 767px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-navy/5 text-primary-gold">
                        <Newspaper className="w-12 h-12 stroke-[1.5]" />
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="text-xs font-label uppercase tracking-wider text-primary-gold font-bold mb-3">
                      {item.publishDate ? new Date(item.publishDate).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "short", day: "numeric" }) : "Recent"}
                    </div>
                    <h2 className="font-headline text-xl sm:text-2xl text-primary-navy font-bold mb-3 group-hover:text-primary-gold transition-colors leading-snug">
                      {articleTitle}
                    </h2>
                    <p className="font-body text-xs sm:text-[13px] text-on-surface/75 line-clamp-3 leading-relaxed">
                      {articleExcerpt}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <Link
                    href={`/${locale}/news/${slugStr}`}
                    className="font-label text-xs uppercase tracking-[0.12em] text-primary-navy font-bold group-hover:text-primary-gold transition-colors inline-flex items-center space-x-2"
                  >
                    <span>{dict.news.readArticle}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
