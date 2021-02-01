import { MessageDataMetadata } from "../messaging";

export function example(): MessageDataMetadata {
  return {
    causationMessageStreamName: causationMessageStream(),
    causationMessagePosition: causationMessagePosition(),
    causationMessageGlobalPosition: causationMessageGlobalPosition(),
    correlationStreamName: correlationStreamName(),
    replyStreamName: replyStreamName(),
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
