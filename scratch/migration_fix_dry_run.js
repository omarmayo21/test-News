const { createClient } = require('next-sanity');
const fs = require('fs');

// We use the token from .env
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

async function runDryRun() {
  const docs = await client.fetch('*[_type in ["aboutPage", "whyEgyptPage"]]');
  
  const mutations = [];

  for (const doc of docs) {
    let pageBuilder = [];
    
    if (doc._type === 'aboutPage') {
      // 1. Overview and Vision -> Two Column Block
      if (doc.overviewTitle || doc.visionTitle) {
        pageBuilder.push({
          _key: createKey(),
          _type: 'twoColumnBlock',
          theme: 'white',
          leftColumn: {
            title: doc.overviewTitle || undefined,
            heading: doc.overviewHeadline || undefined,
            content: textToBlocks(doc.overviewDesc?.en)
          },
          rightColumn: {
            title: doc.visionTitle || undefined,
            heading: undefined,
            content: textToBlocks(doc.visionDesc?.en)
          }
        });
      }
      
      // 2. Mission and Principles -> Two Column Block
      if (doc.missionTitle || doc.principlesTitle) {
        pageBuilder.push({
          _key: createKey(),
          _type: 'twoColumnBlock',
          theme: 'gray',
          leftColumn: {
            title: doc.missionTitle || undefined,
            heading: doc.missionHeadline || undefined,
            content: textToBlocks(doc.missionDesc?.en)
          },
          rightColumn: {
            title: doc.principlesTitle || undefined,
            heading: undefined,
            content: undefined,
            cards: doc.principles?.map(p => ({
              _key: createKey(),
              title: p.title,
              description: p.description
            })) || []
          }
        });
      }
    } else if (doc._type === 'whyEgyptPage') {
      // 1. Stats Counter
      if (doc.statsGrid && doc.statsGrid.length > 0) {
        pageBuilder.push({
          _key: createKey(),
          _type: 'statsBlock',
          title: { en: "By the Numbers", fr: "En Chiffres" },
          stats: doc.statsGrid.map(s => ({
            _key: createKey(),
            number: s.number,
            label: s.label
          }))
        });
      }
      
      // 2. Content Blocks (Deep Dive)
      if (doc.contentBlocks && doc.contentBlocks.length > 0) {
        for (const block of doc.contentBlocks) {
          pageBuilder.push({
            _key: createKey(),
            _type: 'splitBlock',
            layout: 'textLeft',
            title: block.title,
            subtitle: block.description,
            image: block.image,
            statValue: block.statValue,
            statLabel: block.statLabel,
            statDisclaimer: block.statDisclaimer
          });
        }
      }
    } 
    
    if (pageBuilder.length > 0) {
      mutations.push({
        id: doc._id,
        type: doc._type,
        pageBuilder
      });
    }
  }

  fs.writeFileSync('scratch/dry_run_fix_output.json', JSON.stringify(mutations, null, 2));
  console.log("DRY RUN FIX: Found", mutations.length, "documents to migrate.");
  console.log("Output written to scratch/dry_run_fix_output.json");
}

runDryRun().catch(console.error);
