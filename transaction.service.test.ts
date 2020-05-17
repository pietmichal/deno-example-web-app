import { Account } from "./account.model.ts";
import { TransactionService } from "./transaction.service.ts";
import {
  assertEquals,
  assert,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { TransactionTopic } from "./transaction.topic.ts";

Deno.test("transfers money from one account to another", () => {
  const acc1 = new Account("test1", 1000);
  const acc2 = new Account("test2", 1000);
  new TransactionService(new TransactionTopic()).transferMoney(100, acc1, acc2);
  assertEquals(acc1.money, 900);
  assertEquals(acc2.money, 1100);
});

Deno.test("transfer fails if sender has insufficient funds", () => {
  const acc1 = new Account("test1", 999);
  const acc2 = new Account("test2", 1000);
  assertThrows(() =>
    new TransactionService(new TransactionTopic()).transferMoney(
      1000,
      acc1,
      acc2,
    )
  );
  assertEquals(acc1.money, 999);
  assertEquals(acc2.money, 1000);
});

Deno.test("publishes an event to transaction topic", () => {
  const acc1 = new Account("test1", 1000);
  const acc2 = new Account("test2", 1000);
  const topic = new TransactionTopic();
  let called = false;
  topic.subscribe((amount, from, to) => {
    called = true;
    assertEquals(amount, 100);
    assertEquals(from, "test1");
    assertEquals(to, "test2");
  });
  new TransactionService(topic).transferMoney(100, acc1, acc2);
  assert(called);
});
