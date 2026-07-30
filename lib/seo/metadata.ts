import { Metadata } from "next";
import { Locale } from "@/i18n-config";

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  locale: Locale;
  path?: string;
}

export function constructMetadata({
  title = "Nexus Resources - Engineering the Future of Egyptian Mining",
  description = "Delivering structural excellence and strategic resource management through precision engineering and sustainable practices in the Arabian-Nubian shield.",
  keywords = ["Nexus Resources", "Egyptian Mining", "Arabian-Nubian Shield", "Structural Engineering", "Resource Exploration"],
  canonicalUrl,
  ogImage = "/logo/Original.webp",
  noIndex = false,
  noFollow = false,
  locale,
  path = "",
}: GenerateMetadataOptions): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexus-resources.com";
  const fullCanonical = canonicalUrl || `${siteUrl}/${locale}${path}`;

  return {
    title: {
      default: title,
      template: "%s | Nexus Resources",
    },
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: fullCanonical,
      languages: {
        en: `${siteUrl}/en${path}`,
        fr: `${siteUrl}/fr${path}`,
      },
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
      },
    },
    openGraph: {
      title,
      description,
      url: fullCanonical,
      siteName: "Nexus Resources",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`],
    },
  };
}
