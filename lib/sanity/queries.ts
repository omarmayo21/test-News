import { client } from "./client";

const fetchOptions = { next: { tags: ["sanity"], revalidate: 60 } };

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
      fetchOptions
    );
    return data;
  } catch {
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
      fetchOptions
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
          _type == "ctaBlock" => { title, subtitle, buttonText, buttonLink },
          _type == "twoColumnBlock" => { theme, leftColumn, rightColumn },
          _type == "splitBlock" => { title, subtitle, layout, image, content, statValue, statLabel, statDisclaimer }
        },
        seo
      }`,
      {},
      fetchOptions
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
      fetchOptions
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
      fetchOptions
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
      { q: `*${query}*` },
      fetchOptions
    );
    const pages = await client.fetch(
      `*[_type == "page" && (title.en match $q || title.fr match $q)][0..5]{
        _id, title, slug
      }`,
      { q: `*${query}*` },
      fetchOptions
    );
    return { news: news || [], pages: pages || [] };
  } catch {
    return { news: [], pages: [] };
  }
}

export async function getAboutPageData() {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "aboutPage"][0]`, {}, fetchOptions);
  } catch {
    return null;
  }
}

export async function getServicesPageData() {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "servicesPage"][0]`, {}, fetchOptions);
  } catch {
    return null;
  }
}

export async function getTeamPageData() {
  if (!client) return null;
  try {
    return await client.fetch(
      `*[_type == "teamPage"][0]{
        ...,
        managementTeam[]->{ name, role, bio, avatar },
        advisoryBoard[]->{ name, role, bio, avatar },
        specialistConsultants[]->{ name, role, bio, avatar }
      }`,
      {},
      fetchOptions
    );
  } catch {
    return null;
  }
}

export async function getWhyEgyptPageData() {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "whyEgyptPage"][0]`, {}, fetchOptions);
  } catch {
    return null;
  }
}

export async function getWhyNexusPageData() {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "whyNexusPage"][0]`, {}, fetchOptions);
  } catch {
    return null;
  }
}

export async function getNewsPageData() {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "newsPage"][0]`, {}, fetchOptions);
  } catch {
    return null;
  }
}

export async function getContactPageData() {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "contactPage"][0]`, {}, fetchOptions);
  } catch {
    return null;
  }
}

export async function getInvestmentPageData() {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "investmentPage"][0]`, {}, fetchOptions);
  } catch {
    return null;
  }
}

export async function getInvestmentCategories() {
  if (!client) return [];
  try {
    return await client.fetch(
      `*[_type == "investmentCategory"] | order(title.en asc){ title, slug }`,
      {},
      fetchOptions
    );
  } catch {
    return [];
  }
}

export async function getInvestmentOpportunities() {
  if (!client) return [];
  try {
    return await client.fetch(
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
      fetchOptions
    );
  } catch {
    return [];
  }
}

export async function getPage(slug: string) {
  if (!client || !slug) return null;
  try {
    return await client.fetch(
      `*[_type == "page" && (slug.en.current == $slug || slug.fr.current == $slug)][0]{
        title,
        slug,
        seo,
        pageBuilder[]{
          ...,
          _type == "heroBlock" => { headline, subtitle, ctaLabel, ctaLink, backgroundImage },
          _type == "capabilitiesBlock" => { sectionTitle, sectionDescription, cards },
          _type == "statsBlock" => { title, subtitle, stats, sideImage },
          _type == "ctaBlock" => { title, subtitle, buttonText, buttonLink },
          _type == "twoColumnBlock" => { theme, leftColumn, rightColumn },
          _type == "splitBlock" => { title, subtitle, layout, image, content, statValue, statLabel, statDisclaimer }
        }
      }`,
      { slug },
      fetchOptions
    );
  } catch {
    return null;
  }
}

export async function getAllPages() {
  if (!client) return [];
  try {
    return await client.fetch(
      `*[_type == "page"]{
        "slugEn": slug.en.current,
        "slugFr": slug.fr.current
      }`,
      {},
      fetchOptions
    );
  } catch {
    return [];
  }
}

export async function getHeaderData() {
  if (!client) return null;
  try {
    return await client.fetch(
      `*[_type == "header"][0]{
        logo,
        linkedinUrl,
        enableLanguageSwitcher,
        ctaButton,
        externalLinks
      }`,
      {},
      fetchOptions
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
      fetchOptions
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
    return await client.fetch(
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
      fetchOptions
    );
  } catch {
    return null;
  }
}
