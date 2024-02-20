export declare class SlackClient {
    private webHookURL;
    constructor(webHookURL: string);
    post(message: string): Promise<void>;
}
