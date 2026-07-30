import React from "react";

export function OrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexus-resources.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nexus Resources",
    url: siteUrl,
    logo: `${siteUrl}/logo/Original.webp`,
    description: "Delivering structural excellence and strategic resource management through precision engineering and sustainable practices in the Arabian-Nubian shield.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Building 14, Financial District",
      addressLocality: "New Cairo",
      addressCountry: "EG",
    },
    sameAs: [
      "https://www.linkedin.com/company/nexus-resources",
      "https://twitter.com/nexus_resources",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd({ locale }: { locale: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexus-resources.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nexus Resources",
    url: `${siteUrl}/${locale}`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/${locale}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  authorName?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: description,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: datePublished,
    author: {
      "@type": "Person",
      name: authorName || "Nexus Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Nexus Resources",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nexus-resources.com"}/logo/Original.webp`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
