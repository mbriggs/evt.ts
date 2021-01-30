import { metadata } from "../metadata";
import { MessageData } from "./message-data";

import * as mdb from "../message-db";
import * as stream from "../stream";
import * as attributes from "../attributes";
import { getClassName } from "@mbriggs/evt/inspect";

export class Message {
  static follow<T extends Message>(other: T) {
    let next: any = new this();

    for (let prop of attributes.list(other)) {
      if (!attributes.has(next, prop)) {
        continue;
      }
      next[prop] = other[prop];
    }

    next.metadata().follow(other.metadata());

    return next;
  }

  static fromMessageDB<T extends Message>(data: mdb.Message): T {
    if (this.name !== data.type) {
      throw new Error(`Cannot create ${this.name} from ${data.type}`);
    }

    let msg = new this();
    let metadata = msg.metadata();

    attributes.set(msg, data.data);
    metadata.read(data);

    return msg as any;
  }

  metadata(): MessageData {
    return metadata(this, MessageData);
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

  get sequence() {
    return this.metadata().globalPosition;
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

  toMessageDB(): mdb.Message {
    let data = attributes.getAll(this);
    let type = getClassName(this);

    let msg: any = { data, type };

    this.metadata().write(msg);

    return msg;
  }
}
