import fetch, { Response } from 'node-fetch';
import { fmtGhRes } from './formatter';
import { GhClient } from './gh';

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

const ghClient = new GhClient(token);

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

setInterval(() => {
  console.log('searching...');
  ghClient
    .searchCode(keyword)
    .then((data: GhSearchCodeRes) => {
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
