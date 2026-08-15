const { createClient } = require('next-sanity');
const fs = require('fs');
const envFile = fs.readFileSync('.env', 'utf-8');
const token = envFile.split('\n').find(l => l.startsWith('SANITY_API_WRITE_TOKEN=')).split('=')[1].trim();

const client = createClient({ 
  projectId: '28z8ff6f', 
  dataset: 'production', 
  apiVersion: '2024-01-01', 
  useCdn: false,
  token: token 
});

function createKey() {
  return Math.random().toString(36).substring(2, 10);
}

function textToBlocks(text) {
  if (!text) return [];
  if (Array.isArray(text)) return text;
  
  return text.split('\n\n').map(paragraph => ({
    _key: createKey(),
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        marks: [],
        text: paragraph.trim(),
        _key: createKey()
      }
    ]
  }));
}

async function runMigration() {
  console.log("Starting migration...");
  // Read from the dry-run output since we already computed it
  const mutations = JSON.parse(fs.readFileSync('scratch/dry_run_output.json', 'utf-8'));
  
  for (const mut of mutations) {
    console.log(`Patching ${mut.id}...`);
    try {
      await client
        .patch(mut.id)
        .setIfMissing({ pageBuilder: [] })
        .set({ pageBuilder: mut.pageBuilder })
        .commit();
      console.log(`Success: ${mut.id}`);
    } catch (err) {
      console.error(`Failed to patch ${mut.id}:`, err.message);
    }
  }
  
  console.log("Migration complete!");
}

runMigration().catch(console.error);
