import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { localeSlug } from "./objects/localeSlug";
import { seo } from "./objects/seo";
import { pageNavigation } from "./objects/pageNavigation";

import { siteSettings } from "./singletons/siteSettings";
import { themeSettings } from "./singletons/themeSettings";
import { header } from "./singletons/header";
import { footer } from "./singletons/footer";
import { homePage } from "./singletons/homePage";

import { news } from "./documents/news";
import { newsCategory } from "./documents/newsCategory";
import { author } from "./documents/author";
import { formSubmission } from "./documents/formSubmission";
import { legalPage } from "./documents/legalPage";
import { mediaAsset } from "./documents/mediaAsset";
import { page } from "./documents/page";
import { investmentCategory } from "./documents/investmentCategory";
import { investmentOpportunity } from "./documents/investmentOpportunity";

import { aboutPage } from "./singletons/aboutPage";
import { servicesPage } from "./singletons/servicesPage";
import { teamPage } from "./singletons/teamPage";
import { whyEgyptPage } from "./singletons/whyEgyptPage";
import { whyNexusPage } from "./singletons/whyNexusPage";
import { contactPage } from "./singletons/contactPage";
import { investmentPage } from "./singletons/investmentPage";
import { newsPage } from "./singletons/newsPage";

import { heroBlock } from "./pageBuilder/heroBlock";
import { capabilitiesBlock } from "./pageBuilder/capabilitiesBlock";
import { statsBlock } from "./pageBuilder/statsBlock";
import { ctaBlock } from "./pageBuilder/ctaBlock";
import { richTextBlock } from "./pageBuilder/richTextBlock";
import { splitBlock } from "./pageBuilder/splitBlock";
import { cardsBlock } from "./pageBuilder/cardsBlock";
import { accordionBlock } from "./pageBuilder/accordionBlock";
import { twoColumnBlock } from "./pageBuilder/twoColumnBlock";

export const schemaTypes = [
  // Objects
  localeString,
  localeText,
  localeSlug,
  seo,
  pageNavigation,

  // Singletons
  siteSettings,
  themeSettings,
  header,
  footer,
  homePage,

  // Documents
  news,
  newsCategory,
  author,
  formSubmission,
  legalPage,
  mediaAsset,
  page,
  investmentCategory,
  investmentOpportunity,

  // Custom Pages (Singletons)
  aboutPage,
  servicesPage,
  teamPage,
  whyEgyptPage,
  whyNexusPage,
  contactPage,
  investmentPage,
  newsPage,

  // Page Builder Blocks
  heroBlock,
  capabilitiesBlock,
  statsBlock,
  ctaBlock,
  richTextBlock,
  splitBlock,
  cardsBlock,
  accordionBlock,
  twoColumnBlock,
];
