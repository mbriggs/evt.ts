import * as mdb from "../message-db";
import { Message } from "./message";
import { partial } from "lodash";
import { log } from "./logging";

export interface Write {
  (stream: string, msg: Message, expectedVersion?: number): Promise<any>;

  initial(stream: string, msg: Message): Promise<any>;
}

export function writer(put: mdb.Put): Write {
  let writer: any = partial(write, put);

  writer.initial = (stream: string, batch: Message | Array<Message>) =>
    writer(stream, batch, -1);

  return writer;
}

export function write(
  put: mdb.Put,
  stream: string,
  batch: Message | Array<Message>,
  expectedVersion: number = null
) {
  let data: mdb.Message | mdb.Message[];
  if (Array.isArray(batch)) {
    data = batch.map((m) => m.toMessageDB());
  } else {
    log(`writing message`);
    data = batch.toMessageDB();
  }

  return put(data, stream, expectedVersion);
}
