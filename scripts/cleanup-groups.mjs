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

  const hasNavigationGroupField = content.includes('group: "navigation"') || content.includes("group: 'navigation'");
  
  if (hasNavigationGroupField) {
    // Must have groups array with navigation
    if (!content.includes('groups: [')) {
      content = content.replace(/type:\s*["']document["'],/, 'type: "document",\n  groups: [\n    { name: "navigation", title: "Navigation" }\n  ],');
      changed = true;
    } else if (!content.includes('name: "navigation"')) {
      content = content.replace(/groups:\s*\[/, 'groups: [\n    { name: "navigation", title: "Navigation" },');
      changed = true;
    }
  } else {
    // If it DOES NOT have the field, remove the group definition if it exists
    if (content.includes('name: "navigation"') && content.includes('groups: [')) {
      // It has the group, but no field. Let's remove the group.
      content = content.replace(/groups:\s*\[\s*\{\s*name:\s*["']navigation["'],\s*title:\s*["'][^"']+["']\s*\}\s*\],?/, '');
      
      // Also remove if there are other groups but we just want to remove the navigation one:
      content = content.replace(/\{\s*name:\s*["']navigation["'],\s*title:\s*["'][^"']+["']\s*\},?/, '');
      
      // If groups is now empty, remove it
      content = content.replace(/groups:\s*\[\s*\],?/, '');
      
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed groups in', filePath);
  }
});
