export class TransactionTopic {
  private subscribers: Array<
    (amount: number, from: string, to: string) => void
  > = [];

  public publish(amount: number, from: string, to: string) {
    this.subscribers.forEach((sub) => sub(amount, from, to));
  }

  public subscribe(fn: (amount: number, from: string, to: string) => void) {
    this.subscribers.push(fn);
  }
}
