const { getWhyEgyptPageData } = require('./lib/sanity/queries');

async function test() {
  const data = await getWhyEgyptPageData();
  console.log(data);
}
test();
