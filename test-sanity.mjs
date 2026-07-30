import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lfr2gva9",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
});

async function run() {
  const data = await client.fetch(
    `*[_type == "homePage"][0]{
      pageBuilder[]{
        _type == "heroBlock" => { backgroundImage },
        _type == "statsBlock" => { sideImage }
      }
    }`
  );
  
  console.log(JSON.stringify(data, null, 2));
}

run().catch(console.error);
