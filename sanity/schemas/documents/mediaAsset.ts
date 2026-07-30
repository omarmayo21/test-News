import { defineType, defineField } from "sanity";

export const mediaAsset = defineType({
  name: "mediaAsset",
  title: "Media & Document Library",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Asset Title / Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "assetType",
      title: "Asset Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video File / Stream", value: "video" },
          { title: "PDF Report / Document", value: "pdf" },
          { title: "Spreadsheet / Archive", value: "document" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageFile",
      title: "Image File",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.assetType !== "image",
    }),
    defineField({
      name: "file",
      title: "Document / Video File",
      type: "file",
      hidden: ({ parent }) => parent?.assetType === "image",
    }),
    defineField({
      name: "externalUrl",
      title: "External Video / Embed Link (YouTube/Vimeo)",
      type: "url",
      hidden: ({ parent }) => parent?.assetType !== "video",
    }),
    defineField({
      name: "description",
      title: "Description / Caption",
      type: "localeText",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "assetType",
      media: "imageFile",
    },
  },
});
