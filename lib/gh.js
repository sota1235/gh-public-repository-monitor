"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gh_got_1 = __importDefault(require("gh-got"));
class GhClient {
    constructor(token) {
        this.token = token;
    }
    async searchCode(keyword) {
        const url = `search/code?q=${keyword}`;
        const { body } = await gh_got_1.default(url, { token: this.token });
        return body;
    }
}
exports.GhClient = GhClient;
