import * as timec from "./time";
import * as mdb from "../message-db";

export function example(): mdb.Metadata {
  return {
    causationMessageStreamName: causationMessageStream(),
    causationMessagePosition: causationMessagePosition(),
    causationMessageGlobalPosition: causationMessageGlobalPosition(),
    correlationStreamName: correlationStreamName(),
    replyStreamName: replyStreamName(),
    time: time(),
    schemaVersion: schemaVersion(),
  };
}

export function causationMessageGlobalPosition() {
  return 15;
}

export function causationMessagePosition() {
  return 5;
}

export function causationMessageStream() {
  return "causationStream";
}

export function correlationStreamName() {
  return "correlationStream";
}

export function replyStreamName() {
  return "replyStream";
}

export function schemaVersion() {
  return "1";
}

export function time() {
  return timec.example();
}
