import { Exec, Settings, Context, Toolkit } from "./interfaces";
import { partial } from "lodash";
import * as mdb from "./message-db";
import * as mesg from "./messaging";
import * as pos from "./position";
import * as csmr from "./consumer";
import * as entity from "./entity";

export function messageDB(ctx: Context, exec: Exec, settings: Settings): Toolkit {
  let put = partial(mdb.put, exec);
  let write = mesg.writer(put);
  let get = partial(mdb.get, exec, settings);
  let iterate = partial(mdb.iterate, get);
  let getLast = partial(mdb.getLast, exec, settings);
  let updatePos = partial(pos.record, put, settings);
  let readPos = partial(pos.retrieve, getLast);
  let consumer = partial(csmr.consumer, iterate, readPos, updatePos, settings);
  let cache = new Map();
  let fetch = partial(entity.fetchEntity, cache, iterate);

  return {
    ctx,
    put,
    get,
    write,
    exec,
    settings,
    iterate,
    getLast,
    consumer,
    fetch,
  };
}
