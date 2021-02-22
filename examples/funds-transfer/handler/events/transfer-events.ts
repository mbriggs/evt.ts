import { ReadEntity, stream, Timestamp, Write } from "@mbriggs/evt";
import { DepositParams, WithdrawParams } from "@mbriggs/account-component";

import FundsTransfer from "../../funds-transfer";

import Deposited from "../../events/deposited";
import Withdrawn from "../../events/withdrawn";
import Initiated from "../../events/initiated";
import Transferred from "../../events/transferred";

import { Context } from "@mbriggs/context";

type WithdrawClient = (ctx: Context, params: WithdrawParams) => Promise<any>;
type DepositClient = (ctx: Context, params: DepositParams) => Promise<any>;

const transferStreamName = (id) => stream.name({ id, category: "fundsTransfer" });

export async function initiated(withdraw: WithdrawClient, initiated: Initiated, ctx: Context) {
  let accountId = initiated.withdrawalAccountId;
  let withdrawalId = initiated.withdrawalId;
  let amount = initiated.amount;

  await withdraw(ctx, {
    withdrawalId,
    accountId,
    amount,
    previousMessage: initiated,
  });
}

export async function withdrawn(
  read: ReadEntity<FundsTransfer>,
  deposit: DepositClient,
  withdrawn: Withdrawn,
  ctx: Context
) {
  let fundsTransferId = withdrawn.fundsTransferId;

  let [fundsTransfer, _] = await read(ctx, fundsTransferId);

  let accountId = fundsTransfer.depositAccountId;
  let depositId = fundsTransfer.depositId;
  let amount = fundsTransfer.amount;

  await deposit(ctx, {
    depositId,
    accountId,
    amount,
    previousMessage: withdrawn,
  });
}

export async function deposited(
  read: ReadEntity<FundsTransfer>,
  write: Write,
  timestamp: Timestamp,
  deposited: Deposited,
  ctx: Context
) {
  let fundsTransferId = deposited.fundsTransferId;

  let [fundsTransfer, version] = await read(ctx, fundsTransferId);

  if (fundsTransfer.hasTransferred()) {
    return;
  }

  let transferred = Transferred.follow(deposited);
  transferred.withdrawalAccountId = fundsTransfer.withdrawalAccountId;
  transferred.depositAccountId = fundsTransfer.depositAccountId;
  transferred.withdrawalId = fundsTransfer.withdrawalId;
  transferred.depositId = fundsTransfer.depositId;
  transferred.processedTime = timestamp();

  let streamName = transferStreamName(fundsTransferId);

  await write(ctx, transferred, streamName, version);
}
