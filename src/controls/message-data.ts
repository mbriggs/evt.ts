import { v4 as uuid } from "uuid";

import * as data from "./data";
import * as metadata from "./metadata";
import * as time from "./time";
import * as stream from "./stream";
import { MessageData } from "../messaging";

export function example(): MessageData {
  return {
    id: id(),
    type: type(),
    streamName: stream.example(),
    position: position(),
    globalPosition: globalPosition(),
    data: data.example(),
    metadata: metadata.example(),
    time: time.example(),
  };
}

export function alternate(): MessageData {
  return { ...example(), data: data.alternate() };
}

export function newExample(): MessageData {
  return {
    id: id(),
    type: type(),
    streamName: null,
    position: null,
    globalPosition: null,
    data: data.example(),
    metadata: metadata.example(),
    time: null,
  };
}

export function examples(streamName: string, amount: number): MessageData[] {
  let results = [];

  for (let position = 0; position < amount; position += 1) {
    let m = example();
    m.id = id();
    m.position = position;
    m.streamName = streamName;

    results.push(m);
  }

  return results;
}

export function type() {
  return "MyMessage";
}

export function position() {
  return 10;
}

export function globalPosition() {
  return 20;
}

export function id() {
  return uuid();
}
