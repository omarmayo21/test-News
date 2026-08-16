import { defineType, defineField } from "sanity";

export const page = defineType({
  name: "page",
  title: "Dynamic Content Page",
  type: "document",
  groups: [
    { name: "content", title: "1. Page Builder" },
    { name: "navigation", title: "Navigation Settings" },
    { name: "seo", title: "SEO Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "localeString",
    }),
    defineField({
      name: "slug",
      title: "Page URL Slug",
      type: "localeSlug",
    }),
    defineField({
      name: "navigation",
      title: "Navigation Settings",
      type: "pageNavigation",
      group: "navigation",
    }),
    defineField({
      name: "pageBuilder",
      title: "Page Layout Sections",
      type: "array",
      group: "content",
      of: [
        { type: "heroBlock" },
        { type: "capabilitiesBlock" },
        { type: "statsBlock" },
        { type: "ctaBlock" },
        { type: "twoColumnBlock" },
        { type: "splitBlock" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Metadata",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "slug.en.current",
    },
    prepare(selection) {
      return {
        title: selection.title || "Untitled Page",
        subtitle: `/${selection.subtitle || ""}`,
      };
    },
  },
});
