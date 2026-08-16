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
      name: "slug",
      title: "Page Slug",
      type: "localeSlug",
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
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      group: "header",
      description: "Background image displayed in the hero banner of the Corporate page.",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image (Alternative)",
      type: "image",
      options: { hotspot: true },
      group: "header",
    }),
    
    // Management Team
    defineField({
      name: "managementTeamSubtitle",
      title: "Management Team Subtitle / Tagline",
      type: "localeString",
      group: "team",
      description: 'e.g. "Building the Company. Leading the Projects."',
    }),
    defineField({
      name: "managementTeam",
      title: "Management Team",
      type: "array",
      group: "team",
      of: [{ type: "reference", to: [{ type: "author" }] }],
    }),
    
    // Advisory Board
    defineField({
      name: "advisoryBoardSubtitle",
      title: "Advisory Board Subtitle / Tagline",
      type: "localeString",
      group: "team",
      description: 'e.g. "Specialist Expertise Supporting Project Development"',
    }),
    defineField({
      name: "advisoryBoardDescription",
      title: "Advisory Board Description",
      type: "localeText",
      group: "team",
      description: 'e.g. "Nexus Resources is supported by experienced professionals..."',
    }),
    defineField({
      name: "advisoryBoard",
      title: "Advisory Board",
      type: "array",
      group: "team",
      of: [{ type: "reference", to: [{ type: "author" }] }],
    }),

    // Specialist Consultants
    defineField({
      name: "specialistConsultantsSubtitle",
      title: "Specialist Consultants Subtitle / Tagline",
      type: "localeString",
      group: "team",
      description: 'e.g. "Specialist Expertise. Independent Capability."',
    }),
    defineField({
      name: "specialistConsultantsDescription",
      title: "Specialist Consultants Description",
      type: "localeText",
      group: "team",
      description: 'e.g. "Nexus Resources engages specialist consulting firms..."',
    }),
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
