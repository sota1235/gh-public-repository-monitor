import { graphql } from '@octokit/graphql';

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
    return await graphqlWithAuth<GhSearchCodeRes>(
      `
      query {
        search(query:"${keyword}", first:100, type:REPOSITORY) {
          repositoryCount
          nodes {
            ... on Repository {
              url
              name
            }
        }
      }
      `,
    );
  }
}
