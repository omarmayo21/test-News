const fs = require('fs');

const dump = JSON.parse(fs.readFileSync('sanity_data_dump.json', 'utf-8'));
const schemas = {
  homePage: [],
  aboutPage: [],
  teamPage: [],
  whyEgyptPage: [],
  whyNexusPage: [],
  contactPage: [],
  footer: [],
  siteSettings: [],
  newsPage: []
};

dump.forEach(doc => {
  if (schemas[doc._type]) {
    Object.keys(doc).forEach(key => {
      if (!key.startsWith('_') && key !== 'slug') {
        schemas[doc._type].push(key);
      }
    });
  }
});

Object.keys(schemas).forEach(type => {
  schemas[type] = [...new Set(schemas[type])];
});

console.log(JSON.stringify(schemas, null, 2));
