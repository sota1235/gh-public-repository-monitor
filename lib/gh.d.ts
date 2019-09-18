export declare class GhClient {
    private token;
    constructor(token: string);
    searchCode(keyword: string): Promise<GhSearchCodeRes>;
}
