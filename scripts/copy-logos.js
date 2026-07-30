const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'logo');
const destDir = path.join(__dirname, '..', 'public', 'logo');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir);
  files.forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`Copied ${file} -> public/logo/`);
    }
  });
} else {
  console.log('Src dir does not exist');
}
