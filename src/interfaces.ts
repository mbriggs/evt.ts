import { Entry } from "./entity";
import { GetLast, Get, Put, Iterate, Write, MessageData } from "./messaging";

export type Handler<C = any> = (msg: MessageData, ctx: C) => Promise<any> | any;

export type Exec = (text: string, values: any[]) => Promise<any>;

export type FetchEntity<T> = (
  entity: Cls<T>,
  projection: Handler<T>,
  category: string,
  id: string
) => Promise<Entry<T>>;

export type ReadEntity<T> = (id: string) => Promise<Entry<T>>;

export interface Toolkit {
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
  consumerName: string,
  streamName: string
) => AsyncGenerator<MessageData>;

export interface Settings {
  pollInterval: number;
  batchSize: number;
  correlation: string;
  groupMember: string;
  groupSize: number;
  condition: string;
  positionUpdateInterval: number;
}

export interface Cls<T> {
  new (...args: any[]): T;

  name: string;
}
