"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = require("./formatter");
const gh_1 = require("./gh");
const slack_1 = require("./slack");
const keyword = process.argv[2];
const token = process.argv[3];
const webHookURL = process.argv[4];
const interval = Number(process.argv[5]) || 5;
if (keyword === undefined || token === undefined || webHookURL === undefined) {
    console.error('Execution format is `node index.js ${keyword} ${token} ${slack webhook url}`');
    process.exit(1);
}
const ghClient = new gh_1.GhClient(token);
const slackClient = new slack_1.SlackClient(webHookURL);
console.log('script has started!');
setImmediate(() => {
    console.log('searching...');
    ghClient
        .searchCode(keyword)
        .then(async (res) => {
        if (res.data.search.repositoryCount === 0) {
            console.log('no repository found');
            return;
        }
        return await slackClient.post((0, formatter_1.fmtGhRes)(res.data.search.nodes));
    })
        .catch((err) => {
        console.error(err);
        process.exit(1);
    });
}, interval * 60 * 1000);
