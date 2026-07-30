import { defineType, defineField } from "sanity";

export const themeSettings = defineType({
  name: "themeSettings",
  title: "Global Theme & Branding Settings",
  type: "document",
  fields: [
    defineField({
      name: "lightLogo",
      title: "Light Background Logo (Original/Black)",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "darkLogo",
      title: "Dark Background Logo (Gold/White/Reverse)",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "favicon",
      title: "Favicon Image",
      type: "image",
    }),
    defineField({
      name: "primaryColor",
      title: "Primary Navy Color",
      type: "string",
      initialValue: "#0A1624",
    }),
    defineField({
      name: "accentGoldColor",
      title: "Primary Gold Color",
      type: "string",
      initialValue: "#CC9A2C",
    }),
    defineField({
      name: "secondaryTextColor",
      title: "Secondary Text Color",
      type: "string",
      initialValue: "#494740",
    }),
    defineField({
      name: "socialLinks",
      title: "Global Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string", title: "Platform (LinkedIn, Twitter, YouTube, Facebook)" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    }),
  ],
});
