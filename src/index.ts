import * as stream from "./stream";
import { Handler } from "./handler";
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
export * from "./handler";
export * from "./interfaces";
export * from "./host";

export { stream };
