import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8').split('\n');
  envConfig.forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  });
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function fetchPageHtml() {
  const res = await fetch('http://localhost:3000/en');
  return res.text();
}

async function triggerWebhook() {
  const secret = process.env.SANITY_REVALIDATE_SECRET || "nexus-revalidate-secret-2026";
  const res = await fetch(`http://localhost:3000/api/revalidate?secret=${secret}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _type: 'homePage' })
  });
  return res.json();
}

async function run() {
  console.log("1. Fetching current Homepage HTML...");
  let html1 = await fetchPageHtml();
  const title1 = html1.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1].trim();
  console.log("Current H1 Title:", title1);

  const newTitle = "Updated Title " + Date.now();
  console.log("2. Updating Sanity HomePage title to:", newTitle);
  
  // We edit the heroBlock headline instead of title, because H1 comes from heroBlock
  await client.patch('homePage').set({
    'pageBuilder[0].headline.en': newTitle
  }).commit();
  console.log("Sanity updated.");

  console.log("3. Triggering webhook to purge cache...");
  const whRes = await triggerWebhook();
  console.log("Webhook response:", whRes);

  console.log("4. Fetching new Homepage HTML...");
  let html2 = await fetchPageHtml();
  const title2 = html2.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1].trim();
  console.log("New H1 Title:", title2);

  if (title1 !== title2 && title2 === newTitle) {
    console.log("SUCCESS: On-demand Revalidation verified working perfectly.");
  } else {
    console.log("FAILED: Cache was not purged or title did not update.");
  }

  // Restore
  await client.patch('homePage').set({
    'pageBuilder[0].headline.en': "Engineering the Future of African Mining"
  }).commit();
  
  await triggerWebhook();
}

run().catch(console.error);
