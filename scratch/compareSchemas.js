import { schema } from '../sanity/schema';
import fs from 'fs';

const dump = JSON.parse(fs.readFileSync('./scratch/sanity_data_dump.json', 'utf-8'));

const schemaMap = {};
schema.types.forEach(type => {
  if (type.type === 'document' || type.type === 'object') {
    schemaMap[type.name] = type.fields ? type.fields.map(f => f.name) : [];
  }
});

const mismatches = {};

dump.forEach(doc => {
  const typeName = doc._type;
  if (!schemaMap[typeName]) {
    console.log("Missing schema for type:", typeName);
    return;
  }
  
  const schemaFields = schemaMap[typeName];
  const docFields = Object.keys(doc).filter(k => !k.startsWith('_') && k !== 'slug');
  
  const unknownFields = docFields.filter(f => !schemaFields.includes(f));
  if (unknownFields.length > 0) {
    if (!mismatches[typeName]) mismatches[typeName] = [];
    mismatches[typeName].push(...unknownFields);
  }
});

// deduplicate
Object.keys(mismatches).forEach(k => {
  mismatches[k] = [...new Set(mismatches[k])];
});

console.log(JSON.stringify(mismatches, null, 2));
