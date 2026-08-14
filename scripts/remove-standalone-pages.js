const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: '28z8ff6f',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  // Delete the old generic pages if they exist
  const pages = await client.fetch(`*[_type == "page" && slug.en.current in ["team", "advisory-board", "services"]]`);
  for (const page of pages) {
    console.log("Deleting page:", page._id, page.slug.en.current);
    await client.delete(page._id);
  }

  // Also check if teamPage, servicesPage have navigation enabled and disable it if they shouldn't be in main nav?
  // Wait, teamPage SHOULD be in main nav as "CORPORATE"!
  // But wait, the user said "Remove /en/team and /en/advisory-board navigation links."
  // Maybe teamPage's slug is "corporate" now?
  // Let's update teamPage
  await client.patch('teamPage').set({
    slug: { en: { current: 'corporate' }, fr: { current: 'corporate' } },
    navigation: {
      enabled: true,
      showInNav: true,
      showInFooter: true,
      showInSitemap: true,
      navTitle: { en: 'CORPORATE' },
      order: 3
    }
  }).commit();
  console.log("Updated teamPage navigation and slug to corporate.");

  // For servicesPage, it should be removed from nav or deleted.
  await client.patch('servicesPage').set({
    navigation: {
      enabled: false,
      showInNav: false,
      showInFooter: false,
      showInSitemap: false,
      navTitle: { en: 'Services' },
      order: 99
    }
  }).commit();
  console.log("Disabled servicesPage navigation.");

  // For whyNexusPage
  await client.patch('whyNexusPage').set({
    navigation: {
      enabled: true,
      showInNav: true,
      showInFooter: true,
      showInSitemap: true,
      navTitle: { en: 'WHY NEXUS' },
      order: 5
    }
  }).commit();
  
  // News page
  await client.patch('newsPage').set({
    navigation: {
      enabled: true,
      showInNav: true,
      showInFooter: true,
      showInSitemap: true,
      navTitle: { en: 'NEWS' },
      order: 6
    }
  }).commit();
}

run().catch(console.error);
