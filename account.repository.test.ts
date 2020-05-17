import { AccountRepository } from "./account.repository.ts";
import {
  assertEquals,
  assertStrictEq,
} from "https://deno.land/std/testing/asserts.ts";
import { Account } from "./account.model.ts";

Deno.test("persists accounts and allows to retrieve them", () => {
  const repo = new AccountRepository();
  const steve = new Account("Steve", 1000);
  repo.add(steve);
  repo.add(new Account("John", 1000));
  repo.add(new Account("Dan", 1000));
  assertEquals(repo.getAll().length, 3);
  assertStrictEq(repo.get("Steve"), steve);
});
