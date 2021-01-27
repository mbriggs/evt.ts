export type Exec = (text: string, values: any[]) => Promise<any>;

export type Get = (streamName: string, position?: number) => Promise<Message[]>;
export type GetLast = (streamName: string) => Promise<Message>;
export type Put = (
  batch: Message[] | Message,
  streamName: string,
  expectedVersion?: number
) => Promise<Message>;
export type Iterate = (streamName: string, position?: number) => AsyncGenerator<Message>;

export class ExpectedVersionError extends Error {}

export interface Metadata {
  causationMessageStreamName: string;
  causationMessagePosition: number;
  causationMessageGlobalPosition: number;
  correlationStreamName: string;
  replyStreamName: string;
  schemaVersion: string;
}

export interface Message {
  id: string;
  type: string;
  streamName: string;
  position: number;
  globalPosition: number;
  data: any;
  metadata: Metadata;
  time: Date;
}

export interface Settings {
  batchSize: number;
  correlation: string;
  groupMember: string;
  groupSize: number;
  condition: string;
}
