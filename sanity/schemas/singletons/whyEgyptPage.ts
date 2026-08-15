import { defineType, defineField } from "sanity";

export const whyEgyptPage = defineType({
  name: "whyEgyptPage",
  title: "Why Egypt Page",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation" },
    { name: "header", title: "Header" },
    { name: "pageBuilder", title: "Page Content (Builder)" },
    { name: "legacy", title: "Legacy Content (Hidden)" },
    { name: "cta", title: "Call to Action" },
    { name: "seo", title: "SEO" },
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
    
    // Flexible Page Builder
    defineField({
      name: "pageBuilder",
      title: "Page Sections",
      description: "Add, edit, and reorder sections on the page.",
      type: "array",
      group: "pageBuilder",
      of: [
        { type: "richTextBlock" },
        { type: "splitBlock" },
        { type: "cardsBlock" },
        { type: "accordionBlock" },
        { type: "statsBlock" },
        { type: "ctaBlock" },
      ],
    }),

    // Legacy Stats Counter
    defineField({
      name: "statsGrid",
      title: "Legacy Stats Counters",
      type: "array",
      group: "legacy",
      hidden: true,
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", title: "Number (e.g. 1.2M)", type: "string" }),
            defineField({ name: "label", title: "Label", type: "localeString" }),
          ],
        },
      ],
    }),

    // Legacy Content Sections
    defineField({
      name: "contentBlocks",
      title: "Legacy Content Sections",
      type: "array",
      group: "legacy",
      hidden: true,
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
        },
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
      title: "SEO",
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
