const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
let writeStream;

module.exports = (query, output) => {
  const isBody = Object.keys(query).length == 6;
  if (output === 'console') {
  } else {
    writeStream = fs.createWriteStream(output);
    if (isBody) {
      writeStream.write('Date,Title,Link,Body\n');
    } else {
      writeStream.write('Date,Title,Link\n');
    }
  }
  query.links.forEach(async link => {
    request(link, (err, res, html) => {
      if (!err && res.statusCode == 200) {
        const $ = cheerio.load(html);
        $(query.postSelector).each((i, el) => {
          let item, body;
          const date = $(el)
            .find(query.dateSelector)
            .html();
          if (date == '01.02.2019') return;
          const title = $(el)
            .find(query.titleSelector)
            .text();
          const href = $(el)
            .find(query.linkSelector)
            .attr('href');
          if (isBody) {
            body = $(el)
              .find(query.bodySelector)
              .text();
            item = `${date},${title},${href},${body}`;
          } else {
            item = `${date},${title},${href}`;
          }
          if (output === 'console') {
            console.log(item);
          } else {
            writeStream.write(item + '\n');
          }
        });
      }
    });
  });
};
