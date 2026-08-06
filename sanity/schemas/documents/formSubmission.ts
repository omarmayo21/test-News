import { defineType, defineField } from "sanity";

export const formSubmission = defineType({
  name: "formSubmission",
  title: "Form Submissions",
  type: "document",
  
  fields: [
    defineField({
      name: "formType",
      title: "Form Type",
      type: "string",
      options: {
        list: [
          { title: "Contact Form", value: "contact" },
          { title: "Newsletter Signup", value: "newsletter" },
          { title: "Quote Request", value: "quote" },
          { title: "Careers Application", value: "career" },
          { title: "Custom Form", value: "custom" },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message / Request Details",
      type: "text",
    }),
    defineField({
      name: "submittedAt",
      title: "Submission Timestamp",
      type: "datetime",
    }),
    defineField({
      name: "status",
      title: "Review Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Reviewed", value: "reviewed" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "rawData",
      title: "Raw Form Payload (JSON)",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "formType",
      email: "email",
    },
    prepare(selection) {
      const { title, subtitle, email } = selection;
      return {
        title: title || email || "Anonymous Submission",
        subtitle: `Form: ${subtitle || "general"}`,
      };
    },
  },
});
