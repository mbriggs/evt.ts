import { isCategory } from "../stream";
import { MessageData, Get } from "../messaging";

export async function* iterate(
  get: Get,
  streamName: string,
  position: number = null
): AsyncGenerator<MessageData> {
  while (true) {
    let messages = await get(streamName, position);

    if (messages.length == 0) {
      break;
    }

    let last = messages[messages.length - 1];
    position = isCategory(streamName) ? last.globalPosition : last.position;
    position += 1;

    for (let message of messages) {
      yield message;
    }
  }
}
