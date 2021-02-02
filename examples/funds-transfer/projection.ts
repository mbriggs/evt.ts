import { Dispatcher } from "@mbriggs/evt";
import FundsTransfer from "./funds-transfer";
import Initiated from "./events/initiated";
import Withdrawn from "./events/withdrawn";
import Deposited from "./events/deposited";
import Transferred from "./events/transferred";
import Cancelled from "./events/cancelled";

export function fundsTransferProjection() {
  let h = new Dispatcher<FundsTransfer>();
  h.handle(Initiated, initiated);
  h.handle(Withdrawn, withdrawn);
  h.handle(Deposited, deposited);
  h.handle(Transferred, transferred);
  h.handle(Cancelled, cancelled);

  return h.handler();
}

export function initiated(initiated: Initiated, transfer: FundsTransfer) {
  transfer.id = initiated.fundsTransferId;
  transfer.withdrawalAccountId = initiated.withdrawalAccountId;
  transfer.depositAccountId = initiated.depositAccountId;
  transfer.withdrawalId = initiated.withdrawalId;
  transfer.depositId = initiated.depositId;
  transfer.amount = initiated.amount;

  let initiatedTime = new Date(initiated.time);
  transfer.initiatedTime = initiatedTime;
}

export function withdrawn(withdrawn: Withdrawn, transfer: FundsTransfer) {
  transfer.id = withdrawn.fundsTransferId;

  let withdrawnTime = new Date(withdrawn.time);
  transfer.withdrawnTime = withdrawnTime;
}

export function deposited(deposited: Deposited, transfer: FundsTransfer) {
  transfer.id = deposited.fundsTransferId;

  let depositedTime = new Date(deposited.time);
  transfer.depositedTime = depositedTime;
}

export function transferred(transferred: Transferred, transfer: FundsTransfer) {
  transfer.id = transferred.fundsTransferId;

  let transferredTime = new Date(transferred.time);
  transfer.transferredTime = transferredTime;
}

export function cancelled(cancelled: Cancelled, transfer: FundsTransfer) {
  transfer.id = cancelled.fundsTransferId;

  let cancelledTime = new Date(cancelled.time);
  transfer.cancelledTime = cancelledTime;
}
