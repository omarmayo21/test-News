import { defineType, defineField } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation" },
    { name: "header", title: "Header" },
    { name: "services", title: "Services Grid" },
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
    
    // Services
    defineField({
      name: "services",
      title: "Services List",
      type: "array",
      group: "services",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon Name (Lucide)",
              type: "string",
              description: "e.g., Compass, Layers, Cpu, ShieldCheck, BarChart3, Wrench",
            }),
            defineField({ name: "title", title: "Service Title", type: "localeString" }),
            defineField({ name: "description", title: "Service Description", type: "localeText" }),
          ],
          preview: {
            select: {
              title: "title.en",
              subtitle: "icon",
            },
          },
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
      return { title: "Services Page" };
    },
  },
});
