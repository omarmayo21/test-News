const fs = require('fs');
const file = 'lib/sanity/queries.ts';
let content = fs.readFileSync(file, 'utf-8');
content = content.replace(/\{\s*cache:\s*['"]no-store['"]\s*\}/g, '{ next: { tags: ["sanity"] } }');
fs.writeFileSync(file, content);
console.log("Updated cache options.");
