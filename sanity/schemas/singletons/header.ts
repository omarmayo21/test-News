import { defineType, defineField } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header Settings",
  type: "document",
  
  fields: [
    defineField({
      name: "logo",
      title: "Header Logo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
      description: "Overrides the global theme logo if provided.",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      description: "If provided, a LinkedIn icon will appear in the header.",
    }),
    defineField({
      name: "enableLanguageSwitcher",
      title: "Enable Language Switcher",
      type: "boolean",
      initialValue: true,
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
    defineField({
      name: "externalLinks",
      title: "Additional External Links",
      type: "array",
      description: "Extra links added to the end of the navigation (e.g. portals, logins).",
      of: [
        {
          type: "object",
          name: "externalLink",
          fields: [
            { name: "label", type: "localeString", title: "Label" },
            { name: "url", type: "url", title: "URL" },
            { name: "openInNewTab", type: "boolean", title: "Open in New Tab", initialValue: true },
          ],
        },
      ],
    }),
  ],
});
