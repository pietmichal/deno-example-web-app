import { Account } from "./account.model.ts";
import { TransactionTopic } from "./transaction.topic.ts";

export class TransactionService {
  constructor(private transactionTopic: TransactionTopic) {}
  public transferMoney(amount: number, from: Account, to: Account) {
    if (from.money - amount < 0) {
      throw new Error("Sender has insufficient funds.");
    }
    from.money -= amount;
    to.money += amount;
    this.transactionTopic.publish(amount, from.name, to.name);
  }
}
