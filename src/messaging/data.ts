export interface MessageDataMetadata {
  causationMessageStreamName: string;
  causationMessagePosition: number;
  causationMessageGlobalPosition: number;
  correlationStreamName: string;
  replyStreamName: string;
  schemaVersion: string;
}

export interface MessageData {
  id: string;
  type: string;
  streamName: string;
  position: number;
  globalPosition: number;
  data: any;
  metadata: MessageDataMetadata;
  time: Date;
}
