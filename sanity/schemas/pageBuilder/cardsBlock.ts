import { defineType, defineField } from "sanity";

export const cardsBlock = defineType({
  name: "cardsBlock",
  title: "Cards Grid",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "localeString",
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle (Optional)",
      type: "localeText",
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Card Title", type: "localeString" }),
            defineField({ name: "description", title: "Description", type: "localeText" }),
            defineField({ name: "icon", title: "Icon Name (Optional, e.g. 'activity', 'shield')", type: "string" }),
            defineField({ name: "image", title: "Card Image (Optional)", type: "image", options: { hotspot: true } })
          ]
        }
      ]
    }),
    defineField({
      name: "columns",
      title: "Grid Columns (Desktop)",
      type: "number",
      options: {
        list: [2, 3, 4]
      },
      initialValue: 3
    })
  ],
  preview: {
    select: { title: "title.en", cards: "cards" },
    prepare(selection) {
      return { 
        title: selection.title || "Cards Grid",
        subtitle: `${selection.cards?.length || 0} cards`
      };
    },
  },
});
