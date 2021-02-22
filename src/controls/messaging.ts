import { Get, GetLast, Iterate, Put } from "../messaging";
import { partial } from "lodash";

import * as dbc from "@mbriggs/db/controls";
import * as mdbc from "./message-db";
import * as mdb from "../message-db";
import * as mesg from "../messaging";

export async function get(): Promise<Get> {
  let exec = await dbc.exec();
  let s = mdbc.settings();

  return partial(mdb.get, exec, s);
}

export async function getLast(): Promise<GetLast> {
  let exec = await dbc.exec();
  let s = mdbc.settings();

  return partial(mdb.getLast, exec, s);
}

export async function put(): Promise<Put> {
  let exec = await dbc.exec();

  return partial(mdb.put, exec);
}

export async function iterate(): Promise<Iterate> {
  let g = await get();

  return partial(mesg.iterate, g);
}
