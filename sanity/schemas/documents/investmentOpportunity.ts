import { defineType, defineField } from "sanity";

export const investmentOpportunity = defineType({
  name: "investmentOpportunity",
  title: "Investment Opportunity",
  type: "document",
  
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "localeString",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "investmentCategory" }],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localeString",
    }),
    defineField({
      name: "minerals",
      title: "Minerals",
      type: "localeString",
    }),
    defineField({
      name: "stage",
      title: "Development Stage",
      type: "localeString",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "location.en",
      media: "image",
    },
  },
});
