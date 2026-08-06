import { defineType, defineField } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal & Compliance Pages",
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
      title: "Page Title",
      type: "localeString",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "localeSlug",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated Date",
      type: "date",
    }),
    defineField({
      name: "contentEn",
      title: "Content (English)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "contentFr",
      title: "Content (French)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
    }),
  ],
});
