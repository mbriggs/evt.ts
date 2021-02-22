import { Entry } from "./entity";
import { GetLast, Get, Put, Iterate, Write, MessageData } from "./messaging";
import { Context } from "@mbriggs/context";
import { Exec } from "@mbriggs/db";
export type { Context, Exec };

export type Handler<C = any> = (msg: MessageData, ctx: C) => Promise<any> | any;

export type FetchEntity<T> = (
  entity: Cls<T>,
  projection: Handler<T>,
  category: string,
  ctx: Context,
  id: string
) => Promise<Entry<T>>;

export type ReadEntity<T> = (ctx: Context, id: string) => Promise<Entry<T>>;

export interface Toolkit {
  ctx: Context;
  exec: Exec;
  settings: Settings;
  fetch: FetchEntity<any>;
  get: Get;
  getLast: GetLast;
  put: Put;
  iterate: Iterate;
  write: Write;
  consumer: Consumer;
}

export type Consumer = (
  ctx: Context,
  consumerName: string,
  streamName: string
) => AsyncGenerator<[MessageData, Context]>;

export interface Settings {
  pollInterval: number;
  batchSize: number;
  correlation: string;
  groupMember: string;
  groupSize: number;
  condition: string;
  positionUpdateInterval: number;
}

export interface Cls<T = any> {
  new (...args: any[]): T;

  name: string;
}

export type Timestamp = () => string;
export type RandomID = () => string;
