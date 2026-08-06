import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Homepage CMS",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation" }
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
      title: "Document Title",
      type: "string",
      initialValue: "Homepage CMS",
    }),
    defineField({
      name: "pageBuilder",
      title: "Page Sections (Page Builder)",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "capabilitiesBlock" },
        { type: "statsBlock" },
        { type: "ctaBlock" },
      ],
    }),
    defineField({
      name: "seo",
      title: "Homepage SEO & Meta",
      type: "seo",
    }),
  ],
});
