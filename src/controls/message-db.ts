import { partial } from "lodash";
import * as mdb from "../message-db";
import * as dbc from "./db";

import * as message from "./message-db/message";
import { Get, GetLast, Iterate, Put } from "@mbriggs/evt/interfaces";

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

export async function get(): Promise<Get> {
  let exec = await dbc.exec();
  let s = settings();

  return partial(mdb.get, exec, s);
}

export async function getLast(): Promise<GetLast> {
  let exec = await dbc.exec();
  let s = settings();

  return partial(mdb.getLast, exec, s);
}

export async function put(): Promise<Put> {
  let exec = await dbc.exec();

  return partial(mdb.put, exec);
}

export async function iterate(): Promise<Iterate> {
  let g = await get();

  return partial(mdb.iterate, g);
}
