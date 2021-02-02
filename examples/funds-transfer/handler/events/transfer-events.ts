import { ReadEntity, stream, Timestamp, Write } from "@mbriggs/evt";
import { DepositParams, WithdrawParams } from "@mbriggs/account-component";

import FundsTransfer from "../../funds-transfer";

import Deposited from "../../events/deposited";
import Withdrawn from "../../events/withdrawn";
import Initiated from "../../events/initiated";
import Transferred from "../../events/transferred";

type WithdrawClient = (params: WithdrawParams) => Promise<any>;
type DepositClient = (params: DepositParams) => Promise<any>;

const transferStreamName = (id) => stream.name({ id, category: "fundsTransfer" });

export async function initiated(withdraw: WithdrawClient, initiated: Initiated) {
  let accountId = initiated.withdrawalAccountId;
  let withdrawalId = initiated.withdrawalId;
  let amount = initiated.amount;

  await withdraw({
    withdrawalId,
    accountId,
    amount,
    previousMessage: initiated,
  });
}

export async function withdrawn(
  read: ReadEntity<FundsTransfer>,
  deposit: DepositClient,
  withdrawn: Withdrawn
) {
  let fundsTransferId = withdrawn.fundsTransferId;

  let [fundsTransfer, _] = await read(fundsTransferId);

  let accountId = fundsTransfer.depositAccountId;
  let depositId = fundsTransfer.depositId;
  let amount = fundsTransfer.amount;

  await deposit({
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
  deposited: Deposited
) {
  let fundsTransferId = deposited.fundsTransferId;

  let [fundsTransfer, version] = await read(fundsTransferId);

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

  await write(transferred, streamName, version);
}
