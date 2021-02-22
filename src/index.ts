import * as stream from "./stream";
import { Handler } from "./interfaces";
import { MessageData } from "./messaging";
import { ExpectedVersionError } from "./expected-version-error";

import { Context } from "@mbriggs/context";

export async function startConsumer(
  consumer: AsyncGenerator<[MessageData, Context]>,
  ...handlers: Handler<Context>[]
) {
  for await (let [msg, ctx] of consumer) {
    for (let handler of handlers) {
      await handler(msg, ctx);
    }
  }
}

export * from "./attributes";
export * from "./messaging";
export * from "./interfaces";
export * from "./host";
export { Dispatcher } from "./handler";

export { stream, ExpectedVersionError };
