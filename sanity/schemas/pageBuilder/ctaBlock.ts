import { defineType, defineField } from "sanity";

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "CTA Closing Banner Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "localeString",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "localeString",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
      initialValue: "/contact",
    }),
  ],
  preview: {
    select: { title: "title.en" },
    prepare(selection) {
      return { title: selection.title || "CTA Closing Banner" };
    },
  },
});
