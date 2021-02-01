export default class Account {
  id: string;
  customerId: string;
  balance: number = 0;
  openedTime: Date;
  closedTime: Date;
  sequence: number;

  isOpen() {
    return !!this.openedTime;
  }

  isClosed() {
    return !!this.closedTime;
  }

  deposit(amount: number) {
    this.balance += amount;
  }

  withdraw(amount: number) {
    this.balance -= amount;
  }

  hasSufficientFunds(amount: number) {
    return this.balance >= amount;
  }

  hasProcessed(messageSequence: number) {
    if (messageSequence === null) {
      return false;
    }

    return this.sequence >= messageSequence;
  }
}
