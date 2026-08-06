import { defineType, defineField } from "sanity";

export const whyEgyptPage = defineType({
  name: "whyEgyptPage",
  title: "Why Egypt Page",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation" },
    { name: "header", title: "Header" },
    { name: "stats", title: "Stats Counters" },
    { name: "deepDive", title: "Deep Dive Grid" },
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
            defineField({ name: "number", title: "Number (e.g. 1.2M)", type: "string" }),
            defineField({ name: "label", title: "Label", type: "localeString" }),
          ],
        },
      ],
    }),

    // Deep Dive
    defineField({
      name: "deepDiveTitle",
      title: "Deep Dive Title",
      type: "localeString",
      group: "deepDive",
    }),
    defineField({
      name: "deepDiveDesc",
      title: "Deep Dive Description",
      type: "localeText",
      group: "deepDive",
    }),
    defineField({
      name: "deepDiveList",
      title: "Deep Dive Bullet Points",
      type: "array",
      group: "deepDive",
      of: [{ type: "localeString" }],
    }),
    defineField({
      name: "deepDiveImage",
      title: "Deep Dive Image",
      type: "image",
      options: { hotspot: true },
      group: "deepDive",
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
