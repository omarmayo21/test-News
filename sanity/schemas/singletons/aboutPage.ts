import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation" },
    { name: "hero", title: "Hero Section" },
    { name: "mission", title: "Mission & Principles" },
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
    
    // Overview
    defineField({
      name: "overviewTitle",
      title: "Overview Title",
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
    
    // Principles
    defineField({
      name: "principlesTitle",
      title: "Principles Title",
      type: "localeString",
      group: "mission",
    }),
    defineField({
      name: "principles",
      title: "Core Principles",
      type: "array",
      group: "mission",
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
