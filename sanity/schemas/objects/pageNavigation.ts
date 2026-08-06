import { defineType, defineField } from "sanity";

export const pageNavigation = defineType({
  name: "pageNavigation",
  title: "Navigation & Page Settings",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Page Enabled",
      type: "boolean",
      description: "If disabled, the page will return a 404 and disappear from all menus.",
      initialValue: true,
    }),
    defineField({
      name: "showInNav",
      title: "Show in Header Navigation",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showInFooter",
      title: "Show in Footer Navigation",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "showInSitemap",
      title: "Include in XML Sitemap",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "navTitle",
      title: "Navigation Title",
      type: "localeString",
      description: "Shorter title specifically for the menu (e.g. 'About Us')",
    }),
    defineField({
      name: "navGroup",
      title: "Navigation Group",
      type: "string",
      options: {
        list: [
          { title: "Main Menu (Top Level)", value: "main" },
          { title: "Dropdown Menu (Child)", value: "dropdown" },
          { title: "Hidden (Accessible but not in menus)", value: "hidden" },
        ],
      },
      initialValue: "main",
    }),
    defineField({
      name: "parent",
      title: "Parent Page",
      description: "Select a parent if this belongs in a dropdown.",
      type: "reference",
      to: [
        { type: "homePage" },
        { type: "aboutPage" },
        { type: "servicesPage" },
        { type: "teamPage" },
        { type: "whyEgyptPage" },
        { type: "contactPage" },
        { type: "investmentPage" },
        { type: "newsPage" },
        { type: "page" },
      ],
      hidden: ({ parent }) => parent?.navGroup !== "dropdown",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first (e.g. 10, 20, 30).",
      initialValue: 50,
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in New Tab",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "externalUrl",
      title: "External URL Redirect",
      type: "string",
      description: "If populated, clicking this page in the navigation redirects externally.",
    }),
  ],
});
