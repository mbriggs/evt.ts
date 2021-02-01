import { stream, Write } from "@mbriggs/evt";

import Withdraw from "../../commands/withdraw";
import Deposit from "../../commands/deposit";

export const transactionStreamName = (id) =>
  stream.name({ id, category: "accountTransaction" });

export async function deposit(write: Write, deposit: Deposit) {
  let accountId = deposit.accountId;

  deposit = Deposit.follow(deposit);

  let streamName = transactionStreamName(accountId);

  // todo: needs try
  await write.initial(deposit, streamName);
}

export async function withdraw(write: Write, withdraw: Withdraw) {
  let accountId = withdraw.accountId;

  withdraw = Withdraw.follow(withdraw);

  let streamName = transactionStreamName(accountId);

  await write.initial(withdraw, streamName);
}
