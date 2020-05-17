import { Account } from "./account.model.ts";

export class AccountRepository {
  private accounts: Account[] = [];

  public add(account: Account) {
    this.accounts.push(account);
  }

  public getAll() {
    return this.accounts;
  }

  public get(name: string) {
    return this.accounts.find((acc) => acc.name === name);
  }
}
