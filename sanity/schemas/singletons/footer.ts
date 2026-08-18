import { defineType, defineField } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer Section",
  type: "document",
  groups: [
    { name: "brand", title: "1. Brand & Tagline" },
    { name: "navigation", title: "2. Navigation Column" },
    { name: "inquiries", title: "3. Direct Inquiries & Contact" },
    { name: "legal", title: "4. Legal & Bottom Bar" },
  ],
  fields: [
    // 1. Brand & Tagline
    defineField({
      name: "aboutText",
      title: "Footer Brand / About Summary",
      type: "localeText",
      group: "brand",
      description: "Descriptive paragraph displayed under the logo in the footer.",
    }),
    defineField({
      name: "tagline",
      title: "Footer Tagline / Kicker",
      type: "localeString",
      group: "brand",
      description: 'Gold tagline displayed under the brand summary (e.g. "Egyptian Resources. Global Ambition.").',
    }),

    // 2. Navigation Column
    defineField({
      name: "navHeading",
      title: "Navigation Column Heading",
      type: "localeString",
      group: "navigation",
      description: 'Heading for the navigation column (e.g. "NAVIGATION").',
    }),
    defineField({
      name: "resourceLinks",
      title: "Navigation Links Override",
      type: "array",
      group: "navigation",
      description: "Optional custom navigation links. If left empty, default canonical site links are displayed.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "localeString", title: "Link Label" }),
            defineField({ name: "path", type: "string", title: "Path" }),
          ],
          preview: {
            select: { title: "label.en", subtitle: "path" },
            prepare(sel) {
              return { title: sel.title || "Nav Link", subtitle: sel.subtitle || "" };
            },
          },
        },
      ],
    }),

    // 3. Direct Inquiries & Contact
    defineField({
      name: "inquiriesHeading",
      title: "Inquiries Column Heading",
      type: "localeString",
      group: "inquiries",
      description: 'Heading for the inquiries column (e.g. "DIRECT INQUIRIES").',
    }),
    defineField({
      name: "generalEmailLabel",
      title: "General Inquiries Label",
      type: "localeString",
      group: "inquiries",
      description: 'Label above general email (e.g. "Cairo Office").',
    }),
    defineField({
      name: "generalEmail",
      title: "General Inquiries Email",
      type: "string",
      group: "inquiries",
      description: 'Primary email address for general inquiries (e.g. "info@nexusmines.com").',
    }),
    defineField({
      name: "investorEmailLabel",
      title: "Investors Email Label",
      type: "localeString",
      group: "inquiries",
      description: 'Label above investor email (e.g. "Investors & Partnerships").',
    }),
    defineField({
      name: "investorEmail",
      title: "Investors & Partnerships Email",
      type: "string",
      group: "inquiries",
      description: 'Email address for investor relations (e.g. "invest@nexusmines.com").',
    }),
    defineField({
      name: "contactPhoneLabel",
      title: "Phone / WhatsApp Label",
      type: "localeString",
      group: "inquiries",
      description: 'Label above the phone number (e.g. "International / WhatsApp").',
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone / WhatsApp Number",
      type: "string",
      group: "inquiries",
      description: 'Displayed contact/WhatsApp phone number (e.g. "+20 10 9345 5282").',
    }),
    defineField({
      name: "contactWhatsapp",
      title: "WhatsApp Link / Number (Optional Override)",
      type: "string",
      group: "inquiries",
      description: "Optional direct WhatsApp number or link if different from the displayed phone number.",
    }),
    defineField({
      name: "contactEmails",
      title: "Contact Emails (Legacy List)",
      type: "array",
      group: "inquiries",
      of: [{ type: "string" }],
      description: "Preserved for backward compatibility.",
    }),
    defineField({
      name: "offices",
      title: "Office Locations (Footer Legacy)",
      type: "array",
      group: "inquiries",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Office Title", type: "localeString" }),
          ],
        },
      ],
    }),

    // 4. Legal & Bottom Bar
    defineField({
      name: "legalHeading",
      title: "Legal Column Heading",
      type: "localeString",
      group: "legal",
      description: 'Heading for the legal column (e.g. "LEGAL").',
    }),
    defineField({
      name: "complianceLinks",
      title: "Legal & Compliance Links",
      type: "array",
      group: "legal",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "localeString", title: "Link Label" }),
            defineField({ name: "path", type: "string", title: "Path" }),
          ],
          preview: {
            select: { title: "label.en", subtitle: "path" },
            prepare(sel) {
              return { title: sel.title || "Legal Link", subtitle: sel.subtitle || "" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright Notice",
      type: "localeString",
      group: "legal",
      description: 'Copyright notice text (e.g. "© Nexus Resources. All Rights Reserved.").',
    }),
    defineField({
      name: "footerNote",
      title: "Footer Bottom Location Note",
      type: "localeString",
      group: "legal",
      description: 'Location note in bottom bar (e.g. "Cairo, Egypt • International Operations").',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer Section" };
    },
  },
});

