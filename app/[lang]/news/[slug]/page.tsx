import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo/metadata";
import { ArticleJsonLd } from "@/lib/seo/json-ld";
import { getSingleNewsArticle } from "@/lib/sanity/queries";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = (lang as Locale) || "en";
  const article = await getSingleNewsArticle(slug);

  const title = article?.title?.[locale] || article?.title?.en || "News Article - Nexus Resources";
  const description = article?.excerpt?.[locale] || article?.excerpt?.en || "";

  return constructMetadata({
    title,
    description,
    locale,
    path: `/news/${slug}`,
  });
}

export default async function SingleNewsPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);

  const article = await getSingleNewsArticle(slug);

  const title = article?.title?.[locale] || article?.title?.en || "Nexus Secures New Structural Mining Concession in Eastern Desert";
  const excerpt = article?.excerpt?.[locale] || article?.excerpt?.en || "Nexus Resources has been awarded exploration rights covering 450 km² in the Arabian-Nubian shield to deploy modern geospatial modeling.";
  const dateStr = article?.publishDate
    ? new Date(article.publishDate).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "long", day: "numeric" })
    : "July 15, 2026";

  return (
    <article className="py-section-padding px-margin-mobile md:px-section-padding max-w-4xl mx-auto">
      <ArticleJsonLd
        title={title}
        description={excerpt}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || "https://nexus-resources.com"}/${locale}/news/${slug}`}
        datePublished={article?.publishDate || "2026-07-15"}
        authorName={article?.author?.name || "Dr. Tarek Al-Sayed"}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex space-x-2 font-label text-xs uppercase tracking-wider text-secondary mb-8">
        <Link href={`/${locale}`} className="hover:text-primary-navy">Home</Link>
        <span>/</span>
        <Link href={`/${locale}/news`} className="hover:text-primary-navy">{dict.nav.news}</Link>
        <span>/</span>
        <span className="text-primary-gold truncate max-w-xs">{title}</span>
      </nav>

      {/* Title & Metadata */}
      <h1 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-6">
        {title}
      </h1>
      <div className="flex items-center space-x-4 font-label text-label-md text-secondary border-b border-surface-container-high pb-8 mb-10">
        <span>{dict.news.publishedOn}: <strong className="text-primary-navy">{dateStr}</strong></span>
        <span>•</span>
        <span>{dict.news.authorBy}: <strong className="text-primary-navy">{article?.author?.name || "Dr. Tarek Al-Sayed"}</strong></span>
      </div>

      {/* Hero Cover Image */}
      <div className="relative h-[450px] w-full mb-12 border-4 border-white shadow-xl overflow-hidden">
        <Image
          src={article?.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuC_raxG9n-LtRD_UiXztE5ChPc4obDFJhh8tIA25nI4mGc618f71KF0OUtGVszoZofpUu1yO5nn19c-eubyJ3uNfH8TtsHB3qZSV8TIwb14NdquLHQbC9y_31YrOQdO3Fe47szIS_VWR_rGd-K1xRTD29uO2gVMEssFb9QBIrWOX_GuHjh7A-3bUTaHIzz2J4IBOH3gwSjN38Spr_euaIJJsVR-ts1SEfdDjhCcRaSq9tMPKbov8FVazPk5mEzb-g9LgEvaFQ1ZnNc6"}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 767px) 100vw, 896px"
        />
      </div>

      {/* Body Content */}
      <div className="font-body text-body-lg text-on-surface space-y-6 leading-relaxed">
        <p className="font-semibold text-xl text-primary-navy border-l-4 border-primary-gold pl-6 py-1">
          {excerpt}
        </p>

        <p>
          Nexus Resources has officially commenced high-resolution structural mapping across the newly allocated concessions within Egypt&apos;s Eastern Desert. Utilizing advanced satellite imagery, magnetics, and targeted diamond core drilling, our engineering team is establishing 3D geological resource models.
        </p>

        <h3 className="font-headline text-2xl text-primary-navy pt-6">
          Geological Context & Exploration Methodology
        </h3>

        <p>
          The Arabian-Nubian shield exhibits high-grade mesothermal quartz-vein gold mineralization alongside Volcanogenic Massive Sulfide (VMS) copper deposits. By combining structural geometry with geochemical assay validation, Nexus aims to streamline pre-feasibility reporting while adhering to international environmental standards.
        </p>

        <p>
          &quot;Our structural discipline allows us to reduce exploration risk while accelerating deposit definition,&quot; stated Dr. Tarek Al-Sayed, Chief Executive. &quot;We look forward to presenting initial resource estimates in upcoming quarter reports.&quot;
        </p>
      </div>

      {/* Back to News */}
      <div className="mt-16 pt-8 border-t border-surface-container-high">
        <Link
          href={`/${locale}/news`}
          className="inline-block px-8 py-4 bg-primary-navy text-white font-label text-label-md uppercase tracking-widest hover:bg-primary-gold transition-colors"
        >
          ← Back to All News
        </Link>
      </div>
    </article>
  );
}
