import { Dispatcher } from "@mbriggs/evt";
import Account from "./account";
import Opened from "./events/opened";
import Deposited from "./events/deposited";
import Withdrawn from "./events/withdrawn";
import WithdrawalRejected from "./events/withdrawal-rejected";
import Closed from "./events/closed";

export function accountProjection() {
  let d = new Dispatcher<Account>();
  d.handle(Opened, opened);
  d.handle(Deposited, deposited);
  d.handle(Withdrawn, withdrawn);
  d.handle(WithdrawalRejected, withdrawalRejected);
  d.handle(Closed, closed);
  return d.handler();
}

export function opened(opened: Opened, account: Account) {
  account.id = opened.accountId;
  account.customerId = opened.customerId;

  let openedTime = new Date(opened.time);

  account.openedTime = openedTime;
}

export function deposited(deposited: Deposited, account: Account) {
  account.id = deposited.accountId;

  let amount = deposited.amount;
  account.deposit(amount);

  account.sequence = deposited.sequence;
}

export function withdrawn(withdrawn: Withdrawn, account: Account) {
  account.id = withdrawn.accountId;

  let amount = withdrawn.amount;
  account.withdraw(amount);

  account.sequence = withdrawn.sequence;
}

export function withdrawalRejected(withdrawalRejected: WithdrawalRejected, account: Account) {
  account.id = withdrawalRejected.accountId;
}

export function closed(closed: Closed, account: Account) {
  let closedTime = new Date(closed.time);

  account.openedTime = closedTime;
}
