# Nexus Resources — Live Sanity Studio Dashboard Manual

This document provides a comprehensive, field-by-field user manual for every section in the **Nexus Control Center** left sidebar inside Sanity Studio (`/studio`).

---

## Sidebar Sections Index

1. [Global Site Settings](#1-global-site-settings)
2. [Theme & Branding](#2-theme--branding)
3. [Header Navigation](#3-header-navigation)
4. [Footer Section](#4-footer-section)
5. [Homepage](#5-homepage)
6. [Dynamic Pages](#6-dynamic-pages)
7. [News Articles](#7-news-articles)
8. [News Categories](#8-news-categories)
9. [Authors & Team](#9-authors--team)
10. [Form Submissions](#10-form-submissions)
11. [Legal Pages](#11-legal-pages)
12. [Media & Documents Library](#12-media--documents-library)

---

## 1. Global Site Settings

### Purpose
Manages global website metadata, search engine verification tags, global analytics tracking scripts (GA4, GTM, Meta Pixel), consent mode, and custom `<head>` / `<body>` script injections.

### Visible Fields
- **Global Site Title** (`siteTitle` | `localeString` | Required)
  - *Default*: `Nexus Resources - Structural Engineering & Mining`
  - *Example*: `Nexus Resources - Engineering the Future of Egyptian Mining`
  - *Website Location*: Browser tab, search engine titles (`<title>`).
- **Global Site Description** (`siteDescription` | `localeText` | Optional)
  - *Example*: `Delivering structural excellence and strategic resource management through precision engineering across the Arabian-Nubian shield.`
  - *Website Location*: `<meta name="description">`, search engine snippets.
- **Production Site URL** (`siteUrl` | `url` | Required)
  - *Default*: `https://nexus-resources.com`
  - *Website Location*: Canonical tags and XML sitemap URLs.
- **Google Analytics 4 Measurement ID** (`gaMeasurementId` | `string` | Optional)
  - *Placeholder*: `G-XXXXXXXXXX` | *Example*: `G-NEXUS2026`
  - *Website Location*: Injected Google Analytics tracking script.
- **Google Tag Manager Container ID** (`gtmContainerId` | `string` | Optional)
  - *Placeholder*: `GTM-XXXXXXX` | *Example*: `GTM-NEXUS01`
  - *Website Location*: Google Tag Manager container script.
- **Meta (Facebook) Pixel ID** (`metaPixelId` | `string` | Optional)
  - *Placeholder*: `123456789012345`
  - *Website Location*: Facebook Pixel tracking tag.
- **Google Search Console Verification Token** (`googleSearchConsoleVerification` | `string` | Optional)
  - *Example*: `google-site-verification-nexus-2026`
- **Bing Site Verification Token** (`bingVerificationToken` | `string` | Optional)
- **Yandex Verification Token** (`yandexVerificationToken` | `string` | Optional)
- **Facebook Domain Verification Token** (`facebookDomainVerificationToken` | `string` | Optional)
- **Enable Cookie Consent Banner** (`enableCookieConsent` | `boolean` | Required | Default: `true`)
  - *Website Location*: Controls pop-up GDPR/CCPA cookie banner.
- **Enable Google Consent Mode v2** (`enableConsentModeV2` | `boolean` | Required | Default: `true`)
  - *Website Location*: Signal transmission for EU cookie compliance.
- **Custom Head HTML/JS Scripts** (`customHeadScripts` | `text` | Optional)
  - *Website Location*: Raw injection inside `<head>`.
- **Custom Body HTML/JS Scripts** (`customBodyScripts` | `text` | Optional)
  - *Website Location*: Raw injection before `</body>`.
- **Default SEO Fallback** (`defaultSeo` | `seo` object | Optional)

### Studio Action Buttons
- **Publish**: Commits changes live to the database and revalidates site cache.
- **Discard changes**: Reverts uncommitted draft edits.

---

## 2. Theme & Branding

### Purpose
Controls primary brand logos, favicons, and global theme color codes.

### Visible Fields
- **Light Background Logo (Original/Black)** (`lightLogo` | `image` | Required)
  - *Alt Text*: `Nexus Resources Original Logo`
  - *Website Location*: Navbar logo on light backgrounds.
- **Dark Background Logo (Gold/White/Reverse)** (`darkLogo` | `image` | Required)
  - *Alt Text*: `Nexus Resources Reverse Logo`
  - *Website Location*: Footer logo and dark hero section headers.
- **Favicon Image** (`favicon` | `image` | Optional)
  - *Website Location*: Browser tab icon.
- **Primary Navy Color** (`primaryColor` | `string` | Required | Default: `#0A1624`)
- **Primary Gold Color** (`accentGoldColor` | `string` | Required | Default: `#CC9A2C`)
- **Secondary Text Color** (`secondaryTextColor` | `string` | Required | Default: `#494740`)
- **Global Social Links** (`socialLinks` | `array` of objects | Optional)
  - *Fields*: `platform` (LinkedIn, Twitter, Facebook, YouTube), `url`.

---

## 3. Header Navigation

### Purpose
Manages global navbar menu items and primary CTA button.

### Visible Fields
- **Navigation Items** (`navItems` | `array` of `navLink` objects)
  - *Fields*: `label` (`localeString`), `path` (`string` e.g., `/about`, `/team`, `/services`, `/investment`, `/why-egypt`, `/news`, `/contact`).
- **Header CTA Button** (`ctaButton` | `object`)
  - *Fields*: `label` (`localeString`), `url` (`string`).

---

## 4. Footer Section

### Purpose
Controls footer descriptive text, office locations, navigation columns, and copyright notices.

### Visible Fields
- **Footer About Text** (`aboutText` | `localeText` | Optional)
- **Office Locations Column** (`offices` | `array` of objects)
  - *Fields*: `title` (`Office Name`), `address` (`Address`), `phone` (`Phone`), `email` (`Email`).
- **Resource Links Column** (`resourceLinks` | `array` of objects)
- **Compliance Links Column** (`complianceLinks` | `array` of objects)
- **Copyright Notice** (`copyright` | `localeString` | Required)

---

## 5. Homepage

### Purpose
Singleton controlling the modular sections and SEO metadata of the main homepage (`/[lang]`).

### Visible Fields
- **Document Title** (`title` | `string` | Default: `Homepage CMS`)
- **Page Sections (Page Builder)** (`pageBuilder` | `array` of blocks)
  - *Available Blocks*:
    - **Hero Banner Section** (`heroBlock`)
    - **Capabilities Section** (`capabilitiesBlock`)
    - **Stats Section** (`statsBlock`)
    - **CTA Section** (`ctaBlock`)
- **Homepage SEO & Meta** (`seo` | `seo` object)

---

## 6. Dynamic Pages

### Purpose
Collection for creating custom landing pages with flexible page builder blocks.

### Visible Fields
- **Page Title** (`title` | `localeString` | Required)
- **Slug** (`slug` | `localeSlug` | Required)
- **Page Builder Sections** (`pageBuilder` | `array` of blocks)
- **SEO Configuration** (`seo` | `seo` object)

---

## 7. News Articles

### Purpose
Stores press releases, geological insights, and corporate news updates.

### Visible Fields
- **Article Title** (`title` | `localeString` | Required)
- **Article Slug** (`slug` | `localeSlug` | Required)
- **Publish Date & Time** (`publishDate` | `datetime` | Required)
- **Featured Article on Homepage & News Top** (`featured` | `boolean` | Default: `false`)
- **Category** (`category` | `reference` ➔ `newsCategory`)
- **Author** (`author` | `reference` ➔ `author`)
- **Cover Image** (`coverImage` | `image` with Hotspot & Alt Text)
- **Article Image Gallery** (`gallery` | `array` of `image`)
- **Short Summary / Excerpt** (`excerpt` | `localeText`)
- **Rich Text Body (English)** (`body` | `array` of blocks & images)
- **Rich Text Body (French)** (`bodyFr` | `array` of blocks & images)
- **Tags** (`tags` | `array` of `string`)
- **Related Articles** (`relatedNews` | `array` of references ➔ `news`)
- **SEO Configuration** (`seo` | `seo` object)

---

## 8. News Categories

### Purpose
Categorizes news articles into filterable topics (`Geology & Exploration`, `Infrastructure`, `ESG`, `Financials`, etc.).

### Visible Fields
- **Category Title** (`title` | `localeString`)
- **Slug** (`slug` | `localeSlug`)
- **Description** (`description` | `localeText`)

---

## 9. Authors & Team

### Purpose
Profiles of executive leadership and geological consultants displayed on `/team` and attached as article authors.

### Visible Fields
- **Full Name** (`name` | `string` | Required)
- **Role / Position** (`role` | `localeString` | Required)
- **Avatar Photo** (`avatar` | `image` with Hotspot)
- **Biography** (`bio` | `localeText`)

---

## 10. Form Submissions

### Purpose
Stores form entries submitted via website contact and quote forms.

### Visible Fields (Read-Only Storage)
- **Form Type** (`formType` | `string` | Dropdown: `Contact Form`, `Newsletter Signup`, `Quote Request`, `Careers Application`)
- **Full Name** (`fullName` | `string`)
- **Email Address** (`email` | `string`)
- **Phone Number** (`phone` | `string`)
- **Company** (`company` | `string`)
- **Subject** (`subject` | `string`)
- **Message / Request Details** (`message` | `text`)
- **Submission Timestamp** (`submittedAt` | `datetime`)
- **Review Status** (`status` | Dropdown: `New`, `Reviewed`, `Archived` | Default: `new`)
- **Raw Form Payload (JSON)** (`rawData` | `text`)

---

## 11. Legal Pages

### Purpose
Manages statutory policy pages (`/legal/privacy-policy`, `/legal/terms`, etc.).

### Visible Fields
- **Page Title** (`title` | `localeString`)
- **Slug** (`slug` | `localeSlug`)
- **Last Updated Date** (`lastUpdated` | `date`)
- **Content (English)** (`contentEn` | `array` of `block`)
- **Content (French)** (`contentFr` | `array` of `block`)
- **SEO Settings** (`seo` | `seo` object)

---

## 12. Media & Documents Library

### Purpose
Digital asset library for corporate photography, videos, and downloadable PDF reports.

### Visible Fields
- **Asset Title / Name** (`title` | `localeString` | Required)
- **Asset Type** (`assetType` | Dropdown: `Image`, `Video File`, `PDF Report`, `Spreadsheet / Archive` | Required)
- **Image File** (`imageFile` | `image` | Visible when `assetType === "image"`)
- **Document / Video File** (`file` | `file` | Visible when `assetType !== "image"`)
- **External Video / Embed Link** (`externalUrl` | `url` | Visible when `assetType === "video"`)
- **Description / Caption** (`description` | `localeText`)

---

## Publishing Workflow & Best Practices

1. **Draft vs Published**:
   - Every document edit creates an uncommitted **Draft**.
   - Public visitors only see **Published** data.
   - Click the green **Publish** button at the bottom right to go live.
2. **On-Demand Cache Revalidation**:
   - Publishing triggers a server webhook (`/api/revalidate`), updating Next.js static pages instantly.
3. **Client vs Developer Guidelines**:
   - **Clients**: Safe to create/edit News, Team Members, Categories, Legal Pages, and Media Library.
   - **Developers**: Do not modify field names or key types in `sanity/schemas/` to avoid breaking frontend GROQ queries.
