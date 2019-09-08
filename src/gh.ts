import ghGot from 'gh-got';

export class GhClient {
  constructor(private token: string) {}

  public async searchCode(keyword: string): Promise<GhSearchCodeRes> {
    const url = `search/code?q=${keyword}`;
    const { body } = await ghGot(url, { token: this.token });

    return body;
  }
}
