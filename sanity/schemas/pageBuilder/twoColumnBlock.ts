import { defineType, defineField } from "sanity";

export const twoColumnBlock = defineType({
  name: "twoColumnBlock",
  title: "Two Column Layout (Text/Content)",
  type: "object",
  fields: [
    defineField({
      name: "leftColumn",
      title: "Left Column",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Kicker / Label", type: "localeString" }),
        defineField({ name: "heading", title: "Heading", type: "localeString" }),
        defineField({ name: "content", title: "Rich Text Content", type: "array", of: [{ type: "block" }] }),
      ]
    }),
    defineField({
      name: "rightColumn",
      title: "Right Column",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Kicker / Label", type: "localeString" }),
        defineField({ name: "heading", title: "Heading", type: "localeString" }),
        defineField({ name: "content", title: "Rich Text Content", type: "array", of: [{ type: "block" }] }),
        
        // Specifically for lists/cards in the right column (like Core Principles)
        defineField({ 
          name: "cards", 
          title: "List Items / Cards", 
          type: "array", 
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "localeString" }),
                defineField({ name: "description", title: "Description", type: "localeText" }),
              ]
            }
          ] 
        }),
      ]
    }),
    defineField({
      name: "theme",
      title: "Background Theme",
      type: "string",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Light Gray (Surface Low)", value: "gray" }
        ],
        layout: "radio"
      },
      initialValue: "white"
    })
  ],
  preview: {
    select: { leftTitle: "leftColumn.title.en", rightTitle: "rightColumn.title.en" },
    prepare(selection) {
      return { 
        title: "Two Column Section",
        subtitle: `${selection.leftTitle || 'Column 1'} | ${selection.rightTitle || 'Column 2'}`
      };
    },
  },
});
