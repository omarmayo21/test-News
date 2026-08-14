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
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function cleanupAndOrderNav() {
  console.log('Starting navigation cleanup...');

  // 1. Delete obsolete documents
  const toDelete = [
    'page-advisory-board',
    'page-corporate',
    'page-why-nexus',
    'page-services',
    'page-investment',
    'servicesPage',
    'investmentPage'
  ];

  for (const id of toDelete) {
    try {
      await client.delete(id);
      console.log(`Deleted obsolete document: ${id}`);
    } catch (err) {
      console.log(`Could not delete ${id} (may not exist)`);
    }
  }

  // 2. Set exact nav titles and ordering
  const navStructure = [
    { id: 'homePage', title: 'HOME', order: 10 },
    { id: 'aboutPage', title: 'ABOUT', order: 20 },
    { id: 'teamPage', title: 'CORPORATE', order: 30 },
    { id: 'whyEgyptPage', title: 'WHY EGYPT', order: 40 },
    { id: 'whyNexusPage', title: 'WHY NEXUS', order: 50 },
    { id: 'newsPage', title: 'NEWS', order: 60 },
    { id: 'contactPage', title: 'CONTACT', order: 70 },
  ];

  for (const item of navStructure) {
    await client.patch(item.id).set({
      navigation: {
        enabled: true,
        showInNav: true,
        order: item.order,
        navTitle: { en: item.title, fr: item.title }
      }
    }).commit();
    console.log(`Updated ${item.id} -> order: ${item.order}, title: ${item.title}`);
  }

  console.log('Cleanup and ordering complete.');
}

cleanupAndOrderNav().catch(console.error);
