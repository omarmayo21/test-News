import { defineType, defineField } from "sanity";

export const whyNexusPage = defineType({
  name: "whyNexusPage",
  title: "Why Nexus Page",
  type: "document",
  groups: [
    { name: "header", title: "1. Header Section" },
    { name: "differentiators", title: "2. Differentiators (What Sets Nexus Apart)" },
    { name: "content", title: "3. Strategic Approach Content" },
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
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      group: "header",
      description: "Background image displayed in the hero banner of the Why Nexus page.",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image (Alternative)",
      type: "image",
      options: { hotspot: true },
      group: "header",
    }),
    
    // Differentiators ("What Sets Nexus Apart" 4 Cards)
    defineField({
      name: "differentiatorsTitle",
      title: "Section Heading",
      type: "localeString",
      group: "differentiators",
      description: 'Heading displayed above the differentiator cards (e.g. "WHAT SETS NEXUS APART")',
    }),
    defineField({
      name: "differentiators",
      title: "Differentiator Cards",
      type: "array",
      group: "differentiators",
      description: "The 4 differentiator / pillar cards highlighting what sets Nexus apart.",
      of: [
        {
          type: "object",
          title: "Differentiator Card",
          fields: [
            defineField({
              name: "title",
              title: "Card Title",
              type: "localeString",
              description: "Title of the card. A new line (Enter) creates the subtitle styling (e.g. 'Local Execution.\\nNot Just Local Presence.').",
            }),
            defineField({
              name: "description",
              title: "Card Description",
              type: "localeText",
              description: "Main descriptive body text for this differentiator card.",
            }),
            defineField({
              name: "icon",
              title: "Card Icon",
              type: "string",
              description: "Select an icon for this card (e.g. MapPin, Mountain, Users, Target)",
              options: {
                list: [
                  { title: "Map Pin (Local Execution / Egypt)", value: "MapPin" },
                  { title: "Mountain (Technical Judgment / Geology)", value: "Mountain" },
                  { title: "Users (Partnerships / Integrated Team)", value: "Users" },
                  { title: "Target (Production Mindset / Focus)", value: "Target" },
                  { title: "Compass (Exploration / Vision)", value: "Compass" },
                  { title: "Search / Magnifier (Evaluation / Research)", value: "Search" },
                  { title: "Bar Chart (Development / Economics)", value: "BarChart3" },
                  { title: "Hammer / Pickaxe (Build / Mining)", value: "Hammer" },
                  { title: "Cog / Machinery (Operations / Processing)", value: "Cog" },
                  { title: "Award (Production / Quality)", value: "Award" },
                  { title: "Truck (Transport / Logistics)", value: "Truck" },
                  { title: "Shield Check (Integrity / Compliance)", value: "ShieldCheck" },
                  { title: "Settings / Gear (Technical Excellence)", value: "Settings" },
                  { title: "Trending Up (Execution / Progress)", value: "TrendingUp" },
                  { title: "Handshake (Partnership / Trust)", value: "Handshake" },
                  { title: "Leaf (Responsible Development / ESG)", value: "Leaf" },
                  { title: "Globe (International Reach)", value: "Globe" },
                  { title: "Building (Corporate / Infrastructure)", value: "Building2" },
                  { title: "Cpu (Technology / Systems)", value: "Cpu" },
                  { title: "Wrench (Engineering / Execution)", value: "Wrench" },
                  { title: "Factory (Mineral Processing / Facilities)", value: "Factory" },
                  { title: "Lightbulb (Innovation / Insight)", value: "Lightbulb" },
                  { title: "Scale (Governance / Ethics)", value: "Scale" },
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: "title.en",
              subtitle: "icon",
            },
            prepare(sel) {
              return {
                title: sel.title ? sel.title.replace(/\n/g, " - ") : "Differentiator Card",
                subtitle: sel.subtitle ? `Icon: ${sel.subtitle}` : "Default Icon",
              };
            },
          },
        },
      ],
    }),
    
    // Content Sections
    defineField({
      name: "contentBlocks",
      title: "Content Sections",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          title: "Content Block",
          fields: [
            defineField({ name: "kicker", title: "Kicker / Section Tag", type: "localeString" }),
            defineField({ name: "title", title: "Title", type: "localeString" }),
            defineField({ name: "description", title: "Description", type: "localeText" }),
            defineField({ name: "content", title: "Rich Text Content / Bullets", type: "array", of: [{ type: "block" }] }),
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
          ],
          preview: {
            select: { title: "title.en" },
            prepare(sel) {
              return { title: sel.title || "Content Block" };
            },
          },
        },
      ],
    }),

    // Flexible Page Builder
    defineField({
      name: "pageBuilder",
      title: "Flexible Page Builder Sections",
      type: "array",
      group: "pageBuilder",
      description: "Add, remove, or reorder dynamic custom sections on this page.",
      of: [
        { type: "splitBlock" },
        { type: "twoColumnBlock" },
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
      return { title: "Why Nexus Page" };
    },
  },
});
