import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "pageBuilder", title: "1. Page Builder Sections" },
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
      name: "navigation",
      title: "Navigation Settings",
      type: "pageNavigation",
      group: "navigation",
    }),
    defineField({
      name: "pageBuilder",
      title: "Homepage Layout Sections",
      type: "array",
      group: "pageBuilder",
      description: "Add, reorder, or customize the sections displayed on the homepage.",
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
    prepare() {
      return { title: "Home Page" };
    },
  },
});
