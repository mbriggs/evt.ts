import { Iterate, MessageData } from "./messaging";
import { Context } from "@mbriggs/context";

export interface Settings {
  pollInterval: number;
}

export type UpdatePosition = (
  ctx: Context,
  name: string,
  lastPosition: number,
  msg: MessageData
) => Promise<number>;

export type RestorePosition = (
  ctx: Context,
  consumerName: string,
  streamName: string
) => Promise<number>;

export async function* consumer(
  iterate: Iterate,
  restorePosition: RestorePosition,
  updatePosition: UpdatePosition,
  settings: Settings,
  ctx: Context,
  consumerName: string,
  streamName: string
): AsyncGenerator<[MessageData, Context]> {
  let lastPosition = await restorePosition(ctx, consumerName, streamName);

  while (true) {
    for await (let msg of iterate(ctx, streamName, lastPosition + 1)) {
      yield [msg, ctx];
      lastPosition = await updatePosition(ctx, consumerName, lastPosition, msg);
    }

    await sleep(settings.pollInterval);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
