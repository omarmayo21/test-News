import { defineType, defineField } from "sanity";

export const investmentCategory = defineType({
  name: "investmentCategory",
  title: "Investment Category",
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
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
});
