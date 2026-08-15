import { defineType, defineField } from "sanity";

export const teamPage = defineType({
  name: "teamPage",
  title: "Team Page",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation" },
    { name: "header", title: "Header" },
    { name: "team", title: "Team Grid" },
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
      group: "team",
    }),
    defineField({
      name: "integratedExpertiseSubtitle",
      title: "Integrated Expertise Subtitle",
      type: "localeText",
      group: "team",
    }),
    defineField({
      name: "integratedExpertiseDisciplines",
      title: "Integrated Expertise Disciplines",
      type: "localeText",
      group: "team",
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
