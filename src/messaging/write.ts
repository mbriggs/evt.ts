import { partial } from "lodash";

import { Message } from "./message";
import { log } from "./logging";
import { Put } from "./storage";
import { MessageData } from "./data";

import { Context } from "@mbriggs/context";

export interface Write {
  (ctx: Context, msg: Message, stream: string, expectedVersion?: number): Promise<any>;

  initial(ctx: Context, msg: Message, stream: string): Promise<any>;
}

export function writer(put: Put): Write {
  let writer: any = partial(write, put);

  writer.initial = (ctx: Context, stream: string, batch: Message | Array<Message>) =>
    writer(ctx, stream, batch, -1);

  return writer;
}

export function write(
  put: Put,
  ctx: Context,
  stream: string,
  batch: Message | Array<Message>,
  expectedVersion: number = null
) {
  let data: MessageData | MessageData[];
  if (Array.isArray(batch)) {
    data = batch.map((m) => m.toMessageData());
  } else {
    log(`writing message`);
    data = batch.toMessageData();
  }

  return put(ctx, data, stream, expectedVersion);
}
