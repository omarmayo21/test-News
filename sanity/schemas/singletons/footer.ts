import { defineType, defineField } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer Section",
  type: "document",
  fields: [
    defineField({
      name: "aboutText",
      title: "Footer Brand / About Summary",
      type: "localeText",
    }),
    defineField({
      name: "contactEmails",
      title: "Contact Emails",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "offices",
      title: "Office Locations (Footer)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Office Title", type: "localeString" }),
          ],
        },
      ],
    }),
    defineField({
      name: "resourceLinks",
      title: "Resource Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "localeString", title: "Link Label" }),
            defineField({ name: "path", type: "string", title: "Path" }),
          ],
        },
      ],
    }),
    defineField({
      name: "complianceLinks",
      title: "Legal & Compliance Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "localeString", title: "Link Label" }),
            defineField({ name: "path", type: "string", title: "Path" }),
          ],
        },
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright Notice",
      type: "localeString",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer Section" };
    },
  },
});
