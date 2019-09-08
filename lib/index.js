"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gh_got_1 = __importDefault(require("gh-got"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const formatter_1 = require("./formatter");
const keyword = process.argv[2];
const token = process.argv[3];
const webhook = process.argv[4];
const interval = Number(process.argv[5]) || 5;
if (keyword === undefined || token === undefined || webhook === undefined) {
    console.error('Execution format is `node index.js ${keyword} ${token} ${slack webhook url}`');
    process.exit(1);
}
const search = (query, opts) => {
    const url = `search/code?q=${query}`;
    return gh_got_1.default(url, opts).then((res) => res.body);
};
const postSlack = (message) => {
    return node_fetch_1.default(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: message,
        }),
    })
        .then((_) => {
        console.debug('request succeeded');
    })
        .catch((err) => {
        console.error(err);
        process.exit(1);
    });
};
setInterval(() => {
    console.log('searching...');
    search(keyword, { token })
        .then((data) => {
        const message = formatter_1.fmtGhRes(data);
        if (message === null) {
            console.log('no repository found');
            return;
        }
        return postSlack(message);
    })
        .catch((err) => {
        console.error(err);
        process.exit(1);
    });
}, interval * 60 * 1000);
