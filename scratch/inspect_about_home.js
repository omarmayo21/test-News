const { createClient } = require('next-sanity');

const projectId = '28z8ff6f';
const dataset = 'production';
const apiVersion = '2024-01-01';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false
});

async function inspectPages() {
  const about = await client.fetch('*[_type == "aboutPage"][0]');
  console.log('ABOUT PAGE DATA:\n', JSON.stringify(about, null, 2));

  const home = await client.fetch('*[_type == "homePage"][0]');
  console.log('\nHOME PAGE DATA BLOCKS:\n', JSON.stringify(home?.pageBuilder?.map(b => ({ type: b._type, title: b.title || b.headline || b.sectionTitle })), null, 2));
}

inspectPages();
