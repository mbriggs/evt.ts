import { MessageData } from "./data";
import { Context } from "@mbriggs/context";

export type Get = (
  ctx: Context,
  streamName: string,
  position?: number
) => Promise<MessageData[]>;

export type GetLast = (ctx: Context, streamName: string) => Promise<MessageData>;

export type Put = (
  ctx: Context,
  batch: MessageData[] | MessageData,
  streamName: string,
  expectedVersion?: number
) => Promise<MessageData>;

export type Iterate = (
  ctx: Context,
  streamName: string,
  position?: number
) => AsyncGenerator<MessageData>;
