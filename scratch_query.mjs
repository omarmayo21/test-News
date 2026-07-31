import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function run() {
  const data = await client.fetch(`*[_type == "news"]{ _id, title, publishDate, body }`);
  console.log(JSON.stringify(data, null, 2));
}

run();
