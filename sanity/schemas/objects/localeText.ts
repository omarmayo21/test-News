import { defineType, defineField } from "sanity";

export const localeText = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English (en)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "fr",
      title: "French (fr)",
      type: "text",
      rows: 4,
    }),
  ],
});
