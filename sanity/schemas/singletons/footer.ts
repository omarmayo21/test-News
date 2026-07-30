import { defineType, defineField } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer Section",
  type: "document",
  fields: [
    defineField({
      name: "aboutText",
      title: "Footer About Text",
      type: "localeText",
    }),
    defineField({
      name: "offices",
      title: "Office Locations Column",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "localeString", title: "Office Name" },
            { name: "address", type: "localeString", title: "Address" },
            { name: "phone", type: "string", title: "Phone" },
            { name: "email", type: "string", title: "Email" },
          ],
        },
      ],
    }),
    defineField({
      name: "resourceLinks",
      title: "Resource Links Column",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "localeString", title: "Link Label" },
            { name: "path", type: "string", title: "Path" },
          ],
        },
      ],
    }),
    defineField({
      name: "complianceLinks",
      title: "Compliance Links Column",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "localeString", title: "Link Label" },
            { name: "path", type: "string", title: "Path" },
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
});
