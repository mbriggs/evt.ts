import { Dispatcher, ReadEntity, stream, Write } from "@mbriggs/evt";
import { partial } from "lodash";

import Open from "../commands/open";
import Opened from "../events/opened";

import Close from "../commands/close";
import Closed from "../events/closed";

import Deposit from "../commands/deposit";
import Withdraw from "../commands/withdraw";
import Account from "../account";

const streamName = (id) => stream.name({ id, category: "account" });
const transactionStreamName = (id) => stream.name({ id, category: "accountTransaction" });
export type Timestamp = () => string;

export function commandHandler(read: ReadEntity<Account>, write: Write) {
  const timestamp = () => new Date().toISOString();

  let h = new Dispatcher();
  h.handle(Open, partial(open, read, write, timestamp));
  h.handle(Close, partial(close, read, write, timestamp));
  h.handle(Deposit, partial(deposit, write));
  h.handle(Withdraw, partial(withdraw, write));

  return h.handler();
}

export async function open(
  read: ReadEntity<Account>,
  write: Write,
  timestamp: Timestamp,
  open: Open
) {
  let accountId = open.accountId;

  let [account, version] = await read(accountId);

  if (account.isOpen()) {
    return;
  }

  let time = timestamp();

  let opened = Opened.follow(open);
  opened.processedTime = time;

  await write(opened, streamName(accountId), version);
}

export async function close(
  read: ReadEntity<Account>,
  write: Write,
  timestamp: Timestamp,
  close: Close
) {
  let accountId = close.accountId;

  let [account, version] = await read(accountId);

  if (account.isClosed()) {
    return;
  }

  let time = timestamp();

  let closed = Closed.follow(close);
  closed.processedTime = time;

  await write(closed, streamName(accountId), version);
}

export async function deposit(write: Write, deposit: Deposit) {
  let accountId = deposit.accountId;

  deposit = Deposit.follow(deposit);

  let streamName = transactionStreamName(accountId);

  // todo: needs try
  await write.initial(deposit, streamName);
}

export async function withdraw(write: Write, withdraw: Withdraw) {
  let accountId = withdraw.accountId;

  withdraw = Withdraw.follow(withdraw);

  let streamName = transactionStreamName(accountId);

  await write.initial(withdraw, streamName);
}
