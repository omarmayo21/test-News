import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8zpx9v0m";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "nexus-studio",
  title: "Nexus CMS Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Nexus Control Center")
          .items([
            S.listItem()
              .title("Global Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Theme & Branding")
              .child(S.document().schemaType("themeSettings").documentId("themeSettings")),
            S.listItem()
              .title("Header Navigation")
              .child(S.document().schemaType("header").documentId("header")),
            S.listItem()
              .title("Footer Section")
              .child(S.document().schemaType("footer").documentId("footer")),
            S.divider(),
            S.listItem()
              .title("Homepage")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("About Page")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.listItem()
              .title("Services Page")
              .child(S.document().schemaType("servicesPage").documentId("servicesPage")),
            S.listItem()
              .title("Consultant Team Page")
              .child(S.document().schemaType("teamPage").documentId("teamPage")),
            S.listItem()
              .title("Why Egypt Page")
              .child(S.document().schemaType("whyEgyptPage").documentId("whyEgyptPage")),
            S.listItem()
              .title("Investment Page")
              .child(S.document().schemaType("investmentPage").documentId("investmentPage")),
            S.listItem()
              .title("Contact Page")
              .child(S.document().schemaType("contactPage").documentId("contactPage")),
            S.divider(),
            S.documentTypeListItem("investmentOpportunity").title("Investment Opportunities"),
            S.documentTypeListItem("investmentCategory").title("Investment Categories"),
            S.documentTypeListItem("page").title("Dynamic Pages"),
            S.documentTypeListItem("news").title("News Articles"),
            S.documentTypeListItem("newsCategory").title("News Categories"),
            S.documentTypeListItem("author").title("Authors & Team"),
            S.divider(),
            S.documentTypeListItem("formSubmission").title("Form Submissions"),
            S.documentTypeListItem("legalPage").title("Legal Pages"),
            S.documentTypeListItem("mediaAsset").title("Media & Documents Library"),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
