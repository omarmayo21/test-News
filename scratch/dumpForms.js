const { createClient } = require('next-sanity');
const fs = require('fs');

const client = createClient({ projectId: '28z8ff6f', dataset: 'production', apiVersion: '2024-01-01', useCdn: false });

async function check() {
  const docs = await client.fetch('*[_type=="formSubmission"][0...5]');
  console.log(JSON.stringify(docs, null, 2));
}
check();
