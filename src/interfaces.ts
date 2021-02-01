import { Entry } from "./entity";
import { Handler, HandlerBuilder } from "./handler";
import { GetLast, Get, Put, Iterate, Write, MessageData } from "./messaging";

export type Exec = (text: string, values: any[]) => Promise<any>;

export type FetchEntity<T> = (
  entity: Cls<T>,
  projection: Handle<T>,
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

export type Handle<T = any> = Handler<T> | HandlerBuilder<T>;
