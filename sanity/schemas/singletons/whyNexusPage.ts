import { defineType, defineField } from "sanity";

export const whyNexusPage = defineType({
  name: "whyNexusPage",
  title: "Why Nexus Page",
  type: "document",
  groups: [
    { name: "header", title: "1. Header Section" },
    { name: "content", title: "2. Strategic Approach Content" },
    { name: "pageBuilder", title: "3. Flexible Page Builder" },
    { name: "cta", title: "4. Call to Action" },
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
    
    // Content Sections
    defineField({
      name: "contentBlocks",
      title: "Content Sections",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          title: "Content Block",
          fields: [
            defineField({ name: "title", title: "Title", type: "localeString" }),
            defineField({ name: "description", title: "Description", type: "localeText" }),
            defineField({ name: "content", title: "Rich Text Content / Bullets", type: "array", of: [{ type: "block" }] }),
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
          ],
          preview: {
            select: { title: "title.en" },
            prepare(sel) {
              return { title: sel.title || "Content Block" };
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
        { type: "capabilitiesBlock" },
        { type: "ctaBlock" },
        { type: "heroBlock" },
        { type: "statsBlock" },
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
      return { title: "Why Nexus Page" };
    },
  },
});
