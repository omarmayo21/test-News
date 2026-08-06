import { defineType, defineField } from "sanity";

export const page = defineType({
  name: "page",
  title: "Dynamic Pages",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
    { name: "navigation", title: "Navigation Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "localeString",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "localeSlug",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageBuilder",
      title: "Page Builder Sections",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "capabilitiesBlock" },
        { type: "statsBlock" },
        { type: "ctaBlock" },
      ],
      group: "content",
    }),
    defineField({
      name: "navigation",
      title: "Navigation Settings",
      type: "pageNavigation",
      group: "navigation",
    }),
    defineField({
      name: "seo",
      title: "SEO Configuration",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "slug.en.current" },
  },
});
