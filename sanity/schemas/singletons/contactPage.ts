import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "header", title: "1. Header" },
    { name: "directContact", title: "2. Direct Contact & HQ" },
    { name: "offices", title: "3. Offices & Inquiries Grid" },
    { name: "cta", title: "4. Closing Message & Consent" },
    { name: "navigation", title: "Navigation Settings" },
    { name: "seo", title: "SEO Settings" },
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
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      group: "header",
      description: "Background image displayed in the hero banner of the Contact page.",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image (Alternative)",
      type: "image",
      options: { hotspot: true },
      group: "header",
    }),
    defineField({
      name: "formHeading",
      title: "Form Section Heading",
      type: "localeString",
      group: "directContact",
      description: 'e.g. "SEND US A MESSAGE"',
    }),
    defineField({
      name: "formSubtitle",
      title: "Form Section Subtitle",
      type: "localeText",
      group: "directContact",
      description: 'e.g. "Use the contact form below and our team will respond to your inquiry."',
    }),
    
    // Direct Contact Info (top-level fields present in production data)
    defineField({
      name: "generalEmail",
      title: "General Inquiries Email",
      type: "string",
      group: "directContact",
      description: "e.g. info@nexusmines.com",
    }),
    defineField({
      name: "pressEmail",
      title: "Investors & Press Email",
      type: "string",
      group: "directContact",
      description: "e.g. invest@nexusmines.com",
    }),
    defineField({
      name: "phone",
      title: "Direct Phone Number",
      type: "string",
      group: "directContact",
      description: "e.g. +20 2 3745 9141",
    }),
    defineField({
      name: "address",
      title: "Headquarters Address",
      type: "localeText",
      group: "directContact",
    }),
    defineField({
      name: "mapUrl",
      title: "Google Maps URL",
      type: "string",
      group: "directContact",
    }),

    // Offices & Inquiry Blocks
    defineField({
      name: "offices",
      title: "Inquiry Categories & Office Locations",
      type: "array",
      group: "offices",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Inquiry / Office Name", type: "string" }),
            defineField({ name: "isPrimary", title: "Is Primary Headquarters?", type: "boolean", initialValue: false }),
            defineField({ name: "address", title: "Address / Description", type: "string" }),
            defineField({ name: "phone", title: "Phone / Label", type: "string" }),
            defineField({ name: "email", title: "Email", type: "string" }),
            defineField({ name: "hours", title: "Working Hours", type: "string" }),
          ],
          preview: {
            select: { title: "name", subtitle: "email" },
            prepare(sel) {
              return { title: sel.title || "Office Block", subtitle: sel.subtitle || "" };
            },
          },
        },
      ],
    }),

    // Closing CTA & Form Consent
    defineField({
      name: "consentText",
      title: "Form Consent Notice",
      type: "localeText",
      group: "cta",
    }),
    defineField({
      name: "closingTitle",
      title: "Closing Message Title",
      type: "localeString",
      group: "cta",
    }),
    defineField({
      name: "closingSubtitle",
      title: "Closing Message Subtitle",
      type: "localeText",
      group: "cta",
    }),
    defineField({
      name: "closingButtonLabel",
      title: "Closing CTA Button Label",
      type: "localeString",
      group: "cta",
    }),
    defineField({
      name: "seo",
      title: "SEO Metadata",
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
