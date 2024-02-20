export class SlackClient {
  constructor(private webhHookURL: string) {}

  public async post(message: string): Promise<void> {
    await fetch(this.webhHookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: message,
      }),
    });
  }
}
