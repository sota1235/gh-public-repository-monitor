// @ts-ignore
import ghGot from 'gh-got';
import fetch, { Response } from 'node-fetch';

const keyword = process.argv[2];
const token = process.argv[3];
const webhook = process.argv[4];
const interval = Number(process.argv[5]) || 5; // min

if (keyword === undefined || token === undefined || webhook === undefined) {
  console.error(
    'Execution format is `node index.js ${keyword} ${token} ${slack webhook url}`',
  );
  process.exit(1);
}

const search = (query: string, opts: any) => {
  const url = `search/code?q=${query}`;

  return ghGot(url, opts).then((res: any) => res.body);
};

const postSlack = (message: string) => {
  return fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: message,
    }),
  })
    .then((_: Response) => {
      console.debug('request succeeded');
    })
    .catch((err: Error) => {
      console.error(err);
      process.exit(1);
    });
};

const fmtGhRes = (data: any) => {
  if (data.total_count === 0) {
    return null;
  }

  let repoList = '';

  for (const item of data.items) {
    repoList += `Repository Name: ${item.repository.name}` + '\n';
    repoList += `URL: ${item.url}` + '\n';
  }
  return `
Count ${data.total_count}
${repoList}
  `;
};

setInterval(() => {
  console.log('searching...');
  search(keyword, { token })
    .then((data: any) => {
      const message = fmtGhRes(data);

      if (message === null) {
        console.log('no repository found');
        return;
      }

      return postSlack(message);
    })
    .catch((err: Error) => {
      console.error(err);
      process.exit(1);
    });
}, interval * 60 * 1000);
