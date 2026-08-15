import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation" },
    { name: "header", title: "Header" },
    { name: "offices", title: "Office Locations" },
    { name: "seo", title: "SEO" },
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
    
    // Offices
    defineField({
      name: "offices",
      title: "Office Locations",
      type: "array",
      group: "offices",
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
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
