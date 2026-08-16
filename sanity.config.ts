import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "28z8ff6f";
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
          .title("NEXUS CONTROL CENTER")
          .items([
            // 1. GLOBAL SETTINGS
            S.listItem()
              .title("Global Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Theme & Branding")
              .child(S.document().schemaType("themeSettings").documentId("themeSettings")),
            S.divider(),

            // 2. THE 7 CANONICAL WEBSITE PAGES
            S.listItem()
              .title("Homepage")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("About")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.listItem()
              .title("Corporate")
              .child(S.document().schemaType("teamPage").documentId("teamPage")),
            S.listItem()
              .title("Why Egypt")
              .child(S.document().schemaType("whyEgyptPage").documentId("whyEgyptPage")),
            S.listItem()
              .title("Why Nexus")
              .child(S.document().schemaType("whyNexusPage").documentId("whyNexusPage")),
            S.listItem()
              .title("News")
              .child(S.document().schemaType("newsPage").documentId("newsPage")),
            S.listItem()
              .title("Contact")
              .child(S.document().schemaType("contactPage").documentId("contactPage")),
            S.divider(),

            // 3. NAVIGATION & FOOTER
            S.listItem()
              .title("Header Navigation")
              .child(S.document().schemaType("header").documentId("header")),
            S.listItem()
              .title("Footer Section")
              .child(S.document().schemaType("footer").documentId("footer")),
            S.divider(),

            // 4. CONTENT COLLECTIONS
            S.documentTypeListItem("news").title("News Articles"),
            S.documentTypeListItem("newsCategory").title("News Categories"),
            S.documentTypeListItem("author").title("Authors & Team"),
            S.documentTypeListItem("mediaAsset").title("Media & Documents Library"),
            S.divider(),

            // 5. FORMS
            S.documentTypeListItem("formSubmission").title("Form Submissions"),
            S.divider(),

            // 6. LEGAL
            S.documentTypeListItem("legalPage").title("Legal Pages"),
            S.divider(),

            // 7. FUTURE / DISABLED CONTENT
            S.listItem()
              .title("FUTURE / DISABLED")
              .child(
                S.list()
                  .title("Future & Disabled Content")
                  .items([
                    S.documentTypeListItem("investmentOpportunity").title("Investment Opportunities"),
                    S.documentTypeListItem("investmentCategory").title("Investment Categories"),
                    S.listItem()
                      .title("Careers (Disabled Page)")
                      .child(S.document().schemaType("page").documentId("page-careers")),
                    S.listItem()
                      .title("Governance (Disabled Page)")
                      .child(S.document().schemaType("page").documentId("page-governance")),
                    S.documentTypeListItem("page").title("All Dynamic Pages"),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
