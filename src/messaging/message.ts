import metadata from "@mbriggs/metadata";
import { getClassName } from "@mbriggs/inspect";

import * as stream from "../stream";
import * as attributes from "../attributes";

import { MessageData } from "./data";
import { MessageMetadata } from "./message/message-metadata";

export class Message {
  static follow<T extends Message>(other: T, copy?: attributes.CopyAttribute[]) {
    let next: any = new this();

    attributes.copy(other, next, copy);

    next.metadata().follow(other.metadata());

    return next;
  }

  static build(previous: Message) {
    if (previous) {
      return this.follow(previous);
    } else {
      return new this();
    }
  }

  static fromMessageData<T extends Message>(data: MessageData): T {
    if (this.name !== data.type) {
      throw new Error(`Cannot create ${this.name} from ${data.type}`);
    }

    let msg = new this();
    let metadata = msg.metadata();

    attributes.set(msg, data.data);
    metadata.read(data);

    return msg as any;
  }

  metadata(): MessageMetadata {
    return metadata(this, MessageMetadata);
  }

  messageIdentifier() {
    let metadata = this.metadata();

    if (!metadata.streamName || !metadata.position) {
      return "";
    }

    return `${metadata.streamName}/${metadata.position}`;
  }

  causationMessageIdentifier() {
    let metadata = this.metadata();

    if (!metadata.causationMessageStreamName || !metadata.causationMessagePosition) {
      return "";
    }

    return `${metadata.causationMessageStreamName}/${metadata.causationMessagePosition}`;
  }

  correlate(streamName: string) {
    this.metadata().correlationStreamName = streamName;
  }

  follows(other: Message) {
    let m = this.metadata();
    let o = other.metadata();

    return (
      m.causationMessageStreamName == o.streamName &&
      !!m.causationMessageStreamName &&
      m.causationMessagePosition == o.position &&
      m.causationMessageGlobalPosition == o.globalPosition &&
      m.replyStreamName == o.replyStreamName
    );
  }

  correlated(streamName: string) {
    let metadata = this.metadata();
    if (!metadata.correlationStreamName) {
      return false;
    }

    let correlationStreamName = metadata.correlationStreamName;

    if (stream.isCategory(streamName)) {
      correlationStreamName = stream.getCategory(correlationStreamName);
    }

    return correlationStreamName === streamName;
  }

  toMessageData(): MessageData {
    let data = attributes.getAll(this);
    let type = getClassName(this);

    let msg: any = { data, type };

    this.metadata().write(msg);

    return msg;
  }
}
