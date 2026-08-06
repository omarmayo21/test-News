const { execSync } = require('child_process');

console.log("Running seed-global...");
execSync('node --env-file=.env scripts/seed-global.mjs', { stdio: 'inherit' });

console.log("Running seed-sanity (creates singletons and base content)...");
execSync('node --env-file=.env scripts/seed-sanity.mjs', { stdio: 'inherit' });

console.log("Running seed-remaining (creates homepage and updates others)...");
execSync('node --env-file=.env scripts/seed-remaining.mjs', { stdio: 'inherit' });

console.log("Running seed-news...");
execSync('node --env-file=.env scripts/seed-news.js', { stdio: 'inherit' });

console.log("Running seed-navigation (patches singletons with navigation)...");
execSync('node --env-file=.env scripts/seed-navigation.js', { stdio: 'inherit' });

console.log("All seeding finished successfully!");
