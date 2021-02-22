import { stream, Write } from "@mbriggs/evt";

import Withdraw from "../../commands/withdraw";
import Deposit from "../../commands/deposit";

import { Context } from "@mbriggs/context";
import * as attempt from "@mbriggs/attempt";
import { ExpectedVersionError } from "@mbriggs/evt";

export const transactionStreamName = (id) =>
  stream.name({ id, category: "accountTransaction" });

export async function deposit(write: Write, deposit: Deposit, ctx: Context) {
  let accountId = deposit.accountId;

  deposit = Deposit.follow(deposit);

  let streamName = transactionStreamName(accountId);

  await attempt.run(ExpectedVersionError, () => write.initial(ctx, deposit, streamName));
}

export async function withdraw(write: Write, withdraw: Withdraw, ctx: Context) {
  let accountId = withdraw.accountId;

  withdraw = Withdraw.follow(withdraw);

  let streamName = transactionStreamName(accountId);

  await attempt.run(ExpectedVersionError, () => write.initial(ctx, withdraw, streamName));
}
