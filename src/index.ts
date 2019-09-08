import { fmtGhRes } from './formatter';
import { GhClient } from './gh';
import { SlackClient } from './slack';

const keyword = process.argv[2];
const token = process.argv[3];
const webHookURL = process.argv[4];
const interval = Number(process.argv[5]) || 5; // min

if (keyword === undefined || token === undefined || webHookURL === undefined) {
  console.error(
    'Execution format is `node index.js ${keyword} ${token} ${slack webhook url}`',
  );
  process.exit(1);
}

const ghClient = new GhClient(token);
const slackClient = new SlackClient(webHookURL);

setInterval(() => {
  console.log('searching...');
  ghClient
    .searchCode(keyword)
    .then(async (data: GhSearchCodeRes) => {
      const message = fmtGhRes(data);

      if (message === null) {
        console.log('no repository found');
        return;
      }

      return await slackClient.post(message);
    })
    .catch((err: Error) => {
      console.error(err);
      process.exit(1);
    });
}, interval * 60 * 1000);
