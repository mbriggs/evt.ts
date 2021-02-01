import { MessageData, MessageDataMetadata } from "../data";

export class MessageMetadata {
  metadata: MessageDataMetadata = {
    causationMessageStreamName: null,
    causationMessagePosition: null,
    causationMessageGlobalPosition: null,
    correlationStreamName: null,
    replyStreamName: null,
    schemaVersion: null,
  };

  id: string;
  streamName: string;
  position: number;
  globalPosition: number;
  time: Date;

  get causationMessageStreamName() {
    return this.metadata.causationMessageStreamName;
  }

  set causationMessageStreamName(val) {
    this.metadata.causationMessageStreamName = val;
  }

  get causationMessagePosition() {
    return this.metadata.causationMessagePosition;
  }

  set causationMessagePosition(val) {
    this.metadata.causationMessagePosition = val;
  }

  get causationMessageGlobalPosition() {
    return this.metadata.causationMessageGlobalPosition;
  }

  set causationMessageGlobalPosition(val) {
    this.metadata.causationMessageGlobalPosition = val;
  }

  get correlationStreamName() {
    return this.metadata.correlationStreamName;
  }

  set correlationStreamName(val) {
    this.metadata.correlationStreamName = val;
  }

  get replyStreamName() {
    return this.metadata.replyStreamName;
  }

  set replyStreamName(val) {
    this.metadata.replyStreamName = val;
  }

  get schemaVersion() {
    return this.metadata.schemaVersion;
  }

  set schemaVersion(val) {
    this.metadata.schemaVersion = val;
  }

  read(message: MessageData) {
    this.metadata = message.metadata;
    this.id = message.id;
    this.streamName = message.streamName;
    this.position = message.position;
    this.globalPosition = message.globalPosition;
    this.time = message.time;
  }

  write(message: MessageData) {
    message.metadata = this.metadata;
    message.id = this.id;
    message.streamName = this.streamName;
    message.position = this.position;
    message.globalPosition = this.globalPosition;
    message.time = this.time;
  }

  isPersisted() {
    return this.position != null && this.globalPosition != null && this.streamName != null;
  }

  follow(other: MessageMetadata) {
    if (!other.isPersisted()) {
      throw new Error("Could not follow unpersisted message");
    }

    this.causationMessageGlobalPosition = other.globalPosition;
    this.causationMessagePosition = other.position;
    this.causationMessageStreamName = other.streamName;

    this.correlationStreamName = other.correlationStreamName;
    this.replyStreamName = other.replyStreamName;
  }
}
