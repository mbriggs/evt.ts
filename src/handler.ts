import * as mdb from "./message-db";
import { isFunction } from "lodash";
import { Cls } from "@mbriggs/evt/interfaces";

export type Handler<C = any> = (msg: mdb.Message, ctx: C) => Promise<any> | void;
export interface HandlerBuilder<C = any> {
  handler(): Handler<C>;
}

export function toHandler<C>(handler: Handler<C> | HandlerBuilder<C>): Handler<C> {
  if (isFunction(handler)) {
    return handler;
  }

  return handler.handler();
}

export type MessageHandler<T, C> = (msg: T, ctx?: C) => Promise<any> | void;

export class Dispatcher<C = any> implements HandlerBuilder<C> {
  userTypes = new Map<string, Cls<any>>();
  messageHandlers = new Map<string, MessageHandler<any, C>>();

  handle<T>(cls: Cls<T>, handler: (msg: T, ctx?: C) => Promise<any> | void) {
    if (!(cls as any).fromMessageDB) {
      throw new Error(`${cls.name} must be a message class`);
    }
    let type = cls.name;
    this.userTypes.set(type, cls);
    this.messageHandlers.set(type, handler);
  }

  handler(): Handler<C> {
    return (data: mdb.Message, ctx?: any) => {
      if (!this.userTypes.has(data.type)) {
        return;
      }

      let cls = this.userTypes.get(data.type);
      let handler = this.messageHandlers.get(data.type);

      let msg = (cls as any).fromMessageDB(data);

      let result = handler(msg, ctx);

      return result;
    };
  }
}
