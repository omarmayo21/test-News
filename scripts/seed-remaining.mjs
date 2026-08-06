import { createClient } from 'next-sanity';
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
  console.log("Seeding remaining singletons and content...");

  // Seed HomePage
  await client.createIfNotExists({ _id: 'homePage', _type: 'homePage' });
  await client.patch('homePage').set({
    title: "Homepage CMS",
    pageBuilder: [
      {
        _key: "hero-1",
        _type: "heroBlock",
        headline: { en: "Engineering the Future of African Mining", fr: "L'ingénierie de l'Avenir de l'Exploitation Minière Africaine" },
        subtitle: { en: "Delivering structural excellence and strategic resource management through precision engineering in the Arabian-Nubian shield.", fr: "L'excellence structurelle et la gestion stratégique des ressources grâce à l'ingénierie de précision dans le bouclier arabo-nubien." },
        ctaLabel: { en: "Explore Opportunities", fr: "Explorer les Opportunités" },
        ctaLink: "/en/investment"
      },
      {
        _key: "cap-1",
        _type: "capabilitiesBlock",
        sectionTitle: { en: "Core Capabilities", fr: "Capacités Principales" },
        sectionDescription: { en: "We leverage advanced geospatial modeling and metallurgical science.", fr: "Nous utilisons la modélisation géospatiale avancée." },
        cards: [
          { _key: "c1", icon: "architecture", title: { en: "Exploration" }, description: { en: "Advanced geophysics mapping." } },
          { _key: "c2", icon: "engineering", title: { en: "Extraction" }, description: { en: "Sustainable operational protocols." } },
          { _key: "c3", icon: "logistics", title: { en: "Processing" }, description: { en: "High-yield metallurgical refinement." } }
        ]
      },
      {
        _key: "stats-1",
        _type: "statsBlock",
        title: { en: "By The Numbers", fr: "En Chiffres" },
        subtitle: { en: "A proven track record of safe and productive mining operations.", fr: "Une expérience prouvée d'opérations minières sûres." },
        stats: [
          { _key: "s1", number: "3+", label: { en: "Active Concessions" } },
          { _key: "s2", number: "1.2M", label: { en: "Ounces Identified" } },
          { _key: "s3", number: "99%", label: { en: "Safety Compliance" } }
        ]
      },
      {
        _key: "cta-1",
        _type: "ctaBlock",
        title: { en: "Partner with Nexus", fr: "Associez-vous à Nexus" },
        buttonText: { en: "Contact Us", fr: "Contactez-Nous" },
        buttonLink: "/en/contact"
      }
    ]
  }).commit();
  console.log("HomePage seeded.");

  // Seed AboutPage
  await client.createIfNotExists({ _id: 'aboutPage', _type: 'aboutPage' });
  await client.patch('aboutPage').set({
    title: { en: "About Nexus", fr: "À propos de Nexus" },
    subtitle: { en: "Building a sustainable legacy.", fr: "Construire un héritage durable." },
    pageBuilder: [
      {
        _key: "hero-about",
        _type: "heroBlock",
        headline: { en: "Our Story", fr: "Notre Histoire" },
        subtitle: { en: "Founded by engineers, driven by excellence.", fr: "Fondée par des ingénieurs, guidée par l'excellence." }
      }
    ]
  }).commit();
  console.log("AboutPage seeded.");

  // Seed TeamPage
  const author1 = await client.createIfNotExists({
    _id: "author-ceo",
    _type: "author",
    name: "Tarek Al-Sayed",
    role: "Chief Executive Officer",
  });
  
  await client.createIfNotExists({ _id: 'teamPage', _type: 'teamPage' });
  await client.patch('teamPage').set({
    title: { en: "Leadership Team", fr: "Équipe Dirigeante" },
    subtitle: { en: "Guided by decades of experience.", fr: "Guidés par des décennies d'expérience." },
    teamMembers: [
      { _key: "t1", _type: "reference", _ref: author1._id }
    ]
  }).commit();
  console.log("TeamPage seeded.");

  // Seed Investment Categories and Opportunities
  const cat = await client.createIfNotExists({
    _id: "inv-cat-gold",
    _type: "investmentCategory",
    title: { en: "Gold Assets", fr: "Actifs Aurifères" },
    slug: { en: { current: "gold-assets" }, fr: { current: "actifs-auriferes" } }
  });

  await client.createIfNotExists({
    _id: "inv-opp-1",
    _type: "investmentOpportunity",
    title: { en: "Eastern Desert Concession Alpha", fr: "Concession Alpha du Désert Oriental" },
    location: { en: "Red Sea Governorate", fr: "Gouvernorat de la Mer Rouge" },
    minerals: { en: "Gold, Copper", fr: "Or, Cuivre" },
    stage: { en: "Advanced Exploration", fr: "Exploration Avancée" },
    description: { en: "A highly prospective 250km2 land package.", fr: "Un terrain hautement prospectif de 250km2." },
    category: { _type: "reference", _ref: cat._id }
  });
  console.log("Investment Opportunities seeded.");

  console.log("Successfully seeded all remaining singletons and documents.");
}

run().catch(console.error);
