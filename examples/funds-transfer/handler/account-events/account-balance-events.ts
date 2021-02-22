import { ReadEntity, stream, Timestamp, Write } from "@mbriggs/evt";
import FundsTransfer from "@mbriggs/funds-transfer-component/funds-transfer";
import {
  Withdrawn as AccountWithdrawn,
  Deposited as AccountDeposited,
  WithdrawalRejected as AccountWithdrawalRejected,
} from "@mbriggs/account-component/events";
import { Cancelled, Deposited, Withdrawn } from "@mbriggs/funds-transfer-component/events";
import { Context } from "@mbriggs/context";

const transferStreamName = (id: string) => stream.name({ category: "fundsTransfer", id });

export async function accountWithdrawn(
  read: ReadEntity<FundsTransfer>,
  write: Write,
  timestamp: Timestamp,
  accountWithdrawn: AccountWithdrawn,
  ctx: Context
) {
  let correlationStreamName = accountWithdrawn.metadata().correlationStreamName;
  let fundsTransferId = stream.getId(correlationStreamName);

  let [fundsTransfer, version] = await read(ctx, fundsTransferId);

  if (fundsTransfer.hasWithdrawn()) {
    return;
  }

  let withdrawn = Withdrawn.follow(accountWithdrawn);

  withdrawn.fundsTransferId = fundsTransferId;
  withdrawn.processedTime = timestamp();

  let streamName = transferStreamName(fundsTransferId);

  await write(ctx, withdrawn, streamName, version);
}

export async function accountDeposited(
  read: ReadEntity<FundsTransfer>,
  write: Write,
  timestamp: Timestamp,
  accountDeposited: AccountDeposited,
  ctx: Context
) {
  let correlationStreamName = accountDeposited.metadata().correlationStreamName;
  let fundsTransferId = stream.getId(correlationStreamName);

  let [fundsTransfer, version] = await read(ctx, fundsTransferId);

  if (fundsTransfer.hasDeposited()) {
    return;
  }

  let deposited = Deposited.follow(accountDeposited);

  deposited.fundsTransferId = fundsTransferId;
  deposited.processedTime = timestamp();

  let streamName = transferStreamName(fundsTransferId);

  await write(ctx, deposited, streamName, version);
}

export async function accountWithdrawalRejected(
  read: ReadEntity<FundsTransfer>,
  write: Write,
  timestamp: Timestamp,
  accountWithdrawalRejected: AccountWithdrawalRejected,
  ctx: Context
) {
  let correlationStreamName = accountWithdrawalRejected.metadata().correlationStreamName;
  let fundsTransferId = stream.getId(correlationStreamName);

  let [fundsTransfer, version] = await read(ctx, fundsTransferId);

  if (fundsTransfer.hasCancelled()) {
    return;
  }

  let cancelled = Cancelled.follow(accountWithdrawalRejected);
  cancelled.withdrawalAccountId = cancelled.accountId;
  cancelled.fundsTransferId = fundsTransferId;
  cancelled.depositAccountId = fundsTransfer.depositAccountId;

  let streamName = transferStreamName(fundsTransferId);

  await write(ctx, cancelled, streamName, version);
}
