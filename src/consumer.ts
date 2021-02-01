import * as mdb from "./message-db";
import { Iterate } from "@mbriggs/evt/interfaces";

export interface Settings {
  pollInterval: number;
}

export type UpdatePosition = (
  name: string,
  lastPosition: number,
  msg: mdb.Message
) => Promise<number>;
export type RestorePosition = (consumerName: string, streamName: string) => Promise<number>;

export async function* consumer(
  iterate: Iterate,
  restorePosition: RestorePosition,
  updatePosition: UpdatePosition,
  settings: Settings,
  consumerName: string,
  streamName: string
) {
  let lastPosition = await restorePosition(consumerName, streamName);

  while (true) {
    for await (let msg of iterate(streamName, lastPosition + 1)) {
      yield msg;
      lastPosition = await updatePosition(consumerName, lastPosition, msg);
    }

    await sleep(settings.pollInterval);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
