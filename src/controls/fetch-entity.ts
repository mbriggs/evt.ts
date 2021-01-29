import * as ent from "../entity";
import * as hnd from "../handler";

import * as mdbc from "./message-db";
import * as mesgc from "./message";
import * as streamc from "./stream";

import { partial } from "lodash";
import * as mdb from "@mbriggs/evt/message-db";
import { Cls, Handler, HandlerBuilder } from "../handler";
import { Cache, Entry } from "../entity";

export class MyEntity {
  field1: string;
  field2: string;
  field3: string;
}

export const Dispatcher = new hnd.Dispatcher<MyEntity>();

Dispatcher.handle(mesgc.MyMessage, (msg, entity) => {
  entity.field1 = msg.field1;
  entity.field2 = msg.field2;
  entity.field3 = msg.field3;
});

export function fetchMemory() {
  return partial(ent.fetchEntity, new Map());
}

export async function fetch() {
  let iterate = await mdbc.iterate();
  return partial(fetchMemory(), iterate);
}

export async function fetchControls(): Promise<
  (category: string, id: string) => Promise<Entry<MyEntity>>
> {
  let f = await fetch();
  return partial(f, MyEntity, Dispatcher) as any;
}

export async function fetchUnique() {
  let f = await fetchControls();
  let category = streamc.uniqueCategory();
  let id = streamc.uniqueId();

  return { category, id, stream: `${category}-${id}`, fetchEntity: partial(f, category, id) };
}
