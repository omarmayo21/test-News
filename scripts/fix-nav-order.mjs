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
  await client.patch("teamPage").set({
    "navigation.order": 30
  }).commit();
  console.log("Updated Corporate navigation order to 30.");
}
main().catch(console.error);
