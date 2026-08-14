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

async function fixNav() {
  const pages = ['homePage', 'aboutPage', 'teamPage', 'whyEgyptPage', 'whyNexusPage', 'newsPage', 'contactPage'];

  for (const p of pages) {
    let navTitle = p.replace('Page', '');
    if (p === 'teamPage') navTitle = 'Corporate';
    if (p === 'whyEgyptPage') navTitle = 'Why Egypt';
    if (p === 'whyNexusPage') navTitle = 'Why Nexus';
    if (p === 'homePage') navTitle = 'Home';
    if (p === 'aboutPage') navTitle = 'About Us';
    if (p === 'newsPage') navTitle = 'News';
    if (p === 'contactPage') navTitle = 'Contact';

    await client.patch(p).set({
      navigation: {
        enabled: true,
        showInNav: true,
        navTitle: { en: navTitle, fr: navTitle }
      }
    }).commit();
  }

  // Delete obsolete documents from navigation
  const toDelete = ['servicesPage', 'investmentPage', 'advisory-board', 'services'];
  for (const d of toDelete) {
    try {
      await client.patch(d).set({ navigation: { showInNav: false } }).commit();
    } catch (e) {
      // ignore
    }
  }

  console.log('Navigation fixed.');
}
fixNav().catch(console.error);
