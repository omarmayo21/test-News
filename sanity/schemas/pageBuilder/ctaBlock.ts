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
      name: "subtitle",
      title: "Subtitle",
      type: "localeText",
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
    defineField({
      name: "image",
      title: "Side Visual / Landscape Image",
      type: "image",
      options: { hotspot: true },
      description: "Visual displayed on the side of split banner sections.",
    }),
    defineField({
      name: "sideImage",
      title: "Side Image (Alternative)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title.en" },
    prepare(selection) {
      return { title: selection.title || "CTA Closing Banner" };
    },
  },
});
