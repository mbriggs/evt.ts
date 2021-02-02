import { RandomID, ReadEntity, stream, Timestamp, Write } from "@mbriggs/evt";
import FundsTransfer from "@mbriggs/funds-transfer-component/funds-transfer";
import { Transfer } from "@mbriggs/funds-transfer-component/commands";
import { Initiated } from "@mbriggs/funds-transfer-component/events";

const transferStreamName = (id) => stream.name({ id, category: "fundsTransfer" });

export async function transfer(
  read: ReadEntity<FundsTransfer>,
  write: Write,
  identifier: RandomID,
  timestamp: Timestamp,
  transfer: Transfer
) {
  let fundsTransferId = transfer.fundsTransferId;

  let [fundsTransfer, _] = await read(fundsTransferId);

  if (fundsTransfer.hasInitiated()) {
    return;
  }

  let initiated = Initiated.follow(transfer);

  initiated.withdrawalId = identifier();
  initiated.depositId = identifier();

  initiated.processedTime = timestamp();

  let streamName = transferStreamName(fundsTransferId);

  initiated.correlate(streamName);

  await write.initial(initiated, streamName);
}
