import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { getNewsArticles } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

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

  const fallbackNews = [
    {
      _id: "news-1",
      title: { en: "Nexus Secures New Structural Mining Concession in Eastern Desert", fr: "Nexus Obtient une Nouvelle Concession Minière en Égypte" },
      slug: { en: { current: "nexus-secures-new-concession" }, fr: { current: "nexus-obtient-concession" } },
      publishDate: "2026-07-15",
      excerpt: { en: "Nexus Resources has been awarded exploration rights covering 450 km² in the Arabian-Nubian shield to deploy modern geospatial modeling.", fr: "Nexus Resources a obtenu des droits d'exploration couvrant 450 km² dans le bouclier arabo-nubien." },
      coverImage: null,
    },
    {
      _id: "news-2",
      title: { en: "Deploying Autonomous Telemetry in Deep Underground Tunnels", fr: "Déploiement de la Télémétrie Autonome dans les Tunnels Souterrains" },
      slug: { en: { current: "deploying-autonomous-telemetry" }, fr: { current: "telemetrie-autonome-tunnels" } },
      publishDate: "2026-06-28",
      excerpt: { en: "Integrating real-time sensor arrays for slope stability monitoring and worker safety compliance across remote facilities.", fr: "Intégration de capteurs en temps réel pour surveiller la stabilité des pentes et la sécurité des travailleurs." },
      coverImage: null,
    },
    {
      _id: "news-3",
      title: { en: "Environmental Sustainability Report: Solar-Powered Camps", fr: "Rapport de Durabilité: Camps Alimentés à l'Énergie Solaire" },
      slug: { en: { current: "environmental-sustainability-report" }, fr: { current: "rapport-durabilite-environnementale" } },
      publishDate: "2026-05-12",
      excerpt: { en: "How Nexus reduced diesel carbon emissions by 40% using hybrid microgrids across remote mining sites.", fr: "Comment Nexus a réduit les émissions de carbone diesel de 40% grâce à des micro-réseaux hybrides." },
      coverImage: null,
    },
  ];

  const articles = sanityNews.length > 0 ? sanityNews : fallbackNews;

  return (
    <div className="py-section-padding px-margin-mobile md:px-section-padding max-w-container-max mx-auto">
      {/* News Header */}
      <div className="max-w-3xl mb-16">
        <span className="font-label text-label-md text-primary-gold uppercase tracking-widest block mb-4">
          Insights & Updates
        </span>
        <h1 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-6">
          {dict.news.title}
        </h1>
        <p className="font-body text-body-lg text-on-surface opacity-80">
          {dict.news.subtitle}
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {articles.map((item: any) => {
          const articleTitle = item.title?.[locale] || item.title?.en || "News Article";
          const articleExcerpt = item.excerpt?.[locale] || item.excerpt?.en || "";
          const slugStr = item.slug?.[locale]?.current || item.slug?.en?.current || item._id;

          return (
            <div
              key={item._id}
              className="bg-surface-container-low border-b-2 border-primary-gold overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-surface-container-high">
                  {item.coverImage && urlForImage(item.coverImage) && (
                    <Image
                      src={urlForImage(item.coverImage)!.url()}
                      alt={articleTitle}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 767px) 100vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs font-label uppercase tracking-wider text-primary-gold font-bold mb-2">
                    {item.publishDate ? new Date(item.publishDate).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "short", day: "numeric" }) : "Recent"}
                  </div>
                  <h3 className="font-headline text-headline-sm text-primary-navy mb-3 group-hover:text-primary-gold transition-colors">
                    {articleTitle}
                  </h3>
                  <p className="font-body text-body-md opacity-75 line-clamp-3 mb-6">
                    {articleExcerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/${locale}/news/${slugStr}`}
                  className="font-label text-label-md uppercase tracking-wider text-primary-navy font-bold hover:text-primary-gold transition-colors inline-flex items-center space-x-2"
                >
                  <span>{dict.news.readArticle}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
