import * as stream from "./stream";
import { attribute } from "./attributes";
import { GetLast, Put, MessageData, Message } from "./messaging";

import { Context } from "@mbriggs/context";

export interface Settings {
  positionUpdateInterval: number;
}

export class Recorded extends Message {
  @attribute() position: number;
}

export async function retrieve(
  getLast: GetLast,
  ctx: Context,
  name: string,
  streamName: string
) {
  let posStream = positionStreamName(name, streamName);
  let existing = await getLast(ctx, posStream);

  return existing?.data?.position || -1;
}

export async function record(
  put: Put,
  settings: Settings,
  ctx: Context,
  name: string,
  lastWrite: number,
  msg: MessageData
) {
  if (!msg.streamName) {
    throw new Error(`message has no stream name: ${JSON.stringify(msg)}`);
  }

  let position = stream.isCategory(msg.streamName) ? msg.globalPosition : msg.position;

  if (!position) {
    throw new Error(`message has no position: ${JSON.stringify(msg)}`);
  }

  if (!(lastWrite + settings.positionUpdateInterval <= position)) {
    return lastWrite;
  }

  let streamName = positionStreamName(name, msg.streamName);
  let recorded = new Recorded();
  recorded.position = position;

  await put(ctx, recorded.toMessageData(), streamName);

  return position;
}

export function positionStreamName(streamName: string, name: string = null) {
  let id = stream.getId(streamName);
  let entity = stream.entity(streamName);
  let types = stream.getCategoryTypes(streamName);

  let hasPos = types.includes("position");

  if (!hasPos) {
    types.push("position");
  }

  if (name) {
    if (!id) {
      id = name;
    } else {
      id = `${id}-${name}`;
    }
  }

  let positionStreamName = stream.name({ category: entity, types, id });

  return positionStreamName;
}
