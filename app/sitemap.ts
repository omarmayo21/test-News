import { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const baseUrl = settings?.siteUrl || "https://nexus-resources.com";
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
