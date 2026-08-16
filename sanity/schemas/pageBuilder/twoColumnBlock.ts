import { defineType, defineField } from "sanity";

export const twoColumnBlock = defineType({
  name: "twoColumnBlock",
  title: "Two-Column Content Block",
  type: "object",
  fields: [
    defineField({
      name: "theme",
      title: "Background Theme",
      type: "string",
      options: {
        list: [
          { title: "White Background", value: "white" },
          { title: "Light Gray Background", value: "gray" },
          { title: "Dark Navy Background", value: "navy" },
        ],
        layout: "radio",
      },
      initialValue: "white",
    }),
    defineField({
      name: "leftColumn",
      title: "Left Column",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Kicker / Category", type: "localeString" }),
        defineField({ name: "heading", title: "Main Headline", type: "localeString" }),
        defineField({
          name: "content",
          title: "Body Paragraphs (Rich Text)",
          type: "array",
          of: [{ type: "block" }],
        }),
        defineField({
          name: "cards",
          title: "Cards (Optional)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Card Title", type: "localeString" }),
                defineField({ name: "description", title: "Card Description", type: "localeText" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "rightColumn",
      title: "Right Column",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Kicker / Category", type: "localeString" }),
        defineField({ name: "heading", title: "Main Headline", type: "localeString" }),
        defineField({
          name: "content",
          title: "Body Paragraphs (Rich Text)",
          type: "array",
          of: [{ type: "block" }],
        }),
        defineField({
          name: "cards",
          title: "Cards / Values List (Optional)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Card Title", type: "localeString" }),
                defineField({ name: "description", title: "Card Description", type: "localeText" }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      leftTitle: "leftColumn.title.en",
      leftHeading: "leftColumn.heading.en",
      rightTitle: "rightColumn.title.en",
    },
    prepare(selection) {
      const title = selection.leftTitle || selection.leftHeading || "Two-Column Block";
      const subtitle = selection.rightTitle ? `vs ${selection.rightTitle}` : "Content Section";
      return {
        title: `Two Column: ${title}`,
        subtitle,
      };
    },
  },
});
