import { createClient } from "next-sanity";

const projectId = "28z8ff6f";
const dataset = "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

async function main() {
  await client.patch("whyEgyptPage").set({
    ctaButtonLabel: {
      en: "Why Nexus →",
      fr: "Pourquoi Nexus →",
    },
  }).commit();
  console.log("Updated Why Egypt CTA button label.");
}
main().catch(console.error);
