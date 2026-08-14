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

async function migrate() {
  console.log('Starting content migration to Sanity...');

  // 1. SETTINGS
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: {
      en: 'Nexus Resources'
    },
    siteDescription: {
      en: 'Nexus Resources is an Egyptian mining and mineral development company advancing high potential gold and mineral opportunities from exploration toward responsible production.'
    },
    siteUrl: 'https://nexus-resources.com'
  });

  // 2. HOME PAGE
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    title: { en: 'Home' },
    pageBuilder: [
      {
        _key: 'hero1',
        _type: 'heroBlock',
        headline: { en: 'Heritage Beneath. Resourcing the Future.' },
        subtitle: { en: 'From Yesterday’s Heritage to Today’s Expertise to Tomorrow’s Production.' },
        ctaLabel: { en: 'Discover Nexus' },
        ctaLink: '/en/about'
      },
      {
        _key: 'cap1',
        _type: 'capabilitiesBlock',
        sectionTitle: { en: 'Advancing Mineral Opportunities' },
        sectionDescription: { en: 'Egypt holds significant mineral potential. Unlocking that potential requires more than identifying a resource it requires technical understanding, disciplined evaluation, project development, partnerships, and effective execution.\nNexus Resources works across the mining lifecycle to evaluate opportunities, advance viable projects, build the right partnerships, and develop the capabilities required to move mineral assets toward production.' },
        cards: [
          { _key: 'c1', title: { en: 'Evaluate Before You Invest' }, description: { en: 'Technical and commercial evaluation to better understand opportunities, risks, and development potential.' } },
          { _key: 'c2', title: { en: 'Discover and Define the Resource' }, description: { en: 'Exploration planning, geological programs, data interpretation, and technical coordination designed to advance mineral opportunities.' } },
          { _key: 'c3', title: { en: 'Turn Opportunities Into Projects' }, description: { en: 'Project development, engineering coordination, planning, and execution focused on moving viable opportunities toward implementation.' } },
          { _key: 'c4', title: { en: 'Build the Right Partnerships' }, description: { en: 'Creating aligned relationships between project owners, investors, technical specialists, and strategic partners.' } },
          { _key: 'c5', title: { en: 'Move From Resource to Production' }, description: { en: 'Mine development, production planning, project execution, and operational development.' } },
          { _key: 'c6', title: { en: 'Turn Ore Into Value' }, description: { en: 'Mineral-processing development, recovery planning, process design, and optimization.' } },
        ]
      },
      {
        _key: 'cta1',
        _type: 'ctaBlock',
        title: { en: 'A New Chapter in Egyptian Mining' },
        buttonText: { en: 'Explore Why Egypt' },
        buttonLink: '/en/why-egypt'
      }
    ]
  });

  // 3. ABOUT PAGE
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: { en: 'About Nexus' },
    overviewTitle: { en: 'Nexus Overview' },
    overviewHeadline: { en: 'A Mining Company Built to Turn Potential into Progress' },
    overviewDesc: { en: 'Nexus Resources was established to contribute to the next phase of Egypt\'s mineral development, combining technical expertise, local knowledge, strategic partnerships, and disciplined execution.\nWe work across the mining value chain, supporting the evaluation and advancement of mineral opportunities while building the technical and operational capabilities required for long term participation in exploration, project development, mining, and production.\nOur work supports international mining companies, investors, project owners, license holders, and technical partners seeking to understand, enter, develop, or operate within Egypt\'s mining sector.\nNexus is built as a technical and strategic mining partner on the ground in Egypt, helping transform mineral opportunities into structured, investable, and responsibly developed projects.' },
    visionTitle: { en: 'Vision' },
    visionDesc: { en: 'To Become a Leading Egyptian Mining and Resources Company with Global Reach.\nWe envision Nexus Resources growing from an Egypt focused mining company into a trusted international mining partner, bringing together Egypt\'s mineral potential, international capital, technical expertise, technology, and strategic partnerships, with a long term ambition to contribute to responsible resource development across Africa.' },
    missionTitle: { en: 'Mission' },
    missionHeadline: { en: 'To Create Lasting Value from Egypt\'s Mineral Resources.' },
    missionDesc: { en: 'We combine technical expertise, local execution, and strategic partnerships to identify promising opportunities, advance viable projects, and contribute to responsible mineral development.' },
    principlesTitle: { en: 'Our Values' },
    principles: [
      { _key: 'v1', title: { en: 'Integrity' }, description: { en: 'We operate with transparency, accountability, and honesty in our relationships with partners, investors, authorities, and stakeholders.' } },
      { _key: 'v2', title: { en: 'Technical Excellence' }, description: { en: 'We rely on sound engineering, geological understanding, data, and disciplined technical analysis to support informed decisions.' } },
      { _key: 'v3', title: { en: 'Execution' }, description: { en: 'We believe expertise creates value when it is translated into practical action, measurable progress, and effective project delivery.' } },
      { _key: 'v4', title: { en: 'Partnership' }, description: { en: 'We build long term around trust, aligned interests, shared objectives, and common value.' } },
      { _key: 'v5', title: { en: 'Responsible Development' }, description: { en: 'We pursue mineral development with consideration for people, communities, the environment, and the long-term value of Egypt\'s mineral resources.' } }
    ],
    ctaTitle: { en: 'Meet the People Behind Nexus' },
    ctaSubtitle: { en: 'Discover the leadership, technical expertise, and advisory experience supporting Nexus Resources and its long-term development.' },
    ctaButtonLabel: { en: 'Explore Corporate' },
    ctaButtonLink: '/en/corporate'
  });

  // 4. CORPORATE PAGE (AUTHORS + SINGLETON)
  const mgmt = [
    { id: 'auth-ahmed-elassy', name: 'Mr. Ahmed A. ELAssy', role: { en: 'Chairman & Managing Director' }, bio: { en: 'Brings extensive executive and financial leadership experience across major companies in the Gulf, particularly Saudi Arabia, progressing through senior finance roles to CFO and CEO positions. At Nexus, he provides strategic leadership, financial oversight, corporate development, and long-term business direction.' } },
    { id: 'auth-medhat-elassy', name: 'Eng. Medhat A. ELAssy', role: { en: 'Chief Executive Officer' }, bio: { en: 'Mining Engineer with practical experience across exploration, mine development, engineering, project management, and mining operations. As CEO, he leads Nexus Resources\' technical direction, project development, strategic partnerships, and operational growth.' } },
    { id: 'auth-mohamed-elassy', name: 'Mohamed A. ElAssy', role: { en: 'Business Development Manager' }, bio: { en: 'Holds a Bachelor\'s degree in Business Administration and brings experience across business development and commercial sectors. At Nexus, he focuses on commercial relationships, strategic opportunities, partnerships, and business growth.' } }
  ];
  const adv = [
    { id: 'auth-saad', name: 'General Saad H. Hashish', role: { en: 'Public & Government Relations Advisor' }, bio: { en: 'Brings extensive experience in government relations, public relations, and stakeholder engagement. He supports Nexus through strong institutional and community relationships across Egypt.' } },
    { id: 'auth-michael', name: 'Michael Short', role: { en: 'Mining Advisor' }, bio: { en: 'Mining entrepreneur and executive with extensive experience in the development and management of mining companies. He provides strategic insight into mining investment, corporate development, project advancement, and mining business management.' } },
    { id: 'auth-ahmed-sroor', name: 'Eng. Ahmed Sroor', role: { en: 'Technology Advisor' }, bio: { en: 'Computer Engineer with extensive experience in information technology, database development, data science, and data analysis. He advises Nexus on technology strategy, data infrastructure, digital systems, and analytical tools.' } },
    { id: 'auth-abbas', name: 'Chem. Abbas Mohamed', role: { en: 'Mineral Processing Advisor' }, bio: { en: 'Brings extensive experience in mineral processing and the development of processing systems for commercial and early-stage mining operations. His expertise covers process design, gold recovery, plant development, optimization, and improving operational performance.' } },
    { id: 'auth-hazem', name: 'Geo. Hazem El-Etraby', role: { en: 'Geological Advisor' }, bio: { en: 'Experienced Egyptian geologist with extensive expertise across the exploration and mining lifecycle. His experience spans geological mapping, exploration, resource and orebody modelling, production geology, and grade control.' } },
    { id: 'auth-mourad', name: 'Eng. Mourad Adel', role: { en: 'Engineering Advisor' }, bio: { en: 'Brings strong engineering and project-management experience across mine development and early-stage mining operations. His expertise includes engineering planning, site management, project execution, mine development, and contractor coordination.' } }
  ];
  const specs = [
    { id: 'auth-remi', name: 'Remi Bosc (Arethuse Geology)', role: { en: 'Mining & Exploration Consultant' }, bio: { en: 'Remi Bosc and Arethuse Geology provide specialist mining and exploration consultancy support to Nexus Resources. Their expertise complements Nexus\' internal and advisory capabilities across exploration planning, project evaluation, technical studies, geological programs, and specialist project support.' } }
  ];

  for (const a of [...mgmt, ...adv, ...specs]) {
    await client.createOrReplace({ _id: a.id, _type: 'author', name: a.name, role: a.role, bio: a.bio });
  }

  await client.createOrReplace({
    _id: 'teamPage',
    _type: 'teamPage',
    title: { en: 'The People Behind Nexus' },
    subtitle: { en: 'Leadership. Expertise. Execution. Nexus Resources brings together experienced leadership and specialist expertise across mining, geology, engineering, mineral processing, business development, technology, finance, and stakeholder relations.' },
    managementTeam: mgmt.map(m => ({ _key: m.id, _type: 'reference', _ref: m.id })),
    advisoryBoard: adv.map(m => ({ _key: m.id, _type: 'reference', _ref: m.id })),
    specialistConsultants: specs.map(m => ({ _key: m.id, _type: 'reference', _ref: m.id })),
    ctaTitle: { en: 'Discover the Opportunity' },
    ctaSubtitle: { en: 'Explore why Egypt is emerging as a significant destination for mineral exploration, development, and mining investment.' },
    ctaButtonLabel: { en: 'Explore Why Egypt' },
    ctaButtonLink: '/en/why-egypt'
  });

  // 5. WHY EGYPT
  await client.createOrReplace({
    _id: 'whyEgyptPage',
    _type: 'whyEgyptPage',
    kicker: { en: 'Why Egypt. Why Now.' },
    title: { en: 'A New Era in Egyptian Mining' },
    subtitle: { en: 'Egypt is entering a new phase of mineral development. Government ambition, a new Open Blocks system, increasing international participation, proven gold production, and the geological potential of the Arabian-Nubian Shield are creating new opportunities for mining companies and investors. For international companies, the opportunity is not only what lies beneath Egypt but also what is changing above ground.' },
    statsGrid: [
      { _key: 's1', number: '500k', label: { en: 'Sukari Gold Production (2025)' } }
    ],
    contentBlocks: [
      {
        _key: 'b1', title: { en: 'Mining as a Strategic Priority' },
        description: { en: 'Egypt is actively working to increase the contribution of mining to the national economy and attract greater international investment into the sector. Recent initiatives are focused on improving access to investment opportunities, streamlining procedures, expanding geological data availability, and creating a more flexible and competitive environment for mineral exploration and development.\nMore Investment. Better Access. Greater Flexibility. More International Participation.' },
      },
      {
        _key: 'b2', title: { en: 'A New Approach to Exploration Opportunities' },
        description: { en: 'In June 2026, Egypt introduced its Open Blocks System, creating a new mechanism for companies to access mineral exploration opportunities without waiting for a single fixed bid round deadline. The offering covers opportunities for gold and associated minerals, phosphate, talc, and kaolin.\nUnder the system, companies can select and apply for available exploration areas throughout the year. When the first offer is received for a specific block, a 30-day competitive submission period begins, while blocks that receive no offers remain available for application.' }
      },
      {
        _key: 'b3', title: { en: 'Global Mining Companies Are Looking Toward Egypt' },
        description: { en: 'Egypt\'s mineral potential has attracted established international mining companies. AngloGold Ashanti holds Eastern Desert exploration licenses covering the Nugrus and Najd blocks, comprising approximately 1,389 km² within the Egyptian section of the Arabian-Nubian Shield.\nBarrick Gold has also established an exploration position in Egypt as part of its wider Africa and Middle East exploration strategy.\nTheir participation provides an important market signal: Egypt is increasingly being evaluated as a destination for modern mineral exploration, development, and mining investment.' }
      },
      {
        _key: 'b4', title: { en: 'The Arabian-Nubian Shield' },
        description: { en: 'Egypt\'s Eastern Desert forms part of the Arabian-Nubian Shield, a major geological terrane extending across northeastern Africa and the Arabian Peninsula. The region hosts established gold mineralization, historic workings, and large areas that remain relatively underexplored using modern exploration methods.\nFor modern explorers, Egypt combines:\n- Prospective Geology\n- Large Exposed Areas\n- Historic Mineral Workings\n- Underexplored Ground\n- Growing Geological Data\nAncient Geology. Modern Exploration. New Opportunity.' }
      },
      {
        _key: 'b5', title: { en: 'Egypt Is More Than an Exploration Story' },
        description: { en: 'Egypt has already demonstrated that large-scale commercial gold production is achievable. The Sukari Gold Mine produced approximately 500,000 ounces of gold in 2025, providing an important operating benchmark for companies evaluating Egypt\'s broader gold potential.\nSukari demonstrates the country\'s ability to host a long-life, large-scale modern mining operation.' },
        statValue: '500,000 oz', statLabel: { en: 'Sukari Gold Production — 2025' }, statDisclaimer: { en: 'Egypt sector benchmark. Not a Nexus Resources production figure.' }
      },
      {
        _key: 'b6', title: { en: 'Where Africa, Europa and Global Markets Meet' },
        description: { en: 'Egypt occupies a strategic position connecting Africa, the Middle East, the Mediterranean, and the Red Sea, providing access to major regional markets and international trade routes.\nFor mining companies, this geographic position can support access to ports, equipment, suppliers, industrial services, regional logistics, and international markets.\nFor long-life mining projects, location matters — from equipment and logistics to people, infrastructure, and supply chains.' }
      },
      {
        _key: 'b7', title: { en: 'Geology Creates Potential. Reform Creates Access.' },
        description: { en: 'Egypt is bringing together the elements required for a more active modern mining sector.\n- Prospective Geology: The Arabian-Nubian Shield provides a strong geological foundation for gold and associated mineral exploration.\n- Open Exploration Opportunities: The Open Blocks System provides a more flexible mechanism for accessing exploration areas throughout the year.\n- Government Ambition: Mining-sector reforms and investor-focused initiatives are aimed at attracting international investment and expanding exploration activity.\n- International Participation: Established international mining companies have already developed exploration and mining interests in Egypt.\n- Proven Production: Sukari demonstrates that large-scale modern gold mining is already achievable in Egypt.\n- Strategic Location: Egypt connects African and Middle Eastern markets with major Mediterranean and Red Sea trade routes.' }
      }
    ],
    ctaTitle: { en: 'Egypt Creates the Opportunity. Nexus Helps Advance It.' },
    ctaButtonLabel: { en: 'Why Nexus' },
    ctaButtonLink: '/en/why-nexus'
  });

  // 6. WHY NEXUS
  await client.createOrReplace({
    _id: 'whyNexusPage',
    _type: 'whyNexusPage',
    title: { en: 'We Build Mining Projects.' },
    subtitle: { en: 'Egypt has the mineral potential. Turning that potential into successful mining projects requires more than identifying an opportunity. It requires technical expertise, local execution, project development, capital, strategic partnerships, and operational capability. Nexus Resources brings these elements together through a mining-focused approach designed to advance opportunities from exploration toward development and production.' },
    contentBlocks: [
      { _key: 'n1', title: { en: 'A Full Project Lifecycle Approach' }, description: { en: 'Nexus evaluates mining opportunities through the full project lifecycle. EXPLORE → EVALUATE → DEVELOP → FINANCE → BUILD → OPERATE → PRODUCE. From identifying a promising mineral opportunity to developing the project and supporting production, our focus is on creating value at every stage where our capabilities can make a meaningful contribution.' } },
      { _key: 'n2', title: { en: 'More Than Technical Support' }, description: { en: 'Nexus pursues mining opportunities through direct applications, acquisitions, joint ventures, strategic partnerships, and project development agreements. We also work with international mining companies, investors, asset owners, and license holders seeking a capable Egyptian partner to help evaluate, develop, or operate projects.' } },
      { _key: 'n3', title: { en: 'Egyptian Knowledge. International Perspective.' }, description: { en: 'Mining is local by nature. Successful projects depend on understanding the geology, regulatory environment, infrastructure, workforce, supply chain, stakeholders, and operating realities of the country in which they are developed. Nexus combines local knowledge and on-the-ground execution in Egypt with a disciplined approach to technical evaluation, project development, investment, and mining operations. This allows us to work effectively with both international mining companies and Egyptian project owners.' } },
      { _key: 'n4', title: { en: 'Partnerships That Build Value' }, description: { en: 'Great mining projects rarely succeed through one capability alone. They require the right combination of: ASSETS (Mining rights), CAPITAL (Funding), TECHNICAL EXPERTISE, and EXECUTION. Nexus aims to bring these capabilities together around viable mining opportunities and participate as a development and operating partner where our involvement can create long-term value.' } },
      { _key: 'n5', title: { en: 'Built Around Execution' }, description: { en: 'From Plans to Production. Our ambition goes beyond holding interests in mining opportunities. We are building the technical and operational capability required to develop and operate mining projects. Our operational focus includes: Project Management, Mine Development, Production Planning, Procurement & Logistics, Mineral Processing, HSE, Operational Optimization.' } },
      { _key: 'n6', title: { en: 'Building an Egyptian Mining Company for the Long Term' }, description: { en: 'Nexus is not being built around a single transaction or project. Our long term objective is to build a diversified portfolio of exploration, development, and production assets across Egypt, establishing Nexus Resources as a leading Egyptian mining and resources company with international reach. We measure our progress by the projects we help advance, develop, operate, and ultimately bring into production.' } }
    ],
    ctaTitle: { en: 'We Don\'t Just Identify Opportunities. We Build Them. We Develop Them. We Operate Them.' },
    ctaSubtitle: { en: 'Whether you are an international mining company, investor, project owner, or strategic partner, Nexus is ready to explore how we can build value together.' },
    ctaButtonLabel: { en: 'Partner With Nexus' },
    ctaButtonLink: '/en/contact'
  });

  // 7. CONTACT
  await client.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    title: { en: 'Start a Conversation With Nexus' },
    subtitle: { en: 'Whether you are exploring an investment opportunity, developing a mining project, seeking an Egyptian project partner, or looking to enter the Egyptian mining sector, our team is ready to connect.' },
    generalEmail: 'info@nexusmines.com',
    pressEmail: 'invest@nexusmines.com',
    phone: '+20 2 3745 9141',
    address: { en: '20th Floor, North Tower\nNile City Towers\n2005C Nile Corniche\nCairo, Egypt\nPostal Code: 11221' },
    mapUrl: 'https://maps.google.com'
  });

  // 8. NEWS PAGE
  await client.createOrReplace({
    _id: 'newsPage',
    _type: 'newsPage',
    title: { en: 'Insights & Updates' },
    subtitle: { en: 'The latest structural engineering breakthroughs, mining concessions, and operational updates from Nexus Resources.' }
  });

  console.log('Migration complete!');
}

migrate().catch(console.error);
