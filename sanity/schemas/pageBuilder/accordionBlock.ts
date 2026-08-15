import { defineType, defineField } from "sanity";

export const accordionBlock = defineType({
  name: "accordionBlock",
  title: "Accordion / Feature List",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title (Optional)",
      type: "localeString",
    }),
    defineField({
      name: "items",
      title: "Accordion Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "localeString" }),
            defineField({ name: "content", title: "Content", type: "localeText" }),
          ]
        }
      ]
    })
  ],
  preview: {
    select: { title: "title.en", items: "items" },
    prepare(selection) {
      return { 
        title: selection.title || "Accordion / Feature List",
        subtitle: `${selection.items?.length || 0} items`
      };
    },
  },
});
