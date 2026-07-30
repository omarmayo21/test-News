const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Simple .env parser
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

async function seed() {
  console.log(`Starting Sanity demo content seeding for Project: ${projectId}, Dataset: ${dataset}...`);

  // 1. Site Settings Singleton
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: {
      en: 'Nexus Resources - Engineering the Future of Egyptian Mining',
      fr: 'Nexus Resources - L\'Ingénierie du Futur du Secteur Minier Égyptien'
    },
    siteDescription: {
      en: 'Delivering structural excellence and strategic resource management through precision engineering across the Arabian-Nubian shield.',
      fr: 'Offrir l\'excellence structurelle et la gestion stratégique des ressources dans le bouclier arabo-nubien.'
    },
    siteUrl: 'https://nexus-resources.com',
    gaMeasurementId: 'G-NEXUS2026',
    gtmContainerId: 'GTM-NEXUS01',
    metaPixelId: '123456789012345',
    googleSearchConsoleVerification: 'google-site-verification-nexus-2026',
    enableCookieConsent: true,
    enableConsentModeV2: true,
  });
  console.log('✔ Site Settings created/updated.');

  // 2. Authors & Consultant Team (10 Team Members)
  const authors = [
    { id: 'author-1', name: 'Dr. Tarek Al-Sayed', role: 'Principal Geological Engineer', bio: 'Over 25 years leading subsurface deposit modeling across North Africa and the Arabian-Nubian shield.' },
    { id: 'author-2', name: 'Sarah Jenkins', role: 'Chief Structural Architect', bio: 'Specialist in heavy industrial processing plant design and slope stability in arid desert conditions.' },
    { id: 'author-3', name: 'Eng. Mahmoud Hassan', role: 'VP of Mining Operations', bio: 'Former advisor to the Egyptian Ministry of Petroleum & Mineral Resources.' },
    { id: 'author-4', name: 'Elena Rostova', role: 'Head of ESG & Environmental Rehabilitation', bio: 'Leading solar camp integration and water reclamation projects across Eastern Desert sites.' },
    { id: 'author-5', name: 'David Sterling', role: 'Senior Geostatistician', bio: 'Expert in NI 43-101 and JORC compliant resource estimation and block modeling.' },
    { id: 'author-6', name: 'Dr. Karim Mansour', role: 'Chief Geophysicist', bio: 'Specializing in airborne electromagnetic surveys and deep shear zone exploration.' },
    { id: 'author-7', name: 'Claire Dubois', role: 'Director of Investor Relations', bio: 'Managing international joint ventures and institutional capital allocation.' },
    { id: 'author-8', name: 'Amr El-Ghandour', role: 'Legal & Regulatory Compliance Lead', bio: 'Specializing in Egyptian Mining Law Mineral Concession agreements and Ministry licensing.' },
    { id: 'author-9', name: 'Hannah Vance', role: 'Lead Hydrogeological Consultant', bio: 'Overseeing groundwater management and aquifer protection in remote mining camps.' },
    { id: 'author-10', name: 'Tariq Benali', role: 'Chief Logistics & Fleet Telemetry Officer', bio: 'Optimizing heavy haulage automation and remote camp supply chain networks.' },
  ];

  for (const a of authors) {
    await client.createOrReplace({
      _id: a.id,
      _type: 'author',
      name: a.name,
      role: a.role,
      bio: a.bio,
    });
  }
  console.log('✔ 10 Consultant Team Members created.');

  // 3. News Categories (5 Categories)
  const categories = [
    { id: 'cat-geology', title: { en: 'Geology & Exploration', fr: 'Géologie et Exploration' }, slug: 'geology' },
    { id: 'cat-infrastructure', title: { en: 'Infrastructure & Engineering', fr: 'Infrastructure et Ingénierie' }, slug: 'infrastructure' },
    { id: 'cat-concessions', title: { en: 'Concessions & Licensing', fr: 'Concessions et Permis' }, slug: 'concessions' },
    { id: 'cat-esg', title: { en: 'ESG & Sustainability', fr: 'RSE et Durabilité' }, slug: 'esg-sustainability' },
    { id: 'cat-finance', title: { en: 'Financials & Joint Ventures', fr: 'Finances et Coentreprises' }, slug: 'financials' },
  ];

  for (const c of categories) {
    await client.createOrReplace({
      _id: c.id,
      _type: 'newsCategory',
      title: c.title,
      slug: { _type: 'localeSlug', en: { current: c.slug }, fr: { current: c.slug } },
    });
  }
  console.log('✔ 5 News Categories created.');

  // 4. News Articles (16 Articles)
  const newsArticles = [
    { id: 'news-1', titleEn: 'High-Grade Gold Intersections Confirmed at Sukari Extension Block', titleFr: 'Intersections d\'Or à Haute Teneur Confirmées au Bloc d\'Extension Sukari', catId: 'cat-geology', authorId: 'author-1', date: '2026-06-15' },
    { id: 'news-2', titleEn: 'Nexus Completes Solar Power Hybrid Integration for Eastern Desert Facility', titleFr: 'Nexus Achevée l\'Intégration Solaire Hybride au Désert Oriental', catId: 'cat-esg', authorId: 'author-4', date: '2026-05-28' },
    { id: 'news-3', titleEn: 'Bankable Feasibility Study Validates Wadi Ghadir Copper-Gold Porphyry Project', titleFr: 'L\'Étude de Faisabilité Valide le Projet Porphyrique Wadi Ghadir', catId: 'cat-finance', authorId: 'author-5', date: '2026-05-10' },
    { id: 'news-4', titleEn: 'New Concession Rights Awarded in Central Eastern Desert Region', titleFr: 'Nouveaux Droits de Concession Accordés dans la Région du Désert Oriental', catId: 'cat-concessions', authorId: 'author-8', date: '2026-04-20' },
    { id: 'news-5', titleEn: 'Advanced 3D Subsurface Seismic Survey Begins at Abu Marawat North', titleFr: 'Un Étude Sismique Subsurface 3D Commence à Abu Marawat Nord', catId: 'cat-geology', authorId: 'author-6', date: '2026-04-02' },
    { id: 'news-6', titleEn: 'Structural Foundation Engineering Completed for Main Processing Plant', titleFr: 'Ingénierie des Fondations Finalisée pour l\'Usine de Traitement Principal', catId: 'cat-infrastructure', authorId: 'author-2', date: '2026-03-18' },
    { id: 'news-7', titleEn: 'Zero Accident Benchmark Achieved Across All Operational Concessions', titleFr: 'Zéro Accident Atteint sur l\'Ensemble des Concessions Opérationnelles', catId: 'cat-infrastructure', authorId: 'author-3', date: '2026-03-01' },
    { id: 'news-8', titleEn: 'Nexus Publishes Annual Sustainability & Community Engagement Report', titleFr: 'Nexus Publie son Rapport Annuel sur le Développement Durable', catId: 'cat-esg', authorId: 'author-4', date: '2026-02-14' },
    { id: 'news-9', titleEn: 'Q1 Financial Results: Revenue Up 34% Driven by High-Grade Concentrates', titleFr: 'Résultats du T1: Chiffre d\'Affaires en Hausse de 34%', catId: 'cat-finance', authorId: 'author-7', date: '2026-01-30' },
    { id: 'news-10', titleEn: 'Deep Core Drilling Program Exceeds Initial Gold Reserve Expectations', titleFr: 'Le Programme de Forage Déchiffre de Nouveaux Gisements d\'Or', catId: 'cat-geology', authorId: 'author-1', date: '2026-01-12' },
    { id: 'news-11', titleEn: 'Hydrological Modeling Secures Water Recycling Efficiency of 92%', titleFr: 'La Modélisation Hydrologique Assure un Recyclage de l\'Eau de 92%', catId: 'cat-esg', authorId: 'author-9', date: '2025-12-20' },
    { id: 'news-12', titleEn: 'Autonomous Telemetry System Deployed for Heavy Haulage Fleet', titleFr: 'Système de Télémétrie Autonome Déployé pour la Flotte de Transport Heavy', catId: 'cat-infrastructure', authorId: 'author-10', date: '2025-12-05' },
    { id: 'news-13', titleEn: 'Joint Venture Agreement Signed with Global Strategic Resource Fund', titleFr: 'Accord de Coentreprise Signé avec un Fonds Stratégique International', catId: 'cat-finance', authorId: 'author-7', date: '2025-11-18' },
    { id: 'news-14', titleEn: 'Egyptian Ministry Approves Environmental Impact Assessment for Phase II', titleFr: 'Le Ministère de l\'Énergie Approuve l\'Évaluation d\'Impact Environnemental', catId: 'cat-concessions', authorId: 'author-8', date: '2025-11-02' },
    { id: 'news-15', titleEn: 'Geochemical Assay Results Indicate High-Purity Polymetallic Deposit', titleFr: 'Les Analyses Géochimiques Indiquent un Gisement Polymétallique Pur', catId: 'cat-geology', authorId: 'author-6', date: '2025-10-15' },
    { id: 'news-16', titleEn: 'Nexus Executive Delegation Presents at Cairo International Mining Forum', titleFr: 'La Délégation de Nexus Présente au Forum Minier International du Caire', catId: 'cat-concessions', authorId: 'author-3', date: '2025-10-01' },
  ];

  for (const n of newsArticles) {
    const slugEn = n.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slugFr = n.titleFr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await client.createOrReplace({
      _id: n.id,
      _type: 'news',
      title: { en: n.titleEn, fr: n.titleFr },
      slug: {
        _type: 'localeSlug',
        en: { current: slugEn },
        fr: { current: slugFr },
      },
      publishDate: n.date,
      featured: n.id === 'news-1' || n.id === 'news-3',
      excerpt: {
        en: `Comprehensive field report on ${n.titleEn.toLowerCase()} in the Arabian-Nubian shield.`,
        fr: `Rapport de terrain complet sur ${n.titleFr.toLowerCase()} dans le bouclier arabo-nubien.`
      },
      category: { _type: 'reference', _ref: n.catId },
      author: { _type: 'reference', _ref: n.authorId },
      tags: ['Mining', 'Egypt', 'Infrastructure', 'Engineering'],
    });
  }
  console.log('✔ 16 News Articles created.');

  // 5. Legal Pages (5 Policy Pages)
  const legalPages = [
    { id: 'legal-privacy', slug: 'privacy-policy', titleEn: 'Privacy Policy', titleFr: 'Politique de Confidentialité' },
    { id: 'legal-terms', slug: 'terms', titleEn: 'Terms of Service', titleFr: 'Conditions d\'Utilisation' },
    { id: 'legal-cookie', slug: 'cookie-policy', titleEn: 'Cookie Policy', titleFr: 'Politique de Cookies' },
    { id: 'legal-esg', slug: 'esg-policy', titleEn: 'ESG & Corporate Responsibility Policy', titleFr: 'Politique RSE et Responsabilité Sociale' },
    { id: 'legal-sustainability', slug: 'sustainability-policy', titleEn: 'Environmental & Sustainability Policy', titleFr: 'Politique Environnementale et de Durabilité' },
  ];

  for (const lp of legalPages) {
    await client.createOrReplace({
      _id: lp.id,
      _type: 'legalPage',
      title: { en: lp.titleEn, fr: lp.titleFr },
      slug: { _type: 'localeSlug', en: { current: lp.slug }, fr: { current: lp.slug } },
      lastUpdated: '2026-01-01',
    });
  }
  console.log('✔ 5 Legal & Compliance Pages created.');

  // 6. Sample Contact Form Submissions (5 Submissions)
  const sampleForms = [
    { id: 'form-sub-1', name: 'Alexandre Mercer', email: 'a.mercer@mineralfund.com', phone: '+44 20 7946 0912', company: 'Global Resource Partners', subject: 'Concession Investment Inquiry', message: 'We are requesting access to the Sukari Extension Block data room for pre-feasibility analysis.' },
    { id: 'form-sub-2', name: 'Dr. Ibrahim Hassan', email: 'i.hassan@cairouniversity.edu.eg', phone: '+20 100 123 4567', company: 'Cairo University Faculty of Science', subject: 'Geological Research Collaboration', message: 'Interested in joint geochemical sampling programs in the Central Eastern Desert.' },
    { id: 'form-sub-3', name: 'Marie Laurent', email: 'm.laurent@infrastructure-group.fr', phone: '+33 1 42 68 55 00', company: 'Vinci Mining Logistics', subject: 'Haulage Telemetry Partnership', message: 'Requesting technical meeting regarding remote camp infrastructure and power integration.' },
    { id: 'form-sub-4', name: 'John Peterson', email: 'j.peterson@miningjournal.com', phone: '+1 415 555 0199', company: 'International Mining Journal', subject: 'Press Interview Request', message: 'Requesting an interview with Dr. Tarek Al-Sayed regarding recent Eastern Desert gold discoveries.' },
    { id: 'form-sub-5', name: 'Youssef El-Shazly', email: 'youssef@redsea-energy.eg', phone: '+20 122 987 6543', company: 'Red Sea Clean Power Solutions', subject: 'Solar Power Offtake Agreement', message: 'Proposing 15MW solar PV facility installation for your remote processing plant.' },
  ];

  for (const fs of sampleForms) {
    await client.createOrReplace({
      _id: fs.id,
      _type: 'formSubmission',
      formType: 'contact',
      fullName: fs.name,
      email: fs.email,
      phone: fs.phone,
      company: fs.company,
      subject: fs.subject,
      message: fs.message,
      submittedAt: new Date().toISOString(),
      status: 'new',
    });
  }
  console.log('✔ 5 Sample Contact Form Submissions created.');

  console.log('\n🎉 Sanity CMS demo content seeding completed successfully!');
  console.log('All documents, team members, news articles, categories, site settings, and form entries are live in your dataset.');
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
