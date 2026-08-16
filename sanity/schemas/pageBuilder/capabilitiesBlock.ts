import { defineType, defineField } from "sanity";

export const capabilitiesBlock = defineType({
  name: "capabilitiesBlock",
  title: "Capabilities / Features Grid",
  type: "object",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "localeString",
    }),
    defineField({
      name: "sectionDescription",
      title: "Section Description",
      type: "localeText",
    }),
    defineField({
      name: "cards",
      title: "Capabilities Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", type: "string", title: "Material Symbol Icon Name (e.g. architecture, terrain, precision_manufacturing)" },
            { name: "title", type: "localeString", title: "Card Title" },
            { name: "subtitle", type: "localeString", title: "Card Subtitle / Tagline" },
            { name: "description", type: "localeText", title: "Card Description" },
            { name: "link", type: "string", title: "Card Link (Optional)" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "sectionTitle.en" },
    prepare(selection) {
      return { title: selection.title || "Capabilities Grid Section" };
    },
  },
});
