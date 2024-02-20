"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackClient = void 0;
class SlackClient {
    constructor(webHookURL) {
        this.webHookURL = webHookURL;
    }
    async post(message) {
        await fetch(this.webHookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: message,
            }),
        });
    }
}
exports.SlackClient = SlackClient;
