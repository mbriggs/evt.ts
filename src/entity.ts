import * as mdb from "./message-db";
import * as stream from "./stream";
import { Cls, Handler, HandlerBuilder, toHandler } from "./handler";
import { cloneDeep } from "lodash";

export type Entry<T> = [T, number];

export interface Cache<T> {
  get(key: string): Entry<T> | undefined;
  set(key: string, value: Entry<T>): this;
}

export async function fetchEntity<T>(
  cache: Cache<T>,
  iterate: mdb.Iterate,
  Entity: Cls<T>,
  projection: Handler<T> | HandlerBuilder<T>,
  category: string,
  id: string
): Promise<Entry<T>> {
  let streamName = stream.name({ category, id });
  let project = toHandler(projection);

  let [entity, version] = cache.get(id) || [null, null];

  if (!entity) {
    entity = new Entity();
    version = -1;
  } else {
    version += 1;
  }

  for await (let msg of iterate(streamName, version)) {
    entity = cloneDeep(entity);
    await project(msg, entity);
    version = msg.position;
  }

  if (typeof version == "string") {
    version = parseInt(version, 10);
  }

  let entry: Entry<T> = [entity, version];

  cache.set(id, entry);

  return entry;
}
