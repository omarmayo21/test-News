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
      name: "contactEmails",
      title: "Contact Emails",
      type: "array",
      of: [{ type: "string" }],
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
    
    // Legacy fields
    defineField({
      name: "offices",
      title: "Legacy Offices (Hidden)",
      type: "array",
      hidden: true,
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "address", type: "string", title: "Address" },
            { name: "phone", type: "string", title: "Phone" },
            { name: "email", type: "string", title: "Email" },
          ],
        },
      ],
    }),
  ],
});
