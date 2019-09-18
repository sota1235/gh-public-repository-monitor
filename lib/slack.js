"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
class SlackClient {
    constructor(webhHookURL) {
        this.webhHookURL = webhHookURL;
    }
    async post(message) {
        await node_fetch_1.default(this.webhHookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: message,
            }),
        });
    }
}
exports.SlackClient = SlackClient;
