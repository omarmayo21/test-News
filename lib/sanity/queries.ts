import { client } from "./client";

export async function getSiteSettings() {
  if (!client) return null;
  try {
    const data = await client.fetch(
      `*[_type == "siteSettings"][0]{
        siteTitle,
        siteDescription,
        siteUrl,
        gaMeasurementId,
        gtmContainerId,
        metaPixelId,
        tiktokPixelId,
        linkedinInsightTagId,
        microsoftClarityId,
        googleSearchConsoleVerification,
        bingVerificationToken,
        yandexVerificationToken,
        facebookDomainVerificationToken,
        enableCookieConsent,
        enableConsentModeV2,
        customHeadScripts,
        customBodyScripts,
        defaultSeo
      }`,
      {},
      { next: { revalidate: 3600 } }
    );
    return data;
  } catch {
    // Return null silently if Sanity project/dataset is not yet populated
    return null;
  }
}

export async function getThemeSettings() {
  if (!client) return null;
  try {
    const data = await client.fetch(
      `*[_type == "themeSettings"][0]{
        lightLogo,
        darkLogo,
        favicon,
        primaryColor,
        accentGoldColor,
        secondaryTextColor,
        socialLinks
      }`,
      {},
      { next: { revalidate: 3600 } }
    );
    return data;
  } catch {
    return null;
  }
}

export async function getHomePageData() {
  if (!client) return null;
  try {
    const data = await client.fetch(
      `*[_type == "homePage"][0]{
        title,
        pageBuilder[]{
          ...,
          _type == "heroBlock" => { headline, subtitle, ctaLabel, ctaLink, backgroundImage },
          _type == "capabilitiesBlock" => { sectionTitle, sectionDescription, cards },
          _type == "statsBlock" => { title, subtitle, stats, sideImage },
          _type == "ctaBlock" => { title, buttonText, buttonLink }
        },
        seo
      }`,
      {},
      { next: { revalidate: 3600 } }
    );
    return data;
  } catch {
    return null;
  }
}

export async function getNewsArticles() {
  if (!client) return [];
  try {
    const data = await client.fetch(
      `*[_type == "news"] | order(publishDate desc){
        _id,
        title,
        slug,
        publishDate,
        featured,
        excerpt,
        coverImage,
        category->{ title, slug },
        author->{ name, role, avatar }
      }`,
      {},
      { next: { revalidate: 1800 } }
    );
    return data || [];
  } catch {
    return [];
  }
}

export async function getSingleNewsArticle(slug: string) {
  if (!client || !slug) return null;
  try {
    const data = await client.fetch(
      `*[_type == "news" && (slug.en.current == $slug || slug.fr.current == $slug)][0]{
        _id,
        title,
        slug,
        publishDate,
        featured,
        coverImage,
        gallery,
        excerpt,
        body,
        bodyFr,
        tags,
        category->{ title, slug },
        author->{ name, role, avatar, bio },
        seo,
        relatedNews[]->{ _id, title, slug, coverImage, publishDate }
      }`,
      { slug },
      { next: { revalidate: 1800 } }
    );
    return data;
  } catch {
    return null;
  }
}

export async function getGlobalSearchResults(query: string) {
  if (!client || !query) return { news: [], pages: [] };
  try {
    const news = await client.fetch(
      `*[_type == "news" && (title.en match $q || title.fr match $q || excerpt.en match $q || excerpt.fr match $q)][0..5]{
        _id, title, slug, excerpt, publishDate
      }`,
      { q: `*${query}*` }
    );
    const pages = await client.fetch(
      `*[_type == "page" && (title.en match $q || title.fr match $q)][0..5]{
        _id, title, slug
      }`,
      { q: `*${query}*` }
    );
    return { news: news || [], pages: pages || [] };
  } catch {
    return { news: [], pages: [] };
  }
}
