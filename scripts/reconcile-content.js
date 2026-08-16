const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '28z8ff6f', // Nexus project ID
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  console.log("Starting content reconciliation...");

  // 1. HOME PAGE
  console.log("Updating Home Page...");
  await client.patch('homePage').set({
    pageBuilder: [
      {
        _type: 'heroBlock',
        _key: 'home-hero',
        headline: { en: "Heritage Beneath Resourcing the Future." },
        subtitle: { en: "From Yesterday’s Heritage to Today’s Expertise to Tomorrow’s Production.\n\nNexus Resources is an Egyptian mining and mineral development company advancing high potential gold and mineral opportunities from exploration toward responsible production through technical expertise, local execution, strategic partnerships, and disciplined investment.\n\nEgyptian Resources. Global Ambition." }
      },
      {
        _type: 'capabilitiesBlock',
        _key: 'home-capabilities',
        sectionTitle: { en: "Advancing Mineral Opportunities" },
        sectionDescription: { en: "Egypt holds significant mineral potential. Unlocking that potential requires more than identifying a resource it requires technical understanding, disciplined evaluation, project development, partnerships, and effective execution.\n\nNexus Resources works across the mining lifecycle to evaluate opportunities, advance viable projects, build the right partnerships, and develop the capabilities required to move mineral assets toward production." },
        cards: [
          { _key: 'cap-1', title: { en: "EVALUATE" }, subtitle: { en: "Evaluate Before You Invest." }, description: { en: "Technical and commercial evaluation to better understand opportunities, risks, and development potential." } },
          { _key: 'cap-2', title: { en: "EXPLORE" }, subtitle: { en: "Discover and Define the Resource." }, description: { en: "Exploration planning, geological programs, data interpretation, and technical coordination designed to advance mineral opportunities." } },
          { _key: 'cap-3', title: { en: "DEVELOP" }, subtitle: { en: "Turn Opportunities Into Projects." }, description: { en: "Project development, engineering coordination, planning, and execution focused on moving viable opportunities toward implementation." } },
          { _key: 'cap-4', title: { en: "PARTNER" }, subtitle: { en: "Build the Right Partnerships." }, description: { en: "Creating aligned relationships between project owners, investors, technical specialists, and strategic partners." } },
          { _key: 'cap-5', title: { en: "MINING" }, subtitle: { en: "Move From Resource to Production." }, description: { en: "Mine development, production planning, project execution, and operational development." } },
          { _key: 'cap-6', title: { en: "PROCESS" }, subtitle: { en: "Turn Ore Into Value." }, description: { en: "Mineral-processing development, recovery planning, process design, and optimization." } }
        ]
      },
      {
        _type: 'ctaBlock',
        _key: 'home-built-for-egypt',
        title: { en: "BUILT FOR EGYPT" },
        subtitle: { en: "Local Knowledge. International Perspective.\n\nNexus combines practical knowledge of Egypt's mining environment with a disciplined approach to technical evaluation, project development, partnerships, and execution.\n\nOur ambition is to participate in the development of Egypt's next generation of mineral projects while building long-term relationships with international mining companies, investors, project owners, and technical partners." },
      },
      {
        _type: 'ctaBlock',
        _key: 'home-why-now',
        title: { en: "WHY NOW?" },
        subtitle: { en: "A New Chapter in Egyptian Mining\n\nEgypt's Arabian-Nubian Shield, evolving mining framework, new exploration opportunities, proven gold production, and increasing international participation are creating a new environment for mineral development." },
        buttonText: { en: "Explore Why Egypt →" },
        buttonLink: "/en/why-egypt"
      },
      {
        _type: 'ctaBlock',
        _key: 'home-closing-cta',
        title: { en: "Discover Nexus" },
        subtitle: { en: "Learn more about the company, our vision, and the approach behind our long-term development." },
        buttonText: { en: "About Nexus →" },
        buttonLink: "/en/about"
      }
    ],
    seo: {
      metaTitle: { en: "Nexus Resources - Egyptian Mining & Mineral Development" },
      metaDescription: { en: "Nexus Resources is an Egyptian mining and mineral development company advancing high potential gold and mineral opportunities from exploration toward responsible production." },
      openGraphDescription: { en: "Nexus Resources is an Egyptian mining and mineral development company advancing high potential gold and mineral opportunities from exploration toward responsible production." },
      twitterDescription: { en: "Nexus Resources is an Egyptian mining and mineral development company advancing high potential gold and mineral opportunities from exploration toward responsible production." }
    }
  }).commit();
  console.log("Home Page updated.");

  // 2. ABOUT PAGE
  console.log("Updating About Page...");
  await client.patch('aboutPage').set({
    title: { en: "About Nexus" },
    subtitle: { en: "A Mining Company Built to Turn Potential into Progress" },
    overviewTitle: { en: "About Nexus" },
    overviewHeadline: { en: "Nexus Overview\n\nA Mining Company Built to Turn Potential into Progress" },
    overviewDesc: { en: "Nexus Resources was established to contribute to the next phase of Egypt's mineral development, combining technical expertise, local knowledge, strategic partnerships, and disciplined execution.\n\nWe work across the mining value chain, supporting the evaluation and advancement of mineral opportunities while building the technical and operational capabilities required for long term participation in exploration, project development, mining, and production.\n\nOur work supports international mining companies, investors, project owners, license holders, and technical partners seeking to understand, enter, develop, or operate within Egypt's mining sector.\n\nNexus is built as a technical and strategic mining partner on the ground in Egypt, helping transform mineral opportunities into structured, investable, and responsibly developed projects." },
    visionTitle: { en: "VISION" },
    visionDesc: { en: "To Become a Leading Egyptian Mining and Resources Company with Global Reach.\n\nWe envision Nexus Resources growing from an Egypt focused mining company into a trusted international mining partner, bringing together Egypt's mineral potential, international capital, technical expertise, technology, and strategic partnerships, with a long term ambition to contribute to responsible resource development across Africa." },
    missionTitle: { en: "MISSION" },
    missionHeadline: { en: "To Create Lasting Value from Egypt's Mineral Resources." },
    missionDesc: { en: "We combine technical expertise, local execution, and strategic partnerships to identify promising opportunities, advance viable projects, and contribute to responsible mineral development." },
    principlesTitle: { en: "OUR VALUES" },
    principles: [
      { _key: 'v1', title: { en: "Integrity" }, description: { en: "We operate with transparency, accountability, and honesty in our relationships with partners, investors, authorities, and stakeholders." } },
      { _key: 'v2', title: { en: "Technical Excellence" }, description: { en: "We rely on sound engineering, geological understanding, data, and disciplined technical analysis to support informed decisions." } },
      { _key: 'v3', title: { en: "Execution" }, description: { en: "We believe expertise creates value when it is translated into practical action, measurable progress, and effective project delivery." } },
      { _key: 'v4', title: { en: "Partnership" }, description: { en: "We build long term around trust, aligned interests, shared objectives, and common value." } },
      { _key: 'v5', title: { en: "Responsible Development" }, description: { en: "We pursue mineral development with consideration for people, communities, the environment, and the long-term value of Egypt's mineral resources." } }
    ],
    ctaTitle: { en: "Meet the People Behind Nexus" },
    ctaSubtitle: { en: "Discover the leadership, technical expertise, and advisory experience supporting Nexus Resources and its long-term development." },
    ctaButtonLabel: { en: "Explore Corporate →" },
    ctaButtonLink: "/en/corporate"
  }).commit();
  console.log("About Page updated.");

  // 3. CORPORATE PAGE
  console.log("Updating Corporate Page...");
  
  // Create / update authors
  const authors = [
    { _id: 'author-ahmed-a-elassy', _type: 'author', name: "Mr. Ahmed A. ELAssy", role: { en: "Chairman & Managing Director" }, bio: { en: "Mr. Ahmed A. ELAssy brings extensive executive and financial leadership experience across major companies in the Gulf, particularly Saudi Arabia, progressing through senior finance roles to CFO and CEO positions.\n\nAt Nexus, he provides strategic leadership, financial oversight, corporate development, and long-term business direction." }, teamGroup: "management" },
    { _id: 'author-medhat-a-elassy', _type: 'author', name: "Eng. Medhat A. ELAssy", role: { en: "Chief Executive Officer" }, bio: { en: "Eng. Medhat A. ELAssy is a Mining Engineer with practical experience across exploration, mine development, engineering, project management, and mining operations.\n\nAs CEO, he leads Nexus Resources' technical direction, project development, strategic partnerships, and operational growth." }, teamGroup: "management" },
    { _id: 'author-mohamed-a-elassy', _type: 'author', name: "Mohamed A. ElAssy", role: { en: "Business Development Manager" }, bio: { en: "Mohamed A. ElAssy holds a Bachelor's degree in Business Administration and brings experience across business development and commercial sectors.\n\nAt Nexus, he focuses on commercial relationships, strategic opportunities, partnerships, and business growth." }, teamGroup: "management" },
    
    { _id: 'author-saad-h-hashish', _type: 'author', name: "General Saad H. Hashish", role: { en: "Public & Government Relations Advisor" }, bio: { en: "General Saad H. Hashish brings extensive experience in government relations, public relations, and stakeholder engagement.\n\nHe supports Nexus through strong institutional and community relationships across Egypt." }, teamGroup: "advisory" },
    { _id: 'author-michael-short', _type: 'author', name: "Michael Short", role: { en: "Mining Advisor" }, bio: { en: "Michael Short is a mining entrepreneur and executive with extensive experience in the development and management of mining companies.\n\nHe provides strategic insight into mining investment, corporate development, project advancement, and mining business management." }, teamGroup: "advisory" },
    { _id: 'author-ahmed-sroor', _type: 'author', name: "Eng. Ahmed Sroor", role: { en: "Technology Advisor" }, bio: { en: "Eng. Ahmed Sroor is a Computer Engineer with extensive experience in information technology, database development, data science, and data analysis.\n\nHe advises Nexus on technology strategy, data infrastructure, digital systems, and analytical tools." }, teamGroup: "advisory" },
    { _id: 'author-abbas-mohamed', _type: 'author', name: "Chem. Abbas Mohamed", role: { en: "Mineral Processing Advisor" }, bio: { en: "Chem. Abbas Mohamed brings extensive experience in mineral processing and the development of processing systems for commercial and early-stage mining operations.\n\nHis expertise covers process design, gold recovery, plant development, optimization, and improving operational performance." }, teamGroup: "advisory" },
    { _id: 'author-hazem-el-etraby', _type: 'author', name: "Geo. Hazem El-Etraby", role: { en: "Geological Advisor" }, bio: { en: "Geo. Hazem El-Etraby is an experienced Egyptian geologist with extensive expertise across the exploration and mining lifecycle.\n\nHis experience spans geological mapping, exploration, resource and orebody modelling, production geology, and grade control." }, teamGroup: "advisory" },
    { _id: 'author-mourad-adel', _type: 'author', name: "Eng. Mourad Adel", role: { en: "Engineering Advisor" }, bio: { en: "Eng. Mourad Adel brings strong engineering and project-management experience across mine development and early-stage mining operations.\n\nHis expertise includes engineering planning, site management, project execution, mine development, and contractor coordination." }, teamGroup: "advisory" },
    
    { _id: 'author-remi-bosc', _type: 'author', name: "Remi Bosc", role: { en: "Mining & Exploration Consultant — Arethuse Geology" }, bio: { en: "Remi Bosc and Arethuse Geology provide specialist mining and exploration consultancy support to Nexus Resources.\n\nTheir expertise complements Nexus' internal and advisory capabilities across exploration planning, project evaluation, technical studies, geological programs, and specialist project support." }, teamGroup: "consultant" },
  ];

  for (const author of authors) {
    const { teamGroup, ...authorData } = author;
    await client.createOrReplace(authorData);
  }

  await client.patch('teamPage').set({
    title: { en: "The People Behind Nexus" },
    subtitle: { en: "Leadership. Expertise. Execution.\n\nNexus Resources brings together experienced leadership and specialist expertise across mining, geology, engineering, mineral processing, business development, technology, finance, and stakeholder relations.\n\nOur corporate structure combines executive management, experienced advisors, and specialist consultants to support the evaluation, development, and operation of mining projects." },
    managementTeam: authors.filter(a => a.teamGroup === 'management').map(a => ({ _type: 'reference', _ref: a._id, _key: a._id })),
    advisoryBoard: authors.filter(a => a.teamGroup === 'advisory').map(a => ({ _type: 'reference', _ref: a._id, _key: a._id })),
    specialistConsultants: authors.filter(a => a.teamGroup === 'consultant').map(a => ({ _type: 'reference', _ref: a._id, _key: a._id })),
    integratedExpertiseTitle: { en: "INTEGRATED EXPERTISE" },
    integratedExpertiseSubtitle: { en: "One Team. Multiple Disciplines." },
    integratedExpertiseDisciplines: { en: "Leadership · Mining · Geology · Mineral Processing · Engineering · Technology · Business Development · Stakeholder Relations" },
    ctaTitle: { en: "Discover the Opportunity" },
    ctaSubtitle: { en: "Explore why Egypt is emerging as a significant destination for mineral exploration, development, and mining investment." },
    ctaButtonLabel: { en: "Explore Why Egypt →" },
    ctaButtonLink: "/en/why-egypt"
  }).commit();
  console.log("Corporate Page updated.");

  // 4. WHY EGYPT PAGE
  console.log("Updating Why Egypt Page...");
  await client.patch('whyEgyptPage').set({
    statsGrid: [], // Remove placeholder stats
    contentBlocks: [
      {
        _key: 'b1',
        title: { en: "GOVERNMENT AMBITION" },
        description: { en: "Mining as a Strategic Priority\n\nEgypt is actively working to increase the contribution of mining to the national economy and attract greater international investment into the sector.\n\nRecent initiatives are focused on improving access to investment opportunities, streamlining procedures, expanding geological data availability, and creating a more flexible and competitive environment for mineral exploration and development.\n\nMore Investment. Better Access. Greater Flexibility. More International Participation." }
      },
      {
        _key: 'b2',
        title: { en: "OPEN BLOCKS" },
        description: { en: "A New Approach to Exploration Opportunities\n\nIn June 2026, Egypt introduced its Open Blocks System, creating a new mechanism for companies to access mineral exploration opportunities without waiting for a single fixed bid round deadline.\n\nThe offering covers opportunities for gold and associated minerals, phosphate, talc, and kaolin.\n\nUnder the system, companies can select and apply for available exploration areas throughout the year. When the first offer is received for a specific block, a 30-day competitive submission period begins, while blocks that receive no offers remain available for application.\n\n[IMAGE PLACEHOLDER: Official MRMIA Open Blocks Map]\nCaption: Egypt's Open Blocks System — exploration opportunities across gold, associated minerals, and other mineral commodities." }
      },
      {
        _key: 'b3',
        title: { en: "INTERNATIONAL INTEREST" },
        description: { en: "Global Mining Companies Are Looking Toward Egypt\n\nEgypt's mineral potential has attracted established international mining companies.\n\nAngloGold Ashanti holds Eastern Desert exploration licenses covering the Nugrus and Najd blocks, comprising approximately 1,389 km² within the Egyptian section of the Arabian-Nubian Shield.\n\nBarrick Gold has also established an exploration position in Egypt as part of its wider Africa and Middle East exploration strategy.\n\nTheir participation provides an important market signal: Egypt is increasingly being evaluated as a destination for modern mineral exploration, development, and mining investment." }
      },
      {
        _key: 'b4',
        title: { en: "GEOLOGICAL ADVANTAGE" },
        description: { en: "The Arabian-Nubian Shield\n\nEgypt's Eastern Desert forms part of the Arabian-Nubian Shield, a major geological terrane extending across northeastern Africa and the Arabian Peninsula.\n\nThe region hosts established gold mineralization, historic workings, and large areas that remain relatively underexplored using modern exploration methods.\n\nFor modern explorers, Egypt combines:\n- Prospective Geology\n- Large Exposed Areas\n- Historic Mineral Workings\n- Underexplored Ground\n- Growing Geological Data\n\nAncient Geology. Modern Exploration. New Opportunity.\n\n[IMAGE PLACEHOLDER: Eastern Desert / Arabian-Nubian Shield Geological Map or Landscape]" }
      },
      {
        _key: 'b5',
        title: { en: "PROVEN GOLD PRODUCTION" },
        description: { en: "Egypt Is More Than an Exploration Story\n\nEgypt has already demonstrated that large-scale commercial gold production is achievable.\n\nThe Sukari Gold Mine produced approximately 500,000 ounces of gold in 2025, providing an important operating benchmark for companies evaluating Egypt's broader gold potential.\n\nSukari demonstrates the country's ability to host a long-life, large-scale modern mining operation." },
        statValue: "500,000 oz",
        statLabel: { en: "Sukari Gold Production — 2025" },
        statDisclaimer: { en: "Note: Egypt sector benchmark. Not a Nexus Resources production figure." }
      },
      {
        _key: 'b6',
        title: { en: "STRATEGIC LOCATION" },
        description: { en: "Where Africa, Europe and Global Markets Meet\n\nEgypt occupies a strategic position connecting Africa, the Middle East, the Mediterranean, and the Red Sea, providing access to major regional markets and international trade routes.\n\nFor mining companies, this geographic position can support access to ports, equipment, suppliers, industrial services, regional logistics, and international markets.\n\nFor long-life mining projects, location matters — from equipment and logistics to people, infrastructure, and supply chains.\n\n[IMAGE PLACEHOLDER: Egypt / Red Sea / Strategic Location Map]" }
      },
      {
        _key: 'b7',
        title: { en: "THE OPPORTUNITY" },
        description: { en: "Geology Creates Potential. Reform Creates Access.\n\nEgypt is bringing together the elements required for a more active modern mining sector.\n\nProspective Geology\nThe Arabian-Nubian Shield provides a strong geological foundation for gold and associated mineral exploration.\n\nOpen Exploration Opportunities\nThe Open Blocks System provides a more flexible mechanism for accessing exploration areas throughout the year.\n\nGovernment Ambition\nMining-sector reforms and investor-focused initiatives are aimed at attracting international investment and expanding exploration activity.\n\nInternational Participation\nEstablished international mining companies have already developed exploration and mining interests in Egypt.\n\nProven Production\nSukari demonstrates that large-scale modern gold mining is already achievable in Egypt.\n\nStrategic Location\nEgypt connects African and Middle Eastern markets with major Mediterranean and Red Sea trade routes." }
      }
    ],
    ctaTitle: { en: "Egypt Creates the Opportunity. Nexus Helps Advance It." },
    ctaSubtitle: { en: "Egypt's geology, evolving mining framework, international participation, and proven production create the opportunity.\n\nDiscover how Nexus combines local execution, technical expertise, and strategic partnerships to participate in Egypt's next phase of mineral development." },
    ctaButtonLabel: { en: "Why Nexus →" },
    ctaButtonLink: "/en/why-nexus"
  }).commit();
  console.log("Why Egypt Page updated.");

  // 5. CONTACT PAGE
  console.log("Updating Contact Page...");
  await client.patch('contactPage').set({
    kicker: { en: "Let's Work Together" },
    title: { en: "Start a Conversation With Nexus" },
    subtitle: { en: "Whether you are exploring an investment opportunity, developing a mining project, seeking an Egyptian project partner, or looking to enter the Egyptian mining sector, our team is ready to connect." },
    offices: [
      {
        _key: 'off1',
        name: "GENERAL INQUIRIES",
        isPrimary: false,
        address: "For corporate information, technical discussions, suppliers, service providers, and general business inquiries",
        email: "info@nexusmines.com",
        phone: "+20 2 3745 9141 (Cairo Office)"
      },
      {
        _key: 'off2',
        name: "INVESTORS & PARTNERSHIPS",
        isPrimary: true,
        address: "For investment opportunities, strategic partnerships, joint ventures, project development, and mining collaboration",
        email: "invest@nexusmines.com",
        phone: "+44 7453 421940 (International / WhatsApp)"
      },
      {
        _key: 'off3',
        name: "CAIRO HEADQUARTERS",
        isPrimary: false,
        address: "20th Floor, North Tower, Nile City Towers, 2005C Nile Corniche, Cairo, Egypt — Postal Code: 11221"
      }
    ],
    consentText: { en: "By submitting this form, you agree that Nexus Resources may contact you regarding your inquiry. Please refer to our Privacy Policy for information on how we handle personal data." },
    closingTitle: { en: "Mining Opportunities Begin With the Right Conversation." },
    closingSubtitle: { en: "We welcome inquiries from mining companies, investors, project owners, and strategic partners seeking to explore opportunities in Egypt." },
    closingButtonLabel: { en: "Send an Inquiry →" },
  }).commit();
  console.log("Contact Page updated.");

  // 6. FOOTER
  console.log("Updating Footer...");
  await client.patch('footer').set({
    contactEmails: ["info@nexusmines.com", "invest@nexusmines.com"],
    resourceLinks: [], // We'll put legal in complianceLinks since footer.tsx maps both.
    complianceLinks: [
      { _key: 'fl1', label: { en: "Privacy Policy" }, path: "/en/legal/privacy-policy" },
      { _key: 'fl2', label: { en: "Terms of Use" }, path: "/en/legal/terms" },
      { _key: 'fl3', label: { en: "Website Disclaimer" }, path: "/en/legal/disclaimer" }
    ],
    copyright: { en: "© Nexus Resources. All Rights Reserved." }
  }).commit();
  console.log("Footer updated.");

  // Also fix siteSettings SEO
  console.log("Updating Site Settings...");
  await client.patch('siteSettings').set({
    defaultSeo: {
      metaTitle: { en: "Nexus Resources - Egyptian Mining & Mineral Development" },
      metaDescription: { en: "Nexus Resources is an Egyptian mining and mineral development company advancing high potential gold and mineral opportunities from exploration toward responsible production." },
      openGraphDescription: { en: "Nexus Resources is an Egyptian mining and mineral development company advancing high potential gold and mineral opportunities from exploration toward responsible production." },
      twitterDescription: { en: "Nexus Resources is an Egyptian mining and mineral development company advancing high potential gold and mineral opportunities from exploration toward responsible production." }
    }
  }).commit();
  console.log("Site Settings updated.");

  console.log("All content successfully reconciled.");
}

run().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
