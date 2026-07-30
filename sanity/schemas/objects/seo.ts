import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO & Social Sharing",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "localeString",
      description: "Recommended: 50-60 characters.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "localeText",
      description: "Recommended: 150-160 characters.",
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "SEO target keywords.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL Override",
      type: "url",
      description: "Leave empty to use automatic canonical URL.",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "noIndex",
      title: "Prevent Search Engine Indexing (noindex)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      title: "Prevent Following Links (nofollow)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "schemaType",
      title: "Structured Data Schema Type",
      type: "string",
      options: {
        list: [
          { title: "WebSite", value: "WebSite" },
          { title: "Organization", value: "Organization" },
          { title: "Article / NewsArticle", value: "NewsArticle" },
          { title: "Service", value: "Service" },
          { title: "ContactPage", value: "ContactPage" },
          { title: "FAQPage", value: "FAQPage" },
        ],
      },
      initialValue: "WebSite",
    }),
  ],
});
