export declare class SlackClient {
    private webhHookURL;
    constructor(webhHookURL: string);
    post(message: string): Promise<void>;
}
