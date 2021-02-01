import { MessageData } from "./data";

export type Get = (streamName: string, position?: number) => Promise<MessageData[]>;
export type GetLast = (streamName: string) => Promise<MessageData>;
export type Put = (
  batch: MessageData[] | MessageData,
  streamName: string,
  expectedVersion?: number
) => Promise<MessageData>;
export type Iterate = (streamName: string, position?: number) => AsyncGenerator<MessageData>;
