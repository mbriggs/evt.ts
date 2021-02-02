import { Dispatcher, ReadEntity, Write } from "@mbriggs/evt";
import * as account from "@mbriggs/account-component";
import { partial } from "lodash";
import FundsTransfer from "@mbriggs/funds-transfer-component/funds-transfer";
import { Deposited, Initiated, Withdrawn } from "@mbriggs/funds-transfer-component/events";
import {
  deposited,
  initiated,
  withdrawn,
} from "@mbriggs/funds-transfer-component/handler/events/transfer-events";

export function eventsHandler(read: ReadEntity<FundsTransfer>, write: Write) {
  const timestamp = () => new Date().toISOString();
  let withdrawClient = partial(account.withdraw, write, timestamp);
  let depositClient = partial(account.deposit, write, timestamp);

  let h = new Dispatcher();
  h.handle(Initiated, partial(initiated, withdrawClient));
  h.handle(Withdrawn, partial(withdrawn, read, depositClient));
  h.handle(Deposited, partial(deposited, read, write, timestamp));

  return h.handler();
}
