import { assert, assertThrows } from "https://deno.land/std/testing/asserts.ts";
import { transferMoneyValidator } from "./transferMoney.validator.ts";

Deno.test("accepts valid body", () => {
  assert(transferMoneyValidator({ amount: 1000, from: "Steve", to: "Jan" }));
});

Deno.test("throws an error when body is invalid", () => {
  assertThrows(() => transferMoneyValidator("i am a string!"));
});

Deno.test("throws an error when body is incomplete", () => {
  assertThrows(() => transferMoneyValidator({ from: "Steve", to: "Jan" }));
});

Deno.test("throws an error when amount is negative", () => {
  assertThrows(() =>
    transferMoneyValidator({ amount: -1, from: "Steve", to: "Jan" })
  );
});

Deno.test("throws an error when amount is 0", () => {
  assertThrows(() =>
    transferMoneyValidator({ amount: 0, from: "Steve", to: "Jan" })
  );
});
