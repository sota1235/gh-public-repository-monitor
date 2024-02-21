"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GhClient = void 0;
const graphql_1 = require("@octokit/graphql");
class GhClient {
    token;
    constructor(token) {
        this.token = token;
    }
    async searchCode(keyword) {
        const graphqlWithAuth = graphql_1.graphql.defaults({
            headers: {
                authorization: `token ${this.token}`,
            },
        });
        try {
            return await graphqlWithAuth(`
      query {
        search(query: "${keyword}", first:100, type:REPOSITORY) {
          repositoryCount
          nodes {
            ... on Repository {
              url
              name
            }
          }
        }
      }`);
        }
        catch (e) {
            if (e instanceof graphql_1.GraphqlResponseError) {
                console.error(JSON.stringify(e.errors));
            }
            throw e;
        }
    }
}
exports.GhClient = GhClient;
