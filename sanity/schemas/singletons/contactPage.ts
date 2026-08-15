import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation" },
    { name: "header", title: "Header" },
    { name: "pageBuilder", title: "Page Content (Builder)" },
    { name: "offices", title: "Office Locations" },
    { name: "seo", title: "SEO" },
    { name: "legacy", title: "Legacy Fields (Hidden)" },
  ],
  fields: [
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "pageNavigation",
      group: "navigation",
    }),
    defineField({
      name: "kicker",
      title: "Header Kicker",
      type: "localeString",
      group: "header",
    }),
    defineField({
      name: "title",
      title: "Header Title",
      type: "localeString",
      group: "header",
    }),
    defineField({
      name: "subtitle",
      title: "Header Subtitle",
      type: "localeText",
      group: "header",
    }),
    
    // Flexible Page Builder
    defineField({
      name: "pageBuilder",
      title: "Page Sections",
      description: "Add, edit, and reorder sections on the page.",
      type: "array",
      group: "pageBuilder",
      of: [
        { type: "richTextBlock" },
        { type: "splitBlock" },
        { type: "cardsBlock" },
        { type: "accordionBlock" },
        { type: "statsBlock" },
        { type: "ctaBlock" },
      ],
    }),

    // Legacy Offices
    defineField({
      name: "offices",
      title: "Legacy Office Locations",
      type: "array",
      group: "legacy",
      hidden: true,
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Office Name", type: "string" }),
            defineField({ name: "isPrimary", title: "Is Primary Headquarters?", type: "boolean", initialValue: false }),
            defineField({ name: "address", title: "Address", type: "string" }),
            defineField({ name: "phone", title: "Phone", type: "string" }),
            defineField({ name: "email", title: "Email", type: "string" }),
            defineField({ name: "hours", title: "Working Hours", type: "string" }),
          ],
        },
      ],
    }),

    // Closing CTA & Form Consent
    defineField({
      name: "consentText",
      title: "Form Consent Text",
      type: "localeText",
      group: "header",
    }),
    defineField({
      name: "closingTitle",
      title: "Closing CTA Title",
      type: "localeString",
      group: "header",
    }),
    defineField({
      name: "closingSubtitle",
      title: "Closing CTA Subtitle",
      type: "localeText",
      group: "header",
    }),
    defineField({
      name: "closingButtonLabel",
      title: "Closing CTA Button Label",
      type: "localeString",
      group: "header",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),

    // Legacy Fields (preserves data without warnings)
    defineField({
      name: "address",
      title: "Legacy Address",
      type: "localeText",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "generalEmail",
      title: "Legacy General Email",
      type: "string",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "mapUrl",
      title: "Legacy Map URL",
      type: "string",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "phone",
      title: "Legacy Phone",
      type: "string",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "pressEmail",
      title: "Legacy Press Email",
      type: "string",
      group: "legacy",
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
