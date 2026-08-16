import { defineType, defineField } from "sanity";

export const teamPage = defineType({
  name: "teamPage",
  title: "Corporate & Team Page",
  type: "document",
  groups: [
    { name: "header", title: "1. Header Section" },
    { name: "team", title: "2. Leadership & Advisory Members" },
    { name: "expertise", title: "3. Integrated Expertise" },
    { name: "pageBuilder", title: "4. Flexible Page Builder" },
    { name: "cta", title: "5. Call to Action" },
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
    
    // Management Team
    defineField({
      name: "managementTeam",
      title: "Management Team",
      type: "array",
      group: "team",
      of: [{ type: "reference", to: [{ type: "author" }] }],
    }),
    
    // Advisory Board
    defineField({
      name: "advisoryBoard",
      title: "Advisory Board",
      type: "array",
      group: "team",
      of: [{ type: "reference", to: [{ type: "author" }] }],
    }),

    // Specialist Consultants
    defineField({
      name: "specialistConsultants",
      title: "Specialist Consultants",
      type: "array",
      group: "team",
      of: [{ type: "reference", to: [{ type: "author" }] }],
    }),

    // Integrated Expertise
    defineField({
      name: "integratedExpertiseTitle",
      title: "Integrated Expertise Title",
      type: "localeString",
      group: "expertise",
    }),
    defineField({
      name: "integratedExpertiseSubtitle",
      title: "Integrated Expertise Subtitle",
      type: "localeText",
      group: "expertise",
    }),
    defineField({
      name: "integratedExpertiseDisciplines",
      title: "Integrated Expertise Disciplines",
      type: "localeText",
      group: "expertise",
    }),

    // Flexible Page Builder
    defineField({
      name: "pageBuilder",
      title: "Flexible Page Builder Sections",
      type: "array",
      group: "pageBuilder",
      description: "Add, remove, or reorder dynamic custom sections on this page.",
      of: [
        { type: "twoColumnBlock" },
        { type: "splitBlock" },
        { type: "capabilitiesBlock" },
        { type: "ctaBlock" },
        { type: "heroBlock" },
        { type: "statsBlock" },
      ],
    }),

    // CTA
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "localeString",
      group: "cta",
    }),
    defineField({
      name: "ctaSubtitle",
      title: "CTA Subtitle",
      type: "localeText",
      group: "cta",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA Button Label",
      type: "localeString",
      group: "cta",
    }),
    defineField({
      name: "ctaButtonLink",
      title: "CTA Button Link",
      type: "string",
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
      return { title: "Corporate / Team Page" };
    },
  },
});
