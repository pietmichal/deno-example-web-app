import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

// Note: This is just an example demonstrating the e2e test possibilities of vanilla Deno.

// Issue 1: The accounts are hardcoded in the app and e2e assume their existence.
//          Not the best design. ;)

// Issue 2: Test failure doesn't close the app.

// Note: Starting the app from the test runner itself. Neat.
Deno.run({
  cmd: [
    "deno",
    "run",
    "--allow-net",
    "app.ts",
  ],
});

Deno.test("can fetch all accounts from the system", async () => {
  // Note: Assuming that 2 accounts exist in the system.
  const response = await fetch("http://localhost:8080/getAccounts");
  const json = await response.json();
  assertEquals(json.length, 2);
});

Deno.test("can transfer money from one account to another", async () => {
  const post = await fetch(
    "http://localhost:8080/transferMoney",
    {
      method: "POST",
      body: JSON.stringify({ amount: 100, from: "Steve", to: "Jennifer" }),
    },
  );

  // Note: Without awaiting text Deno complains about leaking resources.
  await post.text();

  const response = await fetch("http://localhost:8080/getAccounts");
  const json = await response.json();

  assertEquals(
    json,
    [{ name: "Steve", money: 9900 }, { name: "Jennifer", money: 15100 }],
  );
});
