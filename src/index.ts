import * as stream from "./stream";
import * as mdb from "./message-db";
import { Handler } from "@mbriggs/evt/handler";

export async function startConsumer(
  consumer: AsyncGenerator<mdb.Message>,
  ...handlers: Handler[]
) {
  for await (let msg of consumer) {
    for (let handler of handlers) {
      await handler(msg, null);
    }
  }
}

export * from "./attributes";
export * from "./messaging";
export * from "./handler";
export * from "./interfaces";
export * from "./host";

export { stream };
