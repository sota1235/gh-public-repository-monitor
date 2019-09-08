// @see https://developer.github.com/v3/search/#search-code
interface GhSearchCodeRes {
  total_count: number;
  items: Array<{
    repository: {
      name: string;
    };
    url: string;
  }>;
}

declare module 'gh-got';
