# Deno Example Web App

My quick Sunday evening project demonstrating possibilites of vanilla Deno v1.0.

From my observation, programmers can start using TypeScript, TDD, acceptance tests without ceremonies and be satisfied with the standard library that Deno provides. 

If I wasn't going for vanilla implementation then I'd look for higher-level abstraction for http endpoints.

Also, testing part of standard library would benefit from spies and auto mocking utils.

This is a web app that allows transfering fictional money between accounts.

I'm not planning to touch this project again unless, for some odd reason, there is demand. ¯\_(ツ)_/¯

**Deno is awesome.**

## Endpoints

`[GET] /getAccounts` - returns a list of accounts available in the app.

`[POST] /transferMoney` - transfers money from one account to another. 
It expects json body e.g `{ amount: 100, from: "Steve", to: "John" }`.

### Running the app

`deno --allow-net app.ts`

### Running programmer tests

`deno test`

### Running e2e tests

Starts the app process itself and executes e2e tests.

`deno --allow-run --allow-net app.e2e.ts` 

### Bundling

`deno bundle app.ts output.js` - Creates output.js file. It has top level async in it. Using babel or something similar could make it work in nodejs.

:shipit: