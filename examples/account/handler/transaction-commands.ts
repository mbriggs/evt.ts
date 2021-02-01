import { Dispatcher, ReadEntity, Write } from "@mbriggs/evt";
import { partial } from "lodash";

import Deposit from "../commands/deposit";
import Withdraw from "../commands/withdraw";

import Account from "../account";

import { deposit, withdraw } from "./transaction-commands/account-balance";

export function transactionCommandHandler(read: ReadEntity<Account>, write: Write) {
  const timestamp = () => new Date().toISOString();

  let h = new Dispatcher();
  h.handle(Deposit, partial(deposit, read, write, timestamp));
  h.handle(Withdraw, partial(withdraw, read, write, timestamp));

  return h.handler();
}
