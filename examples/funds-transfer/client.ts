import { Message, Timestamp, Write, stream, RandomID } from "@mbriggs/evt";
import { Transfer } from "@mbriggs/funds-transfer-component/commands";

const commandStreamName = (id: string) =>
  stream.name({ category: "fundsTransfer", type: "command", id });

export interface TransferParams {
  fundsTransferId?: string;
  withdrawalAccountId: string;
  depositAccountId: string;
  amount: number;
  previousMessage?: Message;
}
export async function withdraw(
  write: Write,
  identifier: RandomID,
  timestamp: Timestamp,
  {
    fundsTransferId,
    withdrawalAccountId,
    depositAccountId,
    amount,
    previousMessage,
  }: TransferParams
) {
  let transfer = Transfer.build(previousMessage);
  transfer.fundsTransferId = fundsTransferId || identifier();
  transfer.withdrawalAccountId = withdrawalAccountId;
  transfer.depositAccountId = depositAccountId;
  transfer.amount = amount;
  transfer.time = timestamp();

  let streamName = commandStreamName(fundsTransferId);

  await write(transfer, streamName);

  return transfer;
}
