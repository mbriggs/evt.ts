import * as ent from "../entity";
import * as hnd from "../handler";
import { Cls, Handler } from "../interfaces";

import * as mesgc from "./message";
import * as mesgingc from "./messaging";
import * as streamc from "./stream";

import { partial } from "lodash";
import { Context, background } from "@mbriggs/context";

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

export async function fetch<T>(): Promise<
  (
    entity: Cls<T>,
    projection: Handler<T>,
    category: string,
    id: string
  ) => Promise<ent.Entry<MyEntity>>
> {
  let iterate = await mesgingc.iterate();
  return partial(fetchMemory(), iterate) as any;
}

export async function fetchControls(): Promise<
  (category: string, ctx: Context, id: string) => Promise<ent.Entry<MyEntity>>
> {
  let f = await fetch<MyEntity>();
  return partial(f, MyEntity, Dispatcher.handler()) as any;
}

export async function fetchUnique() {
  let ctx = background();
  let f = await fetchControls();
  let category = streamc.uniqueCategory();
  let id = streamc.uniqueId();

  return {
    category,
    id,
    stream: `${category}-${id}`,
    fetchEntity: partial(f, category, ctx, id) as () => Promise<ent.Entry<MyEntity>>,
  };
}
