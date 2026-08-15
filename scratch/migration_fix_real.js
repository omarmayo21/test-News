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

async function runMigration() {
  console.log("Starting migration fix...");
  const mutations = JSON.parse(fs.readFileSync('scratch/dry_run_fix_output.json', 'utf-8'));
  
  for (const mut of mutations) {
    console.log(`Patching ${mut.id}...`);
    try {
      await client
        .patch(mut.id)
        .set({ pageBuilder: mut.pageBuilder }) // This overwrites the previously flawed array
        .commit();
      console.log(`Success: ${mut.id}`);
    } catch (err) {
      console.error(`Failed to patch ${mut.id}:`, err.message);
    }
  }
  
  console.log("Migration fix complete!");
}

runMigration().catch(console.error);
