import { defineType, defineField } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "en",
      title: "English (en)",
      type: "string",
    }),
    defineField({
      name: "fr",
      title: "French (fr)",
      type: "string",
    }),
  ],
});
