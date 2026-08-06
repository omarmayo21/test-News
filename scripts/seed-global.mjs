import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

async function run() {
  console.log("Seeding Global Settings...");

  // Site Settings
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: { en: "Nexus Resources", fr: "Ressources Nexus" },
    siteDescription: { 
      en: "Engineering the future of mining in the Arabian-Nubian shield.", 
      fr: "L'ingénierie de l'avenir de l'exploitation minière dans le bouclier arabo-nubien." 
    },
    siteUrl: "https://nexus-resources.com",
    enableCookieConsent: true
  });

  // Theme Settings
  await client.createOrReplace({
    _id: "themeSettings",
    _type: "themeSettings",
    primaryColor: { hex: "#0b162c" },
    accentGoldColor: { hex: "#d4af37" },
    secondaryTextColor: { hex: "#6b7280" },
    socialLinks: [
      { _key: "s1", platform: "LinkedIn", url: "https://linkedin.com/company/nexus" },
      { _key: "s2", platform: "Twitter", url: "https://twitter.com/nexus" }
    ]
  });

  // Header Settings
  await client.createOrReplace({
    _id: "header",
    _type: "header",
    linkedinUrl: "https://linkedin.com/company/nexus",
    enableLanguageSwitcher: true,
    ctaButton: {
      label: { en: "Contact Us", fr: "Contactez-Nous" },
      url: "/en/contact"
    }
  });

  // Footer Settings
  await client.createOrReplace({
    _id: "footer",
    _type: "footer",
    aboutText: {
      en: "Nexus Resources is a premier structural engineering and geological firm operating in the Arabian-Nubian shield.",
      fr: "Nexus Resources est une société d'ingénierie de premier plan."
    },
    copyright: {
      en: "© 2026 Nexus Resources. All rights reserved.",
      fr: "© 2026 Ressources Nexus. Tous droits réservés."
    },
    offices: [
      { _key: "f1", title: { en: "Cairo HQ" } },
      { _key: "f2", title: { en: "London Advisory" } }
    ],
    resourceLinks: [
      { _key: "r1", label: { en: "Sitemap" }, path: "/en/sitemap" },
      { _key: "r2", label: { en: "News & Insights" }, path: "/en/news" }
    ],
    complianceLinks: [
      { _key: "c1", label: { en: "Privacy Policy" }, path: "/en/legal/privacy-policy" },
      { _key: "c2", label: { en: "Terms of Service" }, path: "/en/legal/terms" }
    ]
  });

  console.log("Successfully seeded Global Settings.");
}

run().catch(console.error);
