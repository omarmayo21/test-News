const { createClient } = require('next-sanity');
const fs = require('fs');

const client = createClient({ projectId: '28z8ff6f', dataset: 'production', apiVersion: '2024-01-01', useCdn: false });

async function check() {
  const docs = await client.fetch('*[_type in ["homePage", "aboutPage", "teamPage", "whyEgyptPage", "whyNexusPage", "contactPage", "footer", "siteSettings", "newsPage"]]');
  fs.writeFileSync('sanity_data_dump.json', JSON.stringify(docs, null, 2));
  console.log("Dumped to sanity_data_dump.json");
}
check();
