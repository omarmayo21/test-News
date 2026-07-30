const fs = require('fs');
const path = require('path');

// Tight bounding box coordinates calculated from the vector elements:
// Min X ~ 566.66, Max X ~ 2379.88 => Width ~ 1813.22 (plus 12px padding => 1825.22)
// Min Y ~ 1284.70, Max Y ~ 1663.19 => Height ~ 378.49 (plus 10px padding => 388.49)
const TIGHT_VIEWBOX = "560 1280 1825 388";

const dirs = [
  path.join(__dirname, '..', 'logo'),
  path.join(__dirname, '..', 'public', 'logo')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (file.endsWith('.svg')) {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace viewBox="0 0 3000 3000" or similar with tight viewBox
      content = content.replace(/viewBox="[^"]*"/g, `viewBox="${TIGHT_VIEWBOX}"`);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated viewBox in ${file}`);
    }
  });
});
