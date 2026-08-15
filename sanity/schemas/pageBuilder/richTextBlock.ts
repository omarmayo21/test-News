import { defineType, defineField } from "sanity";

export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Rich Text Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title (Optional)",
      type: "localeString",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } }
      ]
    }),
    defineField({
      name: "layout",
      title: "Layout Style",
      type: "string",
      options: {
        list: [
          { title: "Standard (Centered)", value: "standard" },
          { title: "Wide", value: "wide" },
          { title: "Narrow (Reading optimized)", value: "narrow" }
        ],
        layout: "radio"
      },
      initialValue: "standard"
    })
  ],
  preview: {
    select: { title: "title.en", content: "content" },
    prepare(selection) {
      return { 
        title: selection.title || "Rich Text Block",
        subtitle: selection.content ? "Contains text content" : "Empty"
      };
    },
  },
});
