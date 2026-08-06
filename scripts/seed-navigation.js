const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

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

async function run() {
  console.log("Seeding Explicit Navigation Tree...");

  // 1. Singletons (Already exist, just updating navigation)
  await client.patch('homePage').set({
    navigation: {
      enabled: true, showInNav: true, showInFooter: false, showInSitemap: true,
      navTitle: { en: "Home", fr: "Accueil" },
      navGroup: "main", order: 10
    }
  }).commit();
  console.log("Updated Home Page");

  await client.patch('aboutPage').set({
    navigation: {
      enabled: true, showInNav: true, showInFooter: true, showInSitemap: true,
      navTitle: { en: "About", fr: "À propos" },
      navGroup: "main", order: 20
    }
  }).commit();
  console.log("Updated About Page");

  // Create Corporate Parent Page
  const corporatePage = await client.createIfNotExists({
    _id: "page-corporate",
    _type: "page",
    title: { en: "Corporate", fr: "Entreprise" },
    slug: { en: { current: "corporate" }, fr: { current: "entreprise" } },
    navigation: {
      enabled: true, showInNav: true, showInFooter: false, showInSitemap: true,
      navTitle: { en: "Corporate", fr: "Entreprise" },
      navGroup: "main", order: 30
    },
    pageBuilder: [{
      _type: "heroBlock",
      title: { en: "Corporate Governance", fr: "Gouvernance d'Entreprise" },
      subtitle: { en: "Upholding the highest standards of integrity.", fr: "Maintien des normes d'intégrité les plus strictes." },
    }]
  });
  console.log("Created Corporate Page");

  await client.patch('servicesPage').set({
    navigation: {
      enabled: true, showInNav: true, showInFooter: true, showInSitemap: true,
      navTitle: { en: "Services", fr: "Services" },
      navGroup: "main", order: 40
    }
  }).commit();
  console.log("Updated Services Page");

  await client.patch('whyEgyptPage').set({
    navigation: {
      enabled: true, showInNav: true, showInFooter: false, showInSitemap: true,
      navTitle: { en: "Why Egypt", fr: "Pourquoi l'Égypte" },
      navGroup: "main", order: 50
    }
  }).commit();
  console.log("Updated Why Egypt Page");

  await client.createIfNotExists({
    _id: "newsPage",
    _type: "newsPage",
    title: { en: "News", fr: "Actualités" },
    navigation: {
      enabled: true, showInNav: true, showInFooter: true, showInSitemap: true,
      navTitle: { en: "News", fr: "Actualités" },
      navGroup: "main", order: 60
    }
  });
  console.log("Created News Page");

  await client.patch('contactPage').set({
    navigation: {
      enabled: true, showInNav: true, showInFooter: true, showInSitemap: true,
      navTitle: { en: "Contact Us", fr: "Contactez-nous" },
      navGroup: "main", order: 70
    }
  }).commit();
  console.log("Updated Contact Page");

  await client.patch('investmentPage').set({
    navigation: {
      enabled: false, showInNav: true, showInFooter: false, showInSitemap: false,
      navTitle: { en: "Investment Opportunities", fr: "Opportunités d'Investissement" },
      navGroup: "main", order: 80
    }
  }).commit();
  console.log("Updated Investment Page (Disabled)");

  // --- About Dropdown Children ---
  const aboutChildren = [
    { id: "page-company-overview", title: "Company Overview", frTitle: "Aperçu de l'Entreprise", slug: "company-overview", order: 10 },
    { id: "page-vision", title: "Vision", frTitle: "Vision", slug: "vision", order: 20 },
    { id: "page-mission", title: "Mission", frTitle: "Mission", slug: "mission", order: 30 },
    { id: "page-core-values", title: "Core Values", frTitle: "Valeurs Fondamentales", slug: "core-values", order: 40 },
    { id: "page-why-nexus", title: "Why Nexus", frTitle: "Pourquoi Nexus", slug: "why-nexus", order: 50 },
  ];

  for (const child of aboutChildren) {
    await client.createIfNotExists({
      _id: child.id,
      _type: "page",
      title: { en: child.title, fr: child.frTitle },
      slug: { en: { current: child.slug }, fr: { current: child.slug } },
      navigation: {
        enabled: true, showInNav: true, showInFooter: false, showInSitemap: true,
        navTitle: { en: child.title, fr: child.frTitle },
        navGroup: "dropdown", order: child.order,
        parent: { _type: "reference", _ref: "aboutPage" }
      },
      pageBuilder: [{
        _type: "heroBlock",
        title: { en: child.title, fr: child.frTitle },
        subtitle: { en: "Mining and Resource Development", fr: "Développement Minier et Ressources" },
      }]
    });
    console.log(`Created ${child.title}`);
  }

  // --- Corporate Dropdown Children ---
  await client.patch('teamPage').set({
    navigation: {
      enabled: true, showInNav: true, showInFooter: false, showInSitemap: true,
      navTitle: { en: "Leadership Team", fr: "Équipe Dirigeante" },
      navGroup: "dropdown", order: 10,
      parent: { _type: "reference", _ref: corporatePage._id }
    }
  }).commit();
  console.log("Updated Leadership Team");

  const corpChildren = [
    { id: "page-advisory-board", title: "Advisory Board", frTitle: "Comité Consultatif", slug: "advisory-board", order: 20, enabled: true },
    { id: "page-governance", title: "Governance", frTitle: "Gouvernance", slug: "governance", order: 30, enabled: false },
    { id: "page-careers", title: "Careers", frTitle: "Carrières", slug: "careers", order: 40, enabled: false },
  ];

  for (const child of corpChildren) {
    await client.createIfNotExists({
      _id: child.id,
      _type: "page",
      title: { en: child.title, fr: child.frTitle },
      slug: { en: { current: child.slug }, fr: { current: child.slug } },
      navigation: {
        enabled: child.enabled, showInNav: true, showInFooter: false, showInSitemap: child.enabled,
        navTitle: { en: child.title, fr: child.frTitle },
        navGroup: "dropdown", order: child.order,
        parent: { _type: "reference", _ref: corporatePage._id }
      },
      pageBuilder: [{
        _type: "heroBlock",
        title: { en: child.title, fr: child.frTitle },
        subtitle: { en: "Corporate details.", fr: "Détails de l'entreprise." },
      }]
    });
    console.log(`Created ${child.title} (Enabled: ${child.enabled})`);
  }

  console.log("Successfully seeded explicit navigation tree!");
}

run().catch(console.error);
