import { graphql, GraphqlResponseError } from '@octokit/graphql';

export interface GhSearchCodeRes {
  data: {
    search: {
      repositoryCount: number;
      nodes: {
        url: string;
        name: string;
      }[];
    };
  };
}

export class GhClient {
  constructor(private token: string) {}

  public async searchCode(keyword: string): Promise<GhSearchCodeRes> {
    const graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token ${this.token}`,
      },
    });

    try {
      // FIXME: replace query with a proper query
      return await graphqlWithAuth<GhSearchCodeRes>(
        `
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
      }`,
      );
    } catch (e) {
      if (e instanceof GraphqlResponseError) {
        console.error(JSON.stringify(e.errors));
      }

      throw e;
    }
  }
}
