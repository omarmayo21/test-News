import { defineType, defineField } from "sanity";

export const whyEgyptPage = defineType({
  name: "whyEgyptPage",
  title: "Why Egypt Page",
  type: "document",
  groups: [
    { name: "header", title: "1. Header Section" },
    { name: "stats", title: "2. Key Statistics" },
    { name: "deepDive", title: "3. Strategic Deep-Dive Content" },
    { name: "pageBuilder", title: "4. Flexible Page Builder" },
    { name: "cta", title: "5. Call to Action" },
    { name: "navigation", title: "Navigation Settings" },
    { name: "seo", title: "SEO Settings" },
  ],
  fields: [
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "pageNavigation",
      group: "navigation",
    }),
    defineField({
      name: "kicker",
      title: "Header Kicker",
      type: "localeString",
      group: "header",
    }),
    defineField({
      name: "title",
      title: "Header Title",
      type: "localeString",
      group: "header",
    }),
    defineField({
      name: "subtitle",
      title: "Header Subtitle",
      type: "localeText",
      group: "header",
    }),
    
    // Stats Counter
    defineField({
      name: "statsGrid",
      title: "Stats Counters",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", title: "Number (e.g. 500,000 oz)", type: "string" }),
            defineField({ name: "label", title: "Label", type: "localeString" }),
          ],
        },
      ],
    }),

    // Content Sections
    defineField({
      name: "contentBlocks",
      title: "Content Sections",
      type: "array",
      group: "deepDive",
      of: [
        {
          type: "object",
          title: "Content Block",
          fields: [
            defineField({ name: "title", title: "Title", type: "localeString" }),
            defineField({ name: "description", title: "Description", type: "localeText" }),
            defineField({ name: "content", title: "Rich Text Content / Bullets", type: "array", of: [{ type: "block" }] }),
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "statValue", title: "Stat Value (e.g. 500,000 oz)", type: "string" }),
            defineField({ name: "statLabel", title: "Stat Label", type: "localeString" }),
            defineField({ name: "statDisclaimer", title: "Stat Disclaimer", type: "localeString" }),
          ],
          preview: {
            select: { title: "title.en", subtitle: "statValue" },
            prepare(sel) {
              return {
                title: sel.title || "Section",
                subtitle: sel.subtitle ? `Stat: ${sel.subtitle}` : "",
              };
            },
          },
        },
      ],
    }),

    // Flexible Page Builder
    defineField({
      name: "pageBuilder",
      title: "Flexible Page Builder Sections",
      type: "array",
      group: "pageBuilder",
      description: "Add, remove, or reorder dynamic custom sections on this page.",
      of: [
        { type: "splitBlock" },
        { type: "twoColumnBlock" },
        { type: "statsBlock" },
        { type: "capabilitiesBlock" },
        { type: "ctaBlock" },
        { type: "heroBlock" },
      ],
    }),

    // CTA
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "localeString",
      group: "cta",
    }),
    defineField({
      name: "ctaSubtitle",
      title: "CTA Subtitle",
      type: "localeText",
      group: "cta",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA Button Label",
      type: "localeString",
      group: "cta",
    }),
    defineField({
      name: "ctaButtonLink",
      title: "CTA Button Link",
      type: "string",
      group: "cta",
    }),

    defineField({
      name: "seo",
      title: "SEO Metadata",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Why Egypt Page" };
    },
  },
});
