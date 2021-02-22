import { Cls } from "./interfaces";
import { MessageData } from "./messaging";
import * as evt from "./interfaces";

export type Handler<T, C> = (msg: T, ctx?: C) => Promise<any> | any;

export class Dispatcher<C> {
  userTypes = new Map<string, Cls>();
  messageHandlers = new Map<string, Handler<any, C>>();

  handle<T>(cls: Cls<T>, handler: Handler<T, C>) {
    if (!(cls as any).fromMessageData) {
      throw new Error(`${cls.name} must be a message class`);
    }
    let type = cls.name;
    this.userTypes.set(type, cls);
    this.messageHandlers.set(type, handler);
  }

  handler(): evt.Handler<C> {
    return (data: MessageData, ctx?: any) => {
      if (!this.userTypes.has(data.type)) {
        return;
      }

      let cls = this.userTypes.get(data.type);
      let handler = this.messageHandlers.get(data.type);

      let msg = (cls as any).fromMessageData(data);

      let result = handler(msg, ctx);

      return result;
    };
  }
}
