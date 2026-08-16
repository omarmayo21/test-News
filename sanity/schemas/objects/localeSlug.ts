import { defineType, defineField } from "sanity";

export const localeSlug = defineType({
  name: "localeSlug",
  title: "Localized Slug",
  type: "object",
  fields: [
    defineField({
      name: "current",
      title: "Fallback Slug",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "en",
      title: "English Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
    }),
    defineField({
      name: "fr",
      title: "French Slug",
      type: "slug",
      options: { source: "title.fr", maxLength: 96 },
    }),
  ],
});
