import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexus-resources.com";
  const locales = ["en", "fr"];

  const routes = [
    "",
    "/about",
    "/team",
    "/services",
    "/investment",
    "/why-egypt",
    "/news",
    "/contact",
    "/sitemap",
    "/legal/privacy-policy",
    "/legal/terms",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  return sitemapEntries;
}
