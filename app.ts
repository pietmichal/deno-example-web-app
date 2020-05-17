import { AccountRepository } from "./account.repository.ts";
import { TransactionTopic } from "./transaction.topic.ts";
import { Account } from "./account.model.ts";
import { TransactionService } from "./transaction.service.ts";
import { serve } from "https://deno.land/std/http/server.ts";
import { transferMoneyValidator } from "./transferMoney.validator.ts";

const topic = new TransactionTopic();
const transactionService = new TransactionService(topic);
const accountRepository = new AccountRepository();

accountRepository.add(new Account("Steve", 10000));
accountRepository.add(new Account("Jennifer", 15000));

topic.subscribe((amount, from, to) => {
  console.log(`${from} has sent ${to} $${amount}!`);
});

const s = serve({ port: 8080 });

for await (const req of s) {
  const headers = new Headers({ "Content-Type": "application/json" });

  if (req.method === "GET") {
    if (req.url === "/getAccounts") {
      const accounts = accountRepository.getAll();
      req.respond({ status: 200, body: JSON.stringify(accounts), headers });
      continue;
    }
  }

  // Note: Not the nicest way to handle post requests ;)
  if (req.method === "POST") {
    if (req.url === "/transferMoney") {
        
      // copied from deno docs
      const buf = new Uint8Array(req.contentLength!);
      let bufSlice = buf;
      let totRead = 0;
      while (true) {
        const nread = await req.body.read(bufSlice);
        if (nread === null) break;
        totRead += nread;
        if (totRead >= req.contentLength!) break;
        bufSlice = bufSlice.subarray(nread);
      }
      // end of snippet from deno docs

      try {
        const { from, to, amount } = transferMoneyValidator(
          JSON.parse(new TextDecoder("utf-8").decode(buf)),
        );

        const fromAccount = accountRepository.get(from);
        const toAccount = accountRepository.get(to);

        if (fromAccount && toAccount) {
          try {
            transactionService.transferMoney(amount, fromAccount, toAccount);
            req.respond({status: 200});
          } catch (e) {
            if (e.message === "Sender has insufficient funds.") {
              req.respond({ status: 400 });
              continue;
            }
            throw e;
          }
        } else {
          req.respond({ status: 400 });
          continue;
        }
      } catch (e) {
        if (e.message === "Validation error") {
          req.respond({ status: 400 });
          continue;
        }
        req.respond({ status: 500 });
        continue;
      }
      continue;
    }
  }

  req.respond({ status: 404 });
}
