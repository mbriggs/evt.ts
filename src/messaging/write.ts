import { partial } from "lodash";

import { Message } from "./message";
import { log } from "./logging";
import { Put } from "./storage";
import { MessageData } from "./data";

export interface Write {
  (msg: Message, stream: string, expectedVersion?: number): Promise<any>;

  initial(msg: Message, stream: string): Promise<any>;
}

export function writer(put: Put): Write {
  let writer: any = partial(write, put);

  writer.initial = (stream: string, batch: Message | Array<Message>) =>
    writer(stream, batch, -1);

  return writer;
}

export function write(
  put: Put,
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

  return put(data, stream, expectedVersion);
}
