import { ReadEntity, stream, Timestamp, Write } from "@mbriggs/evt";
import Account from "../../account";

import Open from "../../commands/open";
import Close from "../../commands/close";

import Opened from "../../events/opened";
import Closed from "../../events/closed";
import { Context } from "@mbriggs/context";

export const streamName = (id) => stream.name({ id, category: "account" });

export async function open(
  read: ReadEntity<Account>,
  write: Write,
  timestamp: Timestamp,
  open: Open,
  ctx: Context
) {
  let accountId = open.accountId;

  let [account, version] = await read(ctx, accountId);

  if (account.isOpen()) {
    return;
  }

  let time = timestamp();

  let opened = Opened.follow(open);
  opened.processedTime = time;

  await write(ctx, opened, streamName(accountId), version);
}

export async function close(
  read: ReadEntity<Account>,
  write: Write,
  timestamp: Timestamp,
  close: Close,
  ctx: Context
) {
  let accountId = close.accountId;

  let [account, version] = await read(ctx, accountId);

  if (account.isClosed()) {
    return;
  }

  let time = timestamp();

  let closed = Closed.follow(close);
  closed.processedTime = time;

  await write(ctx, closed, streamName(accountId), version);
}
