import { Dispatcher, ReadEntity, Write } from "@mbriggs/evt";
import { partial } from "lodash";

import Open from "../commands/open";
import Close from "../commands/close";
import Deposit from "../commands/deposit";
import Withdraw from "../commands/withdraw";

import Account from "../account";

import { deposit, withdraw } from "./commands/account-balance";
import { close, open } from "./commands/account-state";

export function commandHandler(read: ReadEntity<Account>, write: Write) {
  const timestamp = () => new Date().toISOString();

  let h = new Dispatcher();
  h.handle(Open, partial(open, read, write, timestamp));
  h.handle(Close, partial(close, read, write, timestamp));
  h.handle(Deposit, partial(deposit, write));
  h.handle(Withdraw, partial(withdraw, write));

  return h.handler();
}
