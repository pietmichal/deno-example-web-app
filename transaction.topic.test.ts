import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";
import { TransactionTopic } from "./transaction.topic.ts";

Deno.test("fires transaction event to all subscribers", () => {
  const topic = new TransactionTopic();
  let subscriber1Called = false;
  let subscriber2Called = false;
  topic.subscribe(() => {
    subscriber1Called = true;
  });
  topic.subscribe(() => {
    subscriber2Called = true;
  });
  topic.publish(0, "test1", "test2");
  assert(subscriber1Called);
  assert(subscriber2Called);
});

Deno.test("subscriber receives information about the transaction", () => {
  const topic = new TransactionTopic();
  let subscriberCalled = false;
  topic.subscribe((amount, from, to) => {
    subscriberCalled = true;
    assertEquals(amount, 1337);
    assertEquals(from, "Angela");
    assertEquals(to, "Mike");
  });
  topic.publish(1337, "Angela", "Mike");
  assert(subscriberCalled);
});
