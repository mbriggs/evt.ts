import * as mesg from "./messaging";
import * as mdb from "./message-db";

export type Handler<C, R = void> = (msg: mdb.Message, ctx: C) => Promise<R> | R;
export interface HandlerBuilder<C, R = void> {
  handler(): Handler<C, R>;
}

export type MessageHandler<T extends mesg.Message, C, R = void> = (
  msg: T,
  ctx: C
) => Promise<R> | R;

export interface UserType<T extends mesg.Message = any> {
  fromMessageDB(msg: mdb.Message): T;
  new (...args: any[]): T;
  name: string;
}

export class Dispatcher<C, R = void> implements HandlerBuilder<C, R> {
  userTypes = new Map<string, UserType>();
  messageHandlers = new Map<string, MessageHandler<any, C, R>>();

  handle<T extends mesg.Message>(
    cls: UserType<T>,
    handler: (msg: T, ctx: C) => R | Promise<R>
  ) {
    let type = cls.name;
    this.userTypes.set(type, cls);
    this.messageHandlers.set(type, handler);
  }

  handler(): Handler<C, R> {
    return (data: mdb.Message, ctx?: any) => {
      if (!this.userTypes.has(data.type)) {
        return;
      }

      let cls = this.userTypes.get(data.type);
      let handler = this.messageHandlers.get(data.type);

      let msg = cls.fromMessageDB(data);

      let result = handler(msg, ctx);

      return result;
    };
  }
}
