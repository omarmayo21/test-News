import { MetadataRoute } from "next";
import { getSiteSettings, getNewsArticles, getNavigationTree } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const baseUrl = settings?.siteUrl || "https://nexus-resources.com";
  const locales = ["en", "fr"];

  const staticRoutes = [
    "/legal/privacy-policy",
    "/legal/terms",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  try {
    const navTree = await getNavigationTree();
    
    const resolvePath = (page: any, locale: string) => {
      const typeMap: Record<string, string> = {
        homePage: `/${locale}`,
        aboutPage: `/${locale}/about`,
        servicesPage: `/${locale}/services`,
        teamPage: `/${locale}/team`,
        whyEgyptPage: `/${locale}/why-egypt`,
        contactPage: `/${locale}/contact`,
        investmentPage: `/${locale}/investment`,
        newsPage: `/${locale}/news`,
      };
      if (typeMap[page._type]) return typeMap[page._type];
      const slugStr = page.slug?.[locale]?.current || page.slug?.en?.current || page._id;
      return `/${locale}/${slugStr}`;
    };

    const sitemapPages = navTree.filter((p: any) => p.navigation?.showInSitemap !== false);

    for (const page of sitemapPages) {
      if (page.navigation?.externalUrl) continue; // Don't include external links in sitemap
      
      for (const locale of locales) {
        const path = resolvePath(page, locale);
        sitemapEntries.push({
          url: `${baseUrl}${path}`,
          lastModified: new Date(),
          changeFrequency: path === `/${locale}` ? "daily" : "weekly",
          priority: path === `/${locale}` ? 1.0 : 0.8,
        });
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
