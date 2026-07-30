import { defineType, defineField } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header Navigation",
  type: "document",
  fields: [
    defineField({
      name: "navItems",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          title: "Navigation Link",
          fields: [
            { name: "label", type: "localeString", title: "Label" },
            { name: "path", type: "string", title: "Path (e.g. /projects, /services, /why-egypt, /team, /news, /contact)" },
          ],
        },
      ],
    }),
    defineField({
      name: "ctaButton",
      title: "Header CTA Button",
      type: "object",
      fields: [
        { name: "label", type: "localeString", title: "Label" },
        { name: "url", type: "string", title: "URL Path" },
      ],
    }),
  ],
});
