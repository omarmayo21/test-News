const { createClient } = require('@sanity/client');


const client = createClient({
  projectId: '28z8ff6f',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
});

async function check() {
  const home = await client.fetch(`*[_type == "homePage"][0]`);
  console.log("HOME PAGE BUILDER COUNT:", home.pageBuilder ? home.pageBuilder.length : 0);
  console.log("HOME PAGE BUILDER TYPES:", home.pageBuilder ? home.pageBuilder.map(b => b._type) : []);
  
  const team = await client.fetch(`*[_type == "teamPage"][0]`);
  console.log("MANAGEMENT TEAM COUNT:", team.managementTeam ? team.managementTeam.length : 0);
  
  const why = await client.fetch(`*[_type == "whyEgyptPage"][0]`);
  console.log("WHY EGYPT BLOCKS COUNT:", why.contentBlocks ? why.contentBlocks.length : 0);
  console.log("WHY EGYPT STATS GRID:", why.statsGrid ? why.statsGrid.length : 0);
}

check().catch(console.error);
