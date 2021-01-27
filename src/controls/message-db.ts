import { partial } from "lodash";
import * as mdb from "../message-db";
import * as dbc from "./db";

import * as message from "./message-db/message";

export { message };

export function settings(): mdb.Settings {
  return {
    batchSize: null,
    condition: null,
    correlation: null,
    groupMember: null,
    groupSize: null,
  };
}

export async function get(): Promise<mdb.Get> {
  let exec = await dbc.exec();
  let s = settings();

  return partial(mdb.get, exec, s);
}

export async function getLast(): Promise<mdb.GetLast> {
  let exec = await dbc.exec();
  let s = settings();

  return partial(mdb.getLast, exec, s);
}

export async function put(): Promise<mdb.Put> {
  let exec = await dbc.exec();
  let s = settings();

  return partial(mdb.put, exec);
}

export async function iterate(): Promise<mdb.Iterate> {
  let g = await get();

  return partial(mdb.iterate, g);
}
