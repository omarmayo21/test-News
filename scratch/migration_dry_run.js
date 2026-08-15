const { createClient } = require('next-sanity');
const fs = require('fs');

const client = createClient({ 
  projectId: '28z8ff6f', 
  dataset: 'production', 
  apiVersion: '2024-01-01', 
  useCdn: false,
});

function createKey() {
  return Math.random().toString(36).substring(2, 10);
}

function textToBlocks(text) {
  if (!text) return [];
  if (Array.isArray(text)) return text; // already blocks
  
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
  const docs = await client.fetch('*[_type in ["aboutPage", "whyEgyptPage", "whyNexusPage", "teamPage", "contactPage"]]');
  
  const mutations = [];

  for (const doc of docs) {
    let pageBuilder = [];
    
    if (doc._type === 'aboutPage') {
      if (doc.overviewTitle || doc.overviewHeadline || doc.overviewDesc) {
        pageBuilder.push({
          _key: createKey(),
          _type: 'richTextBlock',
          title: doc.overviewTitle || undefined,
          content: [
            ...(doc.overviewHeadline ? [{ _key: createKey(), _type: 'block', style: 'h2', children: [{ _type: 'span', text: doc.overviewHeadline.en || '' }] }] : []),
            ...textToBlocks(doc.overviewDesc?.en)
          ]
        });
      }
      
      if (doc.visionTitle || doc.visionDesc) {
        pageBuilder.push({
          _key: createKey(),
          _type: 'richTextBlock',
          title: doc.visionTitle || undefined,
          content: textToBlocks(doc.visionDesc?.en)
        });
      }
      
      if (doc.missionTitle || doc.missionHeadline || doc.missionDesc) {
        pageBuilder.push({
          _key: createKey(),
          _type: 'richTextBlock',
          title: doc.missionTitle || undefined,
          content: [
            ...(doc.missionHeadline ? [{ _key: createKey(), _type: 'block', style: 'h2', children: [{ _type: 'span', text: doc.missionHeadline.en || '' }] }] : []),
            ...textToBlocks(doc.missionDesc?.en)
          ]
        });
      }
      
      if (doc.principles && doc.principles.length > 0) {
        pageBuilder.push({
          _key: createKey(),
          _type: 'cardsBlock',
          title: doc.principlesTitle || undefined,
          columns: 3,
          cards: doc.principles.map(p => ({
            _key: createKey(),
            title: p.title,
            description: p.description
          }))
        });
      }
    } else if (doc._type === 'teamPage') {
      // The team page doesn't map easily to a simple cardsBlock because we need references to authors
      // Let's create a custom 'teamGridBlock' in Sanity or just leave teamPage alone for now?
      // Wait, I didn't create a teamGridBlock! I will skip teamPage for this basic migration, or map them as cards without images. 
      // Actually, since I have to preserve existing references, I should keep teamPage using the legacy fields. The user can add NEW blocks. So I will skip migrating team lists.
    } else if (doc._type === 'whyEgyptPage') {
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
      
      if (doc.contentBlocks && doc.contentBlocks.length > 0) {
        for (const block of doc.contentBlocks) {
          pageBuilder.push({
            _key: createKey(),
            _type: 'splitBlock',
            layout: 'textLeft',
            title: block.title,
            subtitle: block.description,
            image: block.image
          });
        }
      }
    } else if (doc._type === 'whyNexusPage') {
      if (doc.contentBlocks && doc.contentBlocks.length > 0) {
        for (const block of doc.contentBlocks) {
          pageBuilder.push({
            _key: createKey(),
            _type: 'splitBlock',
            layout: 'textLeft',
            title: block.title,
            subtitle: block.description,
            image: block.image
          });
        }
      }
    } else if (doc._type === 'contactPage') {
      // Offices are complex objects. We'll leave them in the legacy field, but the user can use cardsBlock for new ones if they want. 
      // We will skip automatic migration for complex nested objects like offices.
    }
    
    if (pageBuilder.length > 0) {
      mutations.push({
        id: doc._id,
        type: doc._type,
        pageBuilder
      });
    }
  }

  fs.writeFileSync('scratch/dry_run_output.json', JSON.stringify(mutations, null, 2));
  console.log("DRY RUN: Found", mutations.length, "documents to migrate.");
  console.log("Output written to scratch/dry_run_output.json");
}

runDryRun().catch(console.error);
