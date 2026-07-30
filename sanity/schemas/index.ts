import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { localeSlug } from "./objects/localeSlug";
import { seo } from "./objects/seo";

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

import { heroBlock } from "./pageBuilder/heroBlock";
import { capabilitiesBlock } from "./pageBuilder/capabilitiesBlock";
import { statsBlock } from "./pageBuilder/statsBlock";
import { ctaBlock } from "./pageBuilder/ctaBlock";

export const schemaTypes = [
  // Objects
  localeString,
  localeText,
  localeSlug,
  seo,

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

  // Page Builder Blocks
  heroBlock,
  capabilitiesBlock,
  statsBlock,
  ctaBlock,
];
