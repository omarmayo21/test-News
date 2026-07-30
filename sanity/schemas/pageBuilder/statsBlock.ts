import { defineType, defineField } from "sanity";

export const statsBlock = defineType({
  name: "statsBlock",
  title: "Why Egypt / Strategic Statistics Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "localeString",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Description",
      type: "localeText",
    }),
    defineField({
      name: "stats",
      title: "Stat Counter Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "string", title: "Stat Number (e.g. 1.2M, 40+)" },
            { name: "label", type: "localeString", title: "Stat Label (e.g. Ounces Discovered)" },
          ],
        },
      ],
    }),
    defineField({
      name: "sideImage",
      title: "Side Landscape Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title.en" },
    prepare(selection) {
      return { title: selection.title || "Strategic Statistics Section" };
    },
  },
});
