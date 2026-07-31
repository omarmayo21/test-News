import { MetadataRoute } from "next";
import { getSiteSettings, getAllPages, getNewsArticles } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const baseUrl = settings?.siteUrl || "https://nexus-resources.com";
  const locales = ["en", "fr"];

  const coreRoutes = [
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
    for (const route of coreRoutes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  try {
    const pages = await getAllPages();
    for (const page of pages) {
      for (const locale of locales) {
        const slug = locale === "fr" && page.slugFr ? page.slugFr : page.slugEn;
        if (slug) {
          sitemapEntries.push({
            url: `${baseUrl}/${locale}/${slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      }
    }
  } catch (e) {
    // Ignore if not present
  }

  try {
    const newsArticles = await getNewsArticles();
    for (const article of newsArticles) {
      for (const locale of locales) {
        const slug = article.slug?.[locale]?.current || article.slug?.en?.current;
        if (slug) {
          sitemapEntries.push({
            url: `${baseUrl}/${locale}/news/${slug}`,
            lastModified: new Date(article.publishDate || new Date()),
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      }
    }
  } catch (e) {
    // Ignore if not present
  }

  return sitemapEntries;
}
