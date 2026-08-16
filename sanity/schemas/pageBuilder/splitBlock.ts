import { defineType, defineField } from "sanity";

export const splitBlock = defineType({
  name: "splitBlock",
  title: "Split Content & Media Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "localeString",
    }),
    defineField({
      name: "subtitle",
      title: "Body Text / Description",
      type: "localeText",
    }),
    defineField({
      name: "layout",
      title: "Layout Direction",
      type: "string",
      options: {
        list: [
          { title: "Text on Left, Image/Stat on Right", value: "textLeft" },
          { title: "Image/Stat on Left, Text on Right", value: "textRight" },
        ],
        layout: "radio",
      },
      initialValue: "textLeft",
    }),
    defineField({
      name: "image",
      title: "Side Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      title: "Rich Text Content (Optional)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "statValue",
      title: "Highlighted Stat Value (e.g., 500,000 oz)",
      type: "string",
    }),
    defineField({
      name: "statLabel",
      title: "Stat Label",
      type: "localeString",
    }),
    defineField({
      name: "statDisclaimer",
      title: "Stat Disclaimer (Optional)",
      type: "localeString",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "statValue",
      media: "image",
    },
    prepare(selection) {
      return {
        title: selection.title || "Split Content Block",
        subtitle: selection.subtitle ? `Stat: ${selection.subtitle}` : "Text + Media Section",
        media: selection.media,
      };
    },
  },
});
