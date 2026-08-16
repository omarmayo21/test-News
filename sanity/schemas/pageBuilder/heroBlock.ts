import { defineType, defineField } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero Banner Section",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "localeString",
    }),
    defineField({
      name: "title",
      title: "Title (Alternative Headline)",
      type: "localeString",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Paragraph",
      type: "localeText",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "localeString",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "string",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "headline.en",
    },
    prepare(selection) {
      return {
        title: selection.title || "Hero Banner Section",
        subtitle: "Page Builder Component",
      };
    },
  },
});
