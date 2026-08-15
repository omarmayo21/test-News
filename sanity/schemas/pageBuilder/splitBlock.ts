import { defineType, defineField } from "sanity";

export const splitBlock = defineType({
  name: "splitBlock",
  title: "Split Content (Text + Image)",
  type: "object",
  fields: [
    defineField({
      name: "layout",
      title: "Layout Direction",
      type: "string",
      options: {
        list: [
          { title: "Text Left, Image Right", value: "textLeft" },
          { title: "Image Left, Text Right", value: "imageLeft" }
        ],
        layout: "radio"
      },
      initialValue: "textLeft"
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Description",
      type: "localeText",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "buttonLabel",
      title: "Button Label (Optional)",
      type: "localeString",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link (Optional)",
      type: "string",
    }),
    
    // Specifically for Deep Dive with Stats
    defineField({
      name: "statValue",
      title: "Stat Value (Optional, e.g. 500,000 oz)",
      type: "string",
    }),
    defineField({
      name: "statLabel",
      title: "Stat Label (Optional)",
      type: "localeString",
    }),
    defineField({
      name: "statDisclaimer",
      title: "Stat Disclaimer (Optional)",
      type: "localeString",
    }),
  ],
  preview: {
    select: { title: "title.en", layout: "layout" },
    prepare(selection) {
      return { 
        title: selection.title || "Split Block",
        subtitle: selection.layout === "textLeft" ? "Text Left" : "Image Left"
      };
    },
  },
});
