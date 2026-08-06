import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author / Executive",
  type: "document",
  
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role / Position",
      type: "localeString",
    }),
    defineField({
      name: "avatar",
      title: "Avatar Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "localeText",
    }),
  ],
});
