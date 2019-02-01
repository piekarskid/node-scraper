const search = require('./search');

const baseLink = 'https://niebezpiecznik.pl/page/'; // base of links to iterate through
const numPages = 10; // number of pages
const output = 'console'; // fileName for output to file or "console" to simply console.log
const bodySelector = 'div.post p'; // without body, we will have output wihout it
const postSelector = 'div.post';
const dateSelector = 'article > div.inner > div > div > div > a > span > small';
const titleSelector = 'div.post > div.title > h2 > a';
const linkSelector = 'div.post > div.title > h2 > a';

const links = [];
for (let i = 1; i < numPages; i++) {
  links.push(baseLink + i);
}

const query = {
  links,
  postSelector,
  dateSelector,
  titleSelector,
  linkSelector,
  bodySelector
};

search(query, output);
