const fs = require('fs');
const path = require('path');

const files = [
  'homePage.ts',
  'aboutPage.ts',
  'servicesPage.ts',
  'teamPage.ts',
  'whyEgyptPage.ts',
  'contactPage.ts',
  'investmentPage.ts'
];

const dir = path.join(__dirname, 'sanity/schemas/singletons');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  if (!content.includes('{ name: "navigation", title: "Navigation Settings" }')) {
    content = content.replace(/groups:\s*\[/, 'groups: [\n    { name: "navigation", title: "Navigation Settings" },');
  }

  if (!content.includes('name: "navigation"')) {
    const navField = `
    defineField({
      name: "navigation",
      title: "Navigation Settings",
      type: "pageNavigation",
      group: "navigation",
    }),`;
    content = content.replace(/fields:\s*\[/, `fields: [${navField}`);
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
