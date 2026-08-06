import { defineType, defineField } from "sanity";

export const newsPage = defineType({
  name: "newsPage",
  title: "News Listing Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "seo", title: "SEO" },
    { name: "navigation", title: "Navigation Settings" },
  ],
  fields: [
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
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "navigation",
      title: "Navigation Settings",
      type: "pageNavigation",
      group: "navigation",
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
      return { title: "News Listing Page" };
    },
  },
});
