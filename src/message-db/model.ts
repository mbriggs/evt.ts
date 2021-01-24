export type Exec = (text: string, values: any[]) => Promise<any>;

export class ExpectedVersionError extends Error {}

export interface Metadata {
  causationMessageStreamName: string;
  causationMessagePosition: number;
  causationMessageGlobalPosition: number;
  correlationStreamName: string;
  replyStreamName: string;
  time: Date;
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
