export interface GhSearchCodeRes {
    search: {
        repositoryCount: number;
        nodes: {
            url: string;
            name: string;
        }[];
    };
}
export declare class GhClient {
    private token;
    constructor(token: string);
    searchCode(keyword: string): Promise<GhSearchCodeRes>;
}
