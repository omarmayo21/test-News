import fs from 'fs';
import path from 'path';

const singletonsDir = './sanity/schemas/singletons';
const documentsDir = './sanity/schemas/documents';

const filesToCheck = [
  ...fs.readdirSync(singletonsDir).map(f => path.join(singletonsDir, f)),
  ...fs.readdirSync(documentsDir).map(f => path.join(documentsDir, f))
].filter(f => f.endsWith('.ts'));

filesToCheck.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // 1. Ensure `groups` array exists if missing, right after `type: "document",`
  if (!content.includes('groups: [')) {
    content = content.replace(/type:\s*["']document["'],/, 'type: "document",\n  groups: [\n    { name: "navigation", title: "Navigation" }\n  ],');
    changed = true;
  } else if (!content.includes('name: "navigation"')) {
    // If groups exists but doesn't have navigation group
    content = content.replace(/groups:\s*\[/, 'groups: [\n    { name: "navigation", title: "Navigation" },');
    changed = true;
  }

  // Ensure 'Navigation Settings' title is 'Navigation' as user requested
  content = content.replace(/title:\s*["']Navigation Settings["']/g, 'title: "Navigation"');

  // 2. Ensure `navigation` field exists
  const navFieldSnippet = `
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "pageNavigation",
      group: "navigation",
    }),`;

  if (!content.includes('name: "navigation"')) {
    // Wait, earlier we ensured `name: "navigation"` in the groups array.
    // The field definition has `name: "navigation"` inside `defineField({`.
    // Let's check for `type: "pageNavigation"` to be safe.
  }
  
  if (!content.includes('type: "pageNavigation"')) {
    // Some schemas might not need navigation? The user said "Every schema that uses fields with group: 'navigation'".
    // But they also said: "For example: Header Navigation previously existed but became disconnected... Compare every visible frontend section with the Sanity Dashboard."
    // Actually, earlier we wanted to inject it into all page-like singletons.
    // Let's only add the field if it's missing but intended.
    // Which files were intended? homePage, aboutPage, servicesPage, teamPage, whyEgyptPage, contactPage, investmentPage, newsPage, page.
    const isPageType = filePath.includes('Page.ts') || filePath.endsWith('page.ts');
    if (isPageType) {
      content = content.replace(/fields:\s*\[/, `fields: [${navFieldSnippet}`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed', filePath);
  }
});
