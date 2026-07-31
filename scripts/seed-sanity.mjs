import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lfr2gva9",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function uploadImage(url, filename) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image ${url}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const asset = await client.assets.upload("image", buffer, { filename });
    console.log(`✅ Uploaded image: ${filename}`);
    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  } catch (error) {
    console.error(`❌ Failed to upload image ${url}:`, error.message);
    return null;
  }
}

async function seed() {
  console.log("🚀 Starting Sanity Seeding...");

  // 1. Upload some shared images
  const heroImage = await uploadImage("https://picsum.photos/1920/1080?random=1", "hero.jpg");
  const deepDiveImage = await uploadImage("https://picsum.photos/800/800?random=2", "deepdive.jpg");
  const avatar1 = await uploadImage("https://picsum.photos/400/400?random=3", "avatar1.jpg");
  const avatar2 = await uploadImage("https://picsum.photos/400/400?random=4", "avatar2.jpg");
  const avatar3 = await uploadImage("https://picsum.photos/400/400?random=5", "avatar3.jpg");

  // 2. Create Singletons
  console.log("📝 Creating About Page...");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    title: { en: "Legacy & Vision", fr: "Héritage et Vision" },
    subtitle: { 
      en: "Decades of structural engineering and geological exploration expertise across the Arabian-Nubian shield.",
      fr: "Des décennies d'expertise en ingénierie structurelle et en exploration géologique."
    },
    heroImage,
    missionTitle: { en: "Our Mission", fr: "Notre Mission" },
    missionHeadline: { en: "Engineering the Future of Mining", fr: "Concevoir l'Avenir de l'Exploitation Minière" },
    missionDesc: { 
      en: "We partner with governments and private sectors to develop sustainable, highly efficient extraction operations.",
      fr: "Nous travaillons avec les gouvernements pour développer des opérations d'extraction durables."
    },
    principlesTitle: { en: "Core Principles", fr: "Principes Fondamentaux" },
    principles: [
      {
        _key: "p1",
        title: { en: "Uncompromising Safety", fr: "Sécurité Intransigeante" },
        description: { en: "Implementing zero-harm policies.", fr: "Mise en œuvre de politiques zéro dommage." }
      },
      {
        _key: "p2",
        title: { en: "Technological Excellence", fr: "Excellence Technologique" },
        description: { en: "Utilizing 3D geological mapping.", fr: "Utilisation de la cartographie géologique 3D." }
      },
    ],
    ctaTitle: { en: "Interested in Partnering with Nexus?", fr: "Intéressé par un partenariat avec Nexus?" },
    ctaSubtitle: { en: "Connect with our executive management.", fr: "Connectez-vous avec notre direction exécutive." },
    ctaButtonLabel: { en: "Contact Advisory Board", fr: "Contacter le Conseil" },
    ctaButtonLink: "/en/contact",
  });

  console.log("📝 Creating Services Page...");
  await client.createOrReplace({
    _id: "servicesPage",
    _type: "servicesPage",
    title: { en: "Structural Expertise & Services", fr: "Expertise et Services Structurels" },
    subtitle: { 
      en: "Delivering end-to-end structural engineering, geological resource assessment, and operational management.",
      fr: "Fournir une ingénierie structurelle de bout en bout."
    },
    services: [
      {
        _key: "s1",
        icon: "Compass",
        title: { en: "Structural Engineering & Mine Infrastructure", fr: "Ingénierie Structurelle" },
        description: { en: "Custom design and engineering of extraction facilities.", fr: "Conception sur mesure des installations." }
      },
      {
        _key: "s2",
        icon: "Layers",
        title: { en: "Geological Resource Exploration & Modeling", fr: "Exploration Géologique" },
        description: { en: "State-of-the-art geospatial modeling.", fr: "Modélisation géospatiale de pointe." }
      },
      {
        _key: "s3",
        icon: "Cpu",
        title: { en: "Operational Workflow Optimization", fr: "Optimisation Opérationnelle" },
        description: { en: "Optimizing material flow and autonomous haulage dispatch.", fr: "Optimisation du flux de matériaux." }
      }
    ],
    ctaTitle: { en: "Need a Custom Engineering Feasibility Study?", fr: "Besoin d'une étude de faisabilité sur mesure?" },
    ctaSubtitle: { en: "Contact our senior geological engineers.", fr: "Contactez nos ingénieurs géologues seniors." },
    ctaButtonLabel: { en: "Request Feasibility Study", fr: "Demander l'étude" },
    ctaButtonLink: "/en/contact",
  });

  console.log("📝 Creating Team Page...");
  const team1 = await client.create({
    _type: "author",
    name: "Dr. Tarek Al-Sayed",
    role: { en: "Chief Executive & Geological Director", fr: "Directeur Général" },
    bio: { en: "Ph.D. in Structural Geology from Imperial College London.", fr: "Doctorat en géologie structurale." },
    avatar: avatar1,
  });
  const team2 = await client.create({
    _type: "author",
    name: "Eng. Sarah Mansour",
    role: { en: "Head of Structural Infrastructure", fr: "Responsable des Infrastructures" },
    bio: { en: "Master of Civil Engineering with specialized expertise.", fr: "Master en génie civil." },
    avatar: avatar2,
  });
  const team3 = await client.create({
    _type: "author",
    name: "Karim Benjelloun",
    role: { en: "Vice President of Operational Management", fr: "Vice-président des opérations" },
    bio: { en: "Former Operations Director for multinational mining concessions.", fr: "Ancien directeur des opérations." },
    avatar: avatar3,
  });

  await client.createOrReplace({
    _id: "teamPage",
    _type: "teamPage",
    title: { en: "Consultant Team & Leadership", fr: "Équipe de Consultants" },
    subtitle: { en: "Our senior team combines decades of authority.", fr: "Notre équipe de direction combine des décennies." },
    teamMembers: [
      { _type: "reference", _ref: team1._id, _key: "t1" },
      { _type: "reference", _ref: team2._id, _key: "t2" },
      { _type: "reference", _ref: team3._id, _key: "t3" },
    ],
    ctaTitle: { en: "Want to join our senior engineering team?", fr: "Vous voulez rejoindre notre équipe?" },
    ctaSubtitle: { en: "We are continuously recruiting.", fr: "Nous recrutons en permanence." },
    ctaButtonLabel: { en: "Contact HR", fr: "Contacter les RH" },
    ctaButtonLink: "/en/contact",
  });

  console.log("📝 Creating Why Egypt Page...");
  await client.createOrReplace({
    _id: "whyEgyptPage",
    _type: "whyEgyptPage",
    kicker: { en: "Strategic Landscape", fr: "Paysage Stratégique" },
    title: { en: "Unlocking the Arabian-Nubian Shield", fr: "Déverrouiller le bouclier arabo-nubien" },
    subtitle: { en: "The Arabian-Nubian Shield (ANS) represents one of the world's last remaining under-explored mineral frontiers.", fr: "Le Bouclier arabo-nubien (ANS) représente l'une des dernières frontières minérales sous-explorées." },
    statsGrid: [
      { _key: "st1", number: "1.2M", label: { en: "Ounces Discovered", fr: "Onces Découvertes" } },
      { _key: "st2", number: "40+", label: { en: "Active Concessions", fr: "Concessions Actives" } },
      { _key: "st3", number: "$1.5B+", label: { en: "Sector Investment", fr: "Investissement" } },
      { _key: "st4", number: "6,000 km", label: { en: "Road Infrastructure", fr: "Infrastructure" } },
    ],
    deepDiveTitle: { en: "World-Class Infrastructure & Port Access", fr: "Infrastructure de classe mondiale" },
    deepDiveDesc: { en: "Egypt boasts direct access to the Red Sea ports.", fr: "L'Égypte bénéficie d'un accès direct aux ports." },
    deepDiveList: [
      { _key: "l1", en: "Modernized Red Sea Deepwater Ports", fr: "Ports en eau profonde modernisés" },
      { _key: "l2", en: "High-Voltage National Grid Connection", fr: "Connexion au réseau national haute tension" },
    ],
    deepDiveImage,
    ctaTitle: { en: "Ready to Explore?", fr: "Prêt à explorer?" },
    ctaSubtitle: { en: "Request our latest exploration report.", fr: "Demandez notre dernier rapport." },
    ctaButtonLabel: { en: "Request Report", fr: "Demander le rapport" },
    ctaButtonLink: "/en/contact",
  });

  console.log("📝 Creating Investment Page & Data...");
  const catGold = await client.create({ _type: "investmentCategory", title: { en: "Gold", fr: "Or" }, slug: { current: "gold" } });
  const catCopper = await client.create({ _type: "investmentCategory", title: { en: "Copper", fr: "Cuivre" }, slug: { current: "copper" } });
  const catExploration = await client.create({ _type: "investmentCategory", title: { en: "Exploration", fr: "Exploration" }, slug: { current: "exploration" } });

  await client.createOrReplace({
    _id: "investmentPage",
    _type: "investmentPage",
    title: { en: "Investment Opportunities & Concessions", fr: "Opportunités d'investissement" },
    subtitle: { en: "Review currently available joint ventures and exploration licenses.", fr: "Passez en revue les coentreprises actuellement disponibles." },
    ctaTitle: { en: "Institutional & Private Investor Relations", fr: "Relations avec les investisseurs" },
    ctaDesc: { en: "Access confidential technical data rooms.", fr: "Accédez à des salles de données confidentielles." },
    ctaButtonLabel: { en: "Contact Investor Relations", fr: "Contacter les relations avec les investisseurs" },
    ctaButtonLink: "/en/contact",
  });

  const opportunities = [
    {
      _type: "investmentOpportunity",
      title: { en: "Sukari Extension Block Alpha", fr: "Bloc d'extension Sukari Alpha" },
      category: { _type: "reference", _ref: catGold._id },
      location: { en: "Eastern Desert, Egypt", fr: "Désert Oriental, Égypte" },
      minerals: { en: "Primary Gold (Au)", fr: "Or primaire (Au)" },
      stage: { en: "Pre-Feasibility", fr: "Pré-faisabilité" },
      description: { en: "High-grade epithermal vein system showing visible gold at surface. Preliminary drilling indicates 2.4 g/t average grade.", fr: "Système de veines épithermales à haute teneur." },
      image: await uploadImage("https://picsum.photos/600/400?random=10", "inv1.jpg")
    },
    {
      _type: "investmentOpportunity",
      title: { en: "Hamash Copper-Gold Porphyry", fr: "Porphyre cuivre-or de Hamash" },
      category: { _type: "reference", _ref: catCopper._id },
      location: { en: "South Eastern Desert", fr: "Désert du sud-est" },
      minerals: { en: "Copper (Cu), Gold (Au)", fr: "Cuivre (Cu), Or (Au)" },
      stage: { en: "Advanced Exploration", fr: "Exploration avancée" },
      description: { en: "Extensive porphyry copper system with associated gold mineralization. Aeromagnetic anomalies confirm deep-seated structures.", fr: "Vaste système de cuivre porphyrique." },
      image: await uploadImage("https://picsum.photos/600/400?random=11", "inv2.jpg")
    },
    {
      _type: "investmentOpportunity",
      title: { en: "Nubian Shield Greenfields", fr: "Champs verts du bouclier nubien" },
      category: { _type: "reference", _ref: catExploration._id },
      location: { en: "Central Eastern Desert", fr: "Désert Oriental Central" },
      minerals: { en: "Multi-element", fr: "Multi-éléments" },
      stage: { en: "Early Stage", fr: "Stade initial" },
      description: { en: "Underexplored 400 sq km concession with historical artisanal workings and highly prospective shear zones.", fr: "Concession sous-explorée de 400 km²." },
      image: await uploadImage("https://picsum.photos/600/400?random=12", "inv3.jpg")
    },
    {
      _type: "investmentOpportunity",
      title: { en: "Quseir VMS Deposit", fr: "Gisement SMV de Quseir" },
      category: { _type: "reference", _ref: catCopper._id },
      location: { en: "Red Sea Coast", fr: "Côte de la mer Rouge" },
      minerals: { en: "Copper (Cu), Zinc (Zn)", fr: "Cuivre (Cu), Zinc (Zn)" },
      stage: { en: "Drilling", fr: "Forage" },
      description: { en: "Volcanogenic massive sulfide deposit near major port infrastructure. Exceptional metallurgical test results.", fr: "Gisement de sulfures massifs volcanogènes." },
      image: await uploadImage("https://picsum.photos/600/400?random=13", "inv4.jpg")
    },
    {
      _type: "investmentOpportunity",
      title: { en: "Wadi Allaqi Placer Gold", fr: "Or alluvionnaire de Wadi Allaqi" },
      category: { _type: "reference", _ref: catGold._id },
      location: { en: "Southern Egypt", fr: "Sud de l'Égypte" },
      minerals: { en: "Gold (Au)", fr: "Or (Au)" },
      stage: { en: "Production", fr: "Production" },
      description: { en: "Active alluvial gold operation utilizing sustainable water-recycling extraction methods with scalable capacity.", fr: "Exploitation active d'or alluvial." },
      image: await uploadImage("https://picsum.photos/600/400?random=14", "inv5.jpg")
    },
    {
      _type: "investmentOpportunity",
      title: { en: "Gabal Elba Critical Minerals", fr: "Minéraux critiques de Gabal Elba" },
      category: { _type: "reference", _ref: catExploration._id },
      location: { en: "Halaib Triangle", fr: "Triangle de Halaib" },
      minerals: { en: "Rare Earth Elements (REE)", fr: "Terres rares (REE)" },
      stage: { en: "Prospecting", fr: "Prospection" },
      description: { en: "Alkaline complex showing significant enrichment in heavy rare earth elements essential for green energy transition.", fr: "Complexe alcalin montrant un enrichissement significatif." },
      image: await uploadImage("https://picsum.photos/600/400?random=15", "inv6.jpg")
    }
  ];

  for (const opp of opportunities) {
    await client.create(opp);
  }

  console.log("📝 Creating Contact Page...");
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    kicker: { en: "Direct Technical Engagement", fr: "Engagement technique direct" },
    title: { en: "Contact Our Advisory Board", fr: "Contactez notre conseil" },
    subtitle: { en: "Get in touch with our engineering and technical team in Cairo or international offices.", fr: "Prenez contact avec notre équipe technique." },
    offices: [
      {
        _key: "o1",
        name: "Cairo Headquarters",
        isPrimary: true,
        address: "Nile City Towers, North Tower, Floor 22, Corniche El Nil, Cairo, Egypt",
        phone: "+20 2 2790 1842",
        email: "contact@nexus-resources.com",
        hours: "Sunday - Thursday: 08:30 - 17:30 (EET)",
      },
      {
        _key: "o2",
        name: "International Advisory",
        isPrimary: false,
        address: "Suite 400, 100 Bishopsgate, London, UK",
        phone: "+44 20 7946 0912",
        email: "uk@nexus-resources.com",
        hours: "Monday - Friday: 09:00 - 18:00 (GMT)",
      }
    ]
  });

  console.log("✅ Seeding complete!");
}

seed().catch(console.error);
