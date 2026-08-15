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
      { cache: "no-store" }
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
      { cache: "no-store" }
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
          _type == "ctaBlock" => { title, subtitle, buttonText, buttonLink }
        },
        seo
      }`,
      {},
      { cache: "no-store" }
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
      { cache: "no-store" }
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
      { cache: "no-store" }
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

export async function getAboutPageData() {
  if (!client) return null;
  return client.fetch(`*[_type == "aboutPage"][0]`, {}, { cache: "no-store" });
}

export async function getServicesPageData() {
  if (!client) return null;
  return client.fetch(`*[_type == "servicesPage"][0]`, {}, { cache: "no-store" });
}

export async function getTeamPageData() {
  if (!client) return null;
  return client.fetch(
    `*[_type == "teamPage"][0]{
      ...,
      managementTeam[]->{ name, role, bio, avatar },
      advisoryBoard[]->{ name, role, bio, avatar },
      specialistConsultants[]->{ name, role, bio, avatar }
    }`,
    {},
    { cache: "no-store" }
  );
}

export async function getWhyEgyptPageData() {
  if (!client) return null;
  return client.fetch(`*[_type == "whyEgyptPage"][0]`, {}, { cache: "no-store" });
}

export async function getWhyNexusPageData() {
  if (!client) return null;
  return client.fetch(`*[_type == "whyNexusPage"][0]`, {}, { cache: "no-store" });
}

export async function getNewsPageData() {
  if (!client) return null;
  return client.fetch(`*[_type == "newsPage"][0]`, {}, { cache: "no-store" });
}

export async function getContactPageData() {
  if (!client) return null;
  return client.fetch(`*[_type == "contactPage"][0]`, {}, { cache: "no-store" });
}

export async function getInvestmentPageData() {
  if (!client) return null;
  return client.fetch(`*[_type == "investmentPage"][0]`, {}, { cache: "no-store" });
}

export async function getInvestmentCategories() {
  if (!client) return [];
  return client.fetch(
    `*[_type == "investmentCategory"] | order(title.en asc){ title, slug }`,
    {},
    { cache: "no-store" }
  );
}

export async function getInvestmentOpportunities() {
  if (!client) return [];
  return client.fetch(
    `*[_type == "investmentOpportunity"] | order(_createdAt desc){
      _id,
      title,
      location,
      minerals,
      stage,
      description,
      image,
      category->{ title, slug }
    }`,
    {},
    { cache: "no-store" }
  );
}

export async function getPage(slug: string) {
  if (!client || !slug) return null;
  try {
    return client.fetch(
      `*[_type == "page" && (slug.en.current == $slug || slug.fr.current == $slug)][0]{
        title,
        slug,
        seo,
        pageBuilder[]{
          ...,
          _type == "heroBlock" => { headline, subtitle, ctaLabel, ctaLink, backgroundImage },
          _type == "capabilitiesBlock" => { sectionTitle, sectionDescription, cards },
          _type == "statsBlock" => { title, subtitle, stats, sideImage },
          _type == "ctaBlock" => { title, subtitle, buttonText, buttonLink }
        }
      }`,
      { slug },
      { cache: "no-store" }
    );
  } catch {
    return null;
  }
}

export async function getAllPages() {
  if (!client) return [];
  try {
    return client.fetch(
      `*[_type == "page"]{
        "slugEn": slug.en.current,
        "slugFr": slug.fr.current
      }`,
      {},
      { cache: "no-store" }
    );
  } catch {
    return [];
  }
}

export async function getHeaderData() {
  if (!client) return null;
  try {
    return client.fetch(
      `*[_type == "header"][0]{
        logo,
        linkedinUrl,
        enableLanguageSwitcher,
        ctaButton,
        externalLinks
      }`,
      {},
      { cache: "no-store" }
    );
  } catch {
    return null;
  }
}

export async function getNavigationTree() {
  if (!client) return [];
  try {
    const pages = await client.fetch(
      `*[
        _type in ["homePage", "aboutPage", "servicesPage", "teamPage", "whyEgyptPage", "whyNexusPage", "contactPage", "investmentPage", "newsPage", "page"]
        && defined(navigation) 
        && navigation.enabled == true
      ] | order(navigation.order asc) {
        _id,
        _type,
        title,
        slug,
        navigation {
          showInNav,
          showInFooter,
          showInSitemap,
          navTitle,
          navGroup,
          parent->{ _id },
          order,
          openInNewTab,
          externalUrl
        }
      }`,
      {},
      { cache: "no-store" }
    );
    return pages;
  } catch (err) {
    console.error("Error fetching navigation tree:", err);
    return [];
  }
}

export async function getFooterData() {
  if (!client) return null;
  try {
    return client.fetch(
      `*[_type == "footer"][0]{
        aboutText,
        contactEmails,
        resourceLinks[]{
          label, path
        },
        complianceLinks[]{
          label, path
        },
        copyright
      }`,
      {},
      { cache: "no-store" }
    );
  } catch {
    return null;
  }
}
