const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value.trim();
    }
  });
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  const query = `*[
    _type in ["homePage", "aboutPage", "servicesPage", "teamPage", "whyEgyptPage", "whyNexusPage", "contactPage", "investmentPage", "newsPage", "page"]
    && defined(navigation) 
    && navigation.enabled == true
  ] | order(navigation.order asc) {
    _id,
    _type,
    title,
    slug,
    navigation
  }`;
  const docs = await client.fetch(query);
  console.log(JSON.stringify(docs, null, 2));
}

run().catch(console.error);
