import { defineType, defineField } from "sanity";

export const teamPage = defineType({
  name: "teamPage",
  title: "Team Page",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation" },
    { name: "header", title: "Header" },
    { name: "pageBuilder", title: "Page Content (Builder)" },
    { name: "legacy", title: "Legacy Content (Hidden)" },
    { name: "cta", title: "Call to Action" },
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

    // Legacy Management Team
    defineField({
      name: "managementTeam",
      title: "Legacy Management Team",
      type: "array",
      group: "legacy",
      hidden: true,
      of: [{ type: "reference", to: [{ type: "author" }] }],
    }),
    
    // Legacy Advisory Board
    defineField({
      name: "advisoryBoard",
      title: "Legacy Advisory Board",
      type: "array",
      group: "legacy",
      hidden: true,
      of: [{ type: "reference", to: [{ type: "author" }] }],
    }),

    // Legacy Specialist Consultants
    defineField({
      name: "specialistConsultants",
      title: "Legacy Specialist Consultants",
      type: "array",
      group: "legacy",
      hidden: true,
      of: [{ type: "reference", to: [{ type: "author" }] }],
    }),

    // Legacy Integrated Expertise
    defineField({
      name: "integratedExpertiseTitle",
      title: "Legacy Integrated Expertise Title",
      type: "localeString",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "integratedExpertiseSubtitle",
      title: "Legacy Integrated Expertise Subtitle",
      type: "localeText",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "integratedExpertiseDisciplines",
      title: "Legacy Integrated Expertise Disciplines",
      type: "localeText",
      group: "legacy",
      hidden: true,
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
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Team Page" };
    },
  },
});
