const { createClient } = require('next-sanity');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function run() {
  console.log("Deleting old demo news articles...");
  try {
    await client.delete({ query: '*[_type == "news" && _id in ["news-1", "news-2", "news-3"]]' });
  } catch (e) {
    console.log("No old demo news found.");
  }

  console.log("Creating Author...");
  const author = await client.createIfNotExists({
    _id: "author-demo-1",
    _type: "author",
    name: "Dr. Tarek Al-Sayed",
    role: "Chief Exploration Officer",
  });

  console.log("Creating Category...");
  const category = await client.createIfNotExists({
    _id: "category-demo-1",
    _type: "newsCategory",
    title: { en: "Exploration & Operations", fr: "Exploration & Opérations" },
    slug: { en: { current: "operations" }, fr: { current: "operations" } },
  });

  console.log("Creating News Article 1...");
  await client.createIfNotExists({
    _id: "news-demo-1",
    _type: "news",
    title: { 
      en: "Nexus Secures New Structural Mining Concession in Eastern Desert",
      fr: "Nexus Obtient une Nouvelle Concession Minière en Égypte"
    },
    slug: { 
      en: { current: "nexus-secures-new-concession" }, 
      fr: { current: "nexus-obtient-concession" } 
    },
    publishDate: new Date().toISOString(),
    author: { _type: 'reference', _ref: author._id },
    category: { _type: 'reference', _ref: category._id },
    excerpt: {
      en: "Nexus Resources has been awarded exploration rights covering 450 km² in the Arabian-Nubian shield to deploy modern geospatial modeling.",
      fr: "Nexus Resources a obtenu des droits d'exploration couvrant 450 km² dans le bouclier arabo-nubien."
    },
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            marks: [],
            text: "Nexus Resources has officially commenced high-resolution structural mapping across the newly allocated concessions within Egypt's Eastern Desert. Utilizing advanced satellite imagery, magnetics, and targeted diamond core drilling, our engineering team is establishing 3D geological resource models."
          }
        ]
      }
    ],
    featured: true,
  });

  console.log("Creating News Article 2...");
  await client.createIfNotExists({
    _id: "news-demo-2",
    _type: "news",
    title: { 
      en: "Deploying Autonomous Telemetry in Deep Underground Tunnels",
      fr: "Déploiement de la Télémétrie Autonome dans les Tunnels Souterrains"
    },
    slug: { 
      en: { current: "deploying-autonomous-telemetry" }, 
      fr: { current: "telemetrie-autonome-tunnels" } 
    },
    publishDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    author: { _type: 'reference', _ref: author._id },
    category: { _type: 'reference', _ref: category._id },
    excerpt: {
      en: "Integrating real-time sensor arrays for slope stability monitoring and worker safety compliance across remote facilities.",
      fr: "Intégration de capteurs en temps réel pour surveiller la stabilité des pentes et la sécurité des travailleurs."
    },
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            marks: [],
            text: "Worker safety is our top priority. By deploying these new autonomous telemetry systems, we can monitor structural integrity with unprecedented accuracy."
          }
        ]
      }
    ],
  });

  console.log("Successfully seeded demo news content!");
}

run().catch(console.error);
