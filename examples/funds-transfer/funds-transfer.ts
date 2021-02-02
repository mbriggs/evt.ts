export default class FundsTransfer {
  id: string;
  withdrawalAccountId: string;
  depositAccountId: string;
  withdrawalId: string;
  depositId: string;
  amount: number;

  initiatedTime: Date;
  withdrawnTime: Date;
  depositedTime: Date;
  transferredTime: Date;
  cancelledTime: Date;

  hasInitiated() {
    return !!this.initiatedTime;
  }

  hasWithdrawn() {
    return !!this.withdrawnTime;
  }

  hasDeposited() {
    return !!this.depositedTime;
  }

  hasTransferred() {
    return !!this.transferredTime;
  }

  hasCancelled() {
    return !!this.cancelledTime;
  }
}
