export class SlackClient {
  constructor(private webHookURL: string) {}

  public async post(message: string): Promise<void> {
    await fetch(this.webHookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: message,
      }),
    });
  }
}
