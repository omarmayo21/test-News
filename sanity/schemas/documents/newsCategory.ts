import { defineType, defineField } from "sanity";

export const newsCategory = defineType({
  name: "newsCategory",
  title: "News Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "localeString",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "localeSlug",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
  ],
});
