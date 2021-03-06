import { ReadEntity, stream, Timestamp, Write } from "@mbriggs/evt";

import Withdraw from "../../commands/withdraw";
import Deposit from "../../commands/deposit";

import Account from "../../account";
import Deposited from "../../events/deposited";
import WithdrawalRejected from "../../events/withdrawal-rejected";
import Withdrawn from "../../events/withdrawn";
import { Context } from "@mbriggs/context";

export const accountStreamName = (id) => stream.name({ id, category: "account" });

export async function deposit(
  read: ReadEntity<Account>,
  write: Write,
  timestamp: Timestamp,
  deposit: Deposit,
  ctx: Context
) {
  let accountId = deposit.accountId;

  let [account, version] = await read(ctx, accountId);

  let sequence = deposit.metadata().globalPosition;

  if (account.hasProcessed(sequence)) {
    return;
  }

  let time = timestamp();

  let deposited = Deposited.follow(deposit);
  deposited.processedTime = time;
  deposited.sequence = sequence;

  let streamName = accountStreamName(accountId);

  await write(ctx, deposit, streamName, version);
}

export async function withdraw(
  read: ReadEntity<Account>,
  write: Write,
  timestamp: Timestamp,
  withdraw: Withdraw,
  ctx: Context
) {
  let accountId = withdraw.accountId;

  let [account, version] = await read(ctx, accountId);

  let sequence = withdraw.metadata().globalPosition;

  if (account.hasProcessed(sequence)) {
    return;
  }

  let time = timestamp();

  let streamName = accountStreamName(accountId);

  if (!account.hasSufficientFunds(withdraw.amount)) {
    let withdrawalRejected = WithdrawalRejected.follow(withdraw);
    withdrawalRejected.processedTime = time;
    withdrawalRejected.sequence = sequence;

    await write(ctx, withdrawalRejected, streamName, version);

    return;
  }

  let withdrawn = Withdrawn.follow(withdraw);
  withdrawn.processedTime = time;
  withdrawn.sequence = sequence;

  await write(ctx, withdrawn, streamName, version);
}
