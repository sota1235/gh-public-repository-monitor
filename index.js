'use strict';
const ghGot = require('gh-got');
const fetch = require('node-fetch');
const keyword = process.argv[2];
const token = process.argv[3];
const webhook = process.argv[4];
const interval = process.argv[5] || 5; // min

if (keyword === undefined || token === undefined || webhook === undefined) {
  console.error('node index.js ${keyword} ${token}形式で実行してください');
  process.exit(1);
}

const search = (query, opts) => {
  let url = `search/code?q=${query}`;

  return ghGot(url, opts).then(res => res.body);
};

const postSlack = (message) => {
  return fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: message,
    }),
  })
    .then(res => {})
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

const fmtGhRes = (data) => {
  if (data.total_count === 0) {
    return null;
  }

  let repoList = '';

  for (const item of data.items) {
    repoList += `Repository Name: ${item.repository.name}` + "\n";
    repoList += `URL: ${item.url}` + "\n";
  }
  return `
Count ${data.total_count}
${repoList}
  `;
}

setInterval(() => {
  console.log('searching...');
  search(keyword, { token })
    .then(data => {
      const message = fmtGhRes(data);

      if (message === null) {
        console.log('no repository found');
        return;
      }

      return postSlack(message);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}, interval * 60 * 1000);
