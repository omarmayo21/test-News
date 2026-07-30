import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings & Analytics",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Global Site Title",
      type: "localeString",
      initialValue: {
        en: "Nexus Resources - Structural Engineering & Mining",
        fr: "Nexus Resources - Ingénierie Structurelle & Exploitation Minière",
      },
    }),
    defineField({
      name: "siteDescription",
      title: "Global Site Description",
      type: "localeText",
    }),
    defineField({
      name: "siteUrl",
      title: "Production Site URL",
      type: "url",
      initialValue: "https://nexus-resources.com",
    }),
    defineField({
      name: "gaMeasurementId",
      title: "Google Analytics 4 Measurement ID",
      type: "string",
      placeholder: "G-XXXXXXXXXX",
    }),
    defineField({
      name: "gtmContainerId",
      title: "Google Tag Manager Container ID",
      type: "string",
      placeholder: "GTM-XXXXXXX",
    }),
    defineField({
      name: "metaPixelId",
      title: "Meta (Facebook) Pixel ID",
      type: "string",
      placeholder: "123456789012345",
    }),
    defineField({
      name: "googleSearchConsoleVerification",
      title: "Google Search Console Verification Token",
      type: "string",
    }),
    defineField({
      name: "bingVerificationToken",
      title: "Bing Site Verification Token",
      type: "string",
    }),
    defineField({
      name: "yandexVerificationToken",
      title: "Yandex Verification Token",
      type: "string",
    }),
    defineField({
      name: "facebookDomainVerificationToken",
      title: "Facebook Domain Verification Token",
      type: "string",
    }),
    defineField({
      name: "enableCookieConsent",
      title: "Enable Cookie Consent Banner",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "enableConsentModeV2",
      title: "Enable Google Consent Mode v2",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "customHeadScripts",
      title: "Custom Head HTML/JS Scripts",
      type: "text",
      rows: 6,
      description: "Injected inside the <head> tag across the site.",
    }),
    defineField({
      name: "customBodyScripts",
      title: "Custom Body HTML/JS Scripts",
      type: "text",
      rows: 6,
      description: "Injected immediately before closing </body> tag.",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO Fallback",
      type: "seo",
    }),
  ],
});
