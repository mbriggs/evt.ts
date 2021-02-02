import { Dispatcher, ReadEntity, Write } from "@mbriggs/evt";
import * as acc from "@mbriggs/account-component/events";
import { partial } from "lodash";
import FundsTransfer from "@mbriggs/funds-transfer-component/funds-transfer";

import {
  accountDeposited,
  accountWithdrawalRejected,
  accountWithdrawn,
} from "@mbriggs/funds-transfer-component/handler/account-events/account-balance-events";

export function accountEventsHandler(read: ReadEntity<FundsTransfer>, write: Write) {
  const timestamp = () => new Date().toISOString();

  let h = new Dispatcher();
  h.handle(acc.Withdrawn, partial(accountWithdrawn, read, write, timestamp));
  h.handle(acc.Deposited, partial(accountDeposited, read, write, timestamp));
  h.handle(acc.WithdrawalRejected, partial(accountWithdrawalRejected, read, write, timestamp));

  return h.handler();
}
