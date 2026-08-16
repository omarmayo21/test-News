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
          .id("root")
          .title("NEXUS CONTROL CENTER")
          .items([
            // 1. GLOBAL SETTINGS
            S.listItem()
              .id("global-site-settings")
              .title("Global Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .id("global-theme-settings")
              .title("Theme & Branding")
              .child(S.document().schemaType("themeSettings").documentId("themeSettings")),
            S.divider(),

            // 2. THE 7 CANONICAL WEBSITE PAGES
            S.listItem()
              .id("page-singleton-home")
              .title("Homepage")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .id("page-singleton-about")
              .title("About")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.listItem()
              .id("page-singleton-corporate")
              .title("Corporate")
              .child(S.document().schemaType("teamPage").documentId("teamPage")),
            S.listItem()
              .id("page-singleton-why-egypt")
              .title("Why Egypt")
              .child(S.document().schemaType("whyEgyptPage").documentId("whyEgyptPage")),
            S.listItem()
              .id("page-singleton-why-nexus")
              .title("Why Nexus")
              .child(S.document().schemaType("whyNexusPage").documentId("whyNexusPage")),
            S.listItem()
              .id("page-singleton-news")
              .title("News")
              .child(S.document().schemaType("newsPage").documentId("newsPage")),
            S.listItem()
              .id("page-singleton-contact")
              .title("Contact")
              .child(S.document().schemaType("contactPage").documentId("contactPage")),
            S.divider(),

            // 3. NAVIGATION & FOOTER
            S.listItem()
              .id("nav-singleton-header")
              .title("Header Navigation")
              .child(S.document().schemaType("header").documentId("header")),
            S.listItem()
              .id("nav-singleton-footer")
              .title("Footer Section")
              .child(S.document().schemaType("footer").documentId("footer")),
            S.divider(),

            // 4. CONTENT COLLECTIONS
            S.listItem()
              .id("collection-news-articles")
              .title("News Articles")
              .schemaType("news")
              .child(S.documentTypeList("news").title("News Articles")),
            S.listItem()
              .id("collection-news-categories")
              .title("News Categories")
              .schemaType("newsCategory")
              .child(S.documentTypeList("newsCategory").title("News Categories")),
            S.listItem()
              .id("collection-authors-team")
              .title("Authors & Team")
              .schemaType("author")
              .child(S.documentTypeList("author").title("Authors & Team")),
            S.listItem()
              .id("collection-media-library")
              .title("Media & Documents Library")
              .schemaType("mediaAsset")
              .child(S.documentTypeList("mediaAsset").title("Media & Documents Library")),
            S.divider(),

            // 5. FORMS
            S.listItem()
              .id("collection-form-submissions")
              .title("Form Submissions")
              .schemaType("formSubmission")
              .child(S.documentTypeList("formSubmission").title("Form Submissions")),
            S.divider(),

            // 6. LEGAL
            S.listItem()
              .id("collection-legal-pages")
              .title("Legal Pages")
              .schemaType("legalPage")
              .child(S.documentTypeList("legalPage").title("Legal Pages")),
            S.divider(),

            // 7. FUTURE / DISABLED CONTENT
            S.listItem()
              .id("group-future-disabled")
              .title("FUTURE / DISABLED")
              .child(
                S.list()
                  .id("future-disabled-list")
                  .title("Future & Disabled Content")
                  .items([
                    S.listItem()
                      .id("future-investment-opportunities")
                      .title("Investment Opportunities")
                      .schemaType("investmentOpportunity")
                      .child(S.documentTypeList("investmentOpportunity").title("Investment Opportunities")),
                    S.listItem()
                      .id("future-investment-categories")
                      .title("Investment Categories")
                      .schemaType("investmentCategory")
                      .child(S.documentTypeList("investmentCategory").title("Investment Categories")),
                    S.listItem()
                      .id("future-careers-page")
                      .title("Careers (Disabled Page)")
                      .child(S.document().schemaType("page").documentId("page-careers")),
                    S.listItem()
                      .id("future-governance-page")
                      .title("Governance (Disabled Page)")
                      .child(S.document().schemaType("page").documentId("page-governance")),
                    S.listItem()
                      .id("future-dynamic-pages")
                      .title("All Dynamic Pages")
                      .schemaType("page")
                      .child(S.documentTypeList("page").title("All Dynamic Pages")),
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
