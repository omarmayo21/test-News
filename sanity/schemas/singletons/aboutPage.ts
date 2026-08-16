import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero Section" },
    { name: "mission", title: "2. Core Content & Values" },
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
      title: "Hero Title",
      type: "localeString",
      group: "hero",
      description: "Main headline displayed at the top of the About page.",
    }),
    defineField({
      name: "subtitle",
      title: "Hero Subtitle",
      type: "localeText",
      group: "hero",
      description: "Introductory text accompanying the hero title.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    
    // Overview
    defineField({
      name: "overviewTitle",
      title: "Overview Kicker",
      type: "localeString",
      group: "mission",
    }),
    defineField({
      name: "overviewHeadline",
      title: "Overview Headline",
      type: "localeString",
      group: "mission",
    }),
    defineField({
      name: "overviewDesc",
      title: "Overview Description",
      type: "localeText",
      group: "mission",
    }),

    // Vision
    defineField({
      name: "visionTitle",
      title: "Vision Title",
      type: "localeString",
      group: "mission",
    }),
    defineField({
      name: "visionDesc",
      title: "Vision Description",
      type: "localeText",
      group: "mission",
    }),

    // Mission
    defineField({
      name: "missionTitle",
      title: "Mission Kicker Title",
      type: "localeString",
      group: "mission",
    }),
    defineField({
      name: "missionHeadline",
      title: "Mission Headline",
      type: "localeString",
      group: "mission",
    }),
    defineField({
      name: "missionDesc",
      title: "Mission Description",
      type: "localeText",
      group: "mission",
    }),
    
    // Principles / Values
    defineField({
      name: "principlesTitle",
      title: "Values Section Title",
      type: "localeString",
      group: "mission",
    }),
    defineField({
      name: "principles",
      title: "Core Values List",
      type: "array",
      group: "mission",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Value Title", type: "localeString" }),
            defineField({ name: "description", title: "Value Description", type: "localeText" }),
          ],
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
        { type: "twoColumnBlock" },
        { type: "splitBlock" },
        { type: "heroBlock" },
        { type: "capabilitiesBlock" },
        { type: "statsBlock" },
        { type: "ctaBlock" },
      ],
    }),

    // CTA
    defineField({
      name: "ctaTitle",
      title: "Closing CTA Title",
      type: "localeString",
      group: "cta",
    }),
    defineField({
      name: "ctaSubtitle",
      title: "Closing CTA Subtitle",
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
      return { title: "About Page" };
    },
  },
});
