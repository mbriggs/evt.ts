import * as stream from "./stream";
import { Handler } from "./interfaces";
import { MessageData } from "./messaging";

export async function startConsumer(
  consumer: AsyncGenerator<MessageData>,
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
export * from "./interfaces";
export * from "./host";
export { Dispatcher } from "./handler";

export { stream };
