import { attribute } from "../attributes";
import { Message } from "../messaging";

import * as mdbc from "./message-db";
import * as mdatac from "./message-data";

import { field1, field2, field3 } from "./data";
export { field1, field2, field3 };

export class MySourceMessage extends Message {
  @attribute() field1: string;
  @attribute() field2: string;
  nonAttribute: string;
}

export class MyMessage extends Message {
  @attribute() field1: string;
  @attribute() field2: string;
  @attribute() field3: string;
  nonAttribute: string;
}

export function sourceExample() {
  let msg = newSourceExample();

  let data = mdatac.example();
  msg.metadata().read(data);

  return msg;
}

export function newSourceExample() {
  let msg = new MySourceMessage();
  msg.field1 = field1();
  msg.field2 = field2();
  msg.nonAttribute = "not an attribute";

  return msg;
}

export function example() {
  let msg = new MyMessage();
  msg.field1 = field1();
  msg.field2 = field2();
  msg.field3 = field3();

  return msg;
}
