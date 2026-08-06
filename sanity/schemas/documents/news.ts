import { defineType, defineField } from "sanity";

export const news = defineType({
  name: "news",
  title: "News Articles & Insights",
  type: "document",
  
  fields: [
    defineField({
      name: "title",
      title: "Article Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Article Slug",
      type: "localeSlug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date & Time",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Featured Article on Homepage & News Top",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "newsCategory" }],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "localeString", title: "Alt Text" },
        { name: "caption", type: "localeString", title: "Caption" },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Article Image Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "localeString", title: "Alt Text" }],
        },
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Short Summary / Excerpt",
      type: "localeText",
    }),
    defineField({
      name: "body",
      title: "Rich Text Body (English)",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
    defineField({
      name: "bodyFr",
      title: "Rich Text Body (French)",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "relatedNews",
      title: "Related Articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "news" }] }],
    }),
    defineField({
      name: "seo",
      title: "SEO Configuration",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "publishDate",
      media: "coverImage",
    },
  },
});
