import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation" },
    { name: "hero", title: "Hero Section" },
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
      name: "title",
      title: "Hero Title",
      type: "localeString",
      group: "hero",
    }),
    defineField({
      name: "subtitle",
      title: "Hero Subtitle",
      type: "localeText",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
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
        { type: "twoColumnBlock" },
        { type: "cardsBlock" },
        { type: "accordionBlock" },
        { type: "statsBlock" },
        { type: "ctaBlock" },
      ],
    }),

    // Legacy Fields (Hidden)
    defineField({
      name: "overviewTitle",
      title: "Legacy Overview Title",
      type: "localeString",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "overviewHeadline",
      title: "Legacy Overview Headline",
      type: "localeString",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "overviewDesc",
      title: "Legacy Overview Description",
      type: "localeText",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "visionTitle",
      title: "Legacy Vision Title",
      type: "localeString",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "visionDesc",
      title: "Legacy Vision Description",
      type: "localeText",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "missionTitle",
      title: "Legacy Mission Kicker Title",
      type: "localeString",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "missionHeadline",
      title: "Legacy Mission Headline",
      type: "localeString",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "missionDesc",
      title: "Legacy Mission Description",
      type: "localeText",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "principlesTitle",
      title: "Legacy Principles Title",
      type: "localeString",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "principles",
      title: "Legacy Core Principles",
      type: "array",
      group: "legacy",
      hidden: true,
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "localeString" }),
            defineField({ name: "description", title: "Description", type: "localeText" }),
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
      return { title: "About Page" };
    },
  },
});
