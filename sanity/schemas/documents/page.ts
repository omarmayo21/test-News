import { defineType, defineField } from "sanity";

export const page = defineType({
  name: "page",
  title: "Dynamic Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "localeSlug",
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
    }),
    defineField({
      name: "seo",
      title: "SEO Configuration",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "slug.en.current" },
  },
});
