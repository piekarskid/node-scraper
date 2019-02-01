const search = require('./search');

const baseLink = 'https://niebezpiecznik.pl/page/'; // base of links to iterate through
const numPages = 10; // number of pages

const links = [];
for (let i = 1; i < numPages; i++) {
  links.push(baseLink + i);
}

const query = {
  links,
  postSelector: 'div.post',
  dateSelector: 'article > div.inner > div > div > div > a > span > small',
  titleSelector: 'div.post > div.title > h2 > a',
  linkSelector: 'div.post > div.title > h2 > a',
  bodySelector: 'div.post p' // without body, we will have output wihout
};
const output = 'console'; // fileName for output to file or "console" to simply console.log

search(query, output);
