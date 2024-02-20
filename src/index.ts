import { fmtGhRes } from './formatter';
import { GhClient, GhSearchCodeRes } from './gh';
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

console.log('script has started!');

setInterval(
  () => {
    console.log('searching...');
    ghClient
      .searchCode(keyword)
      .then(async (res: GhSearchCodeRes) => {
        if (res.data.search.repositoryCount === 0) {
          console.log('no repository found');
          return;
        }

        return await slackClient.post(fmtGhRes(res.data.search.nodes));
      })
      .catch((err: Error) => {
        console.error(err);
        process.exit(1);
      });
  },
  interval * 60 * 1000,
);
