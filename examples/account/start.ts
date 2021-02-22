import { startConsumer, Toolkit } from "@mbriggs/evt";
import * as context from "@mbriggs/context";
import { partial } from "lodash";

import Account from "./account";
import { accountProjection } from "./projection";

import { commandHandler } from "./handler/commands";
import { transactionCommandHandler } from "./handler/transaction-commands";

const name = "accountService";

export default async function start({ fetch, write, consumer }: Toolkit) {
  let ctx = context.background();
  let readAccount = partial(fetch, Account, accountProjection(), "account");

  let commands = startConsumer(
    consumer(ctx, name, "account:command"),
    commandHandler(readAccount, write)
  );

  let transactions = startConsumer(
    consumer(ctx, name, "accountTransaction"),
    transactionCommandHandler(readAccount, write)
  );

  await Promise.all([commands, transactions]);
}
