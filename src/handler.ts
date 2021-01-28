import * as mesg from "./messaging";
import * as mdb from "./message-db";

export type Handler = (msg: mdb.Message) => void;
export interface HandlerBuilder {
  handler(): Handler;
}

export type MessageHandler<T extends mesg.Message> = (msg: T) => void;
export interface UserType<T extends mesg.Message = any> {
  fromMessageDB(msg: mdb.Message): T;
  new (...args: any[]): T;
  name: string;
}

export class Dispatcher implements HandlerBuilder {
  userTypes = new Map<string, UserType>();
  messageHandlers = new Map<string, MessageHandler<any>>();

  handle<T extends mesg.Message>(cls: UserType<T>, handler: (msg: T) => void) {
    let type = cls.name;
    this.userTypes.set(type, cls);
    this.messageHandlers.set(type, handler);
  }

  handler(): Handler {
    return (data: mdb.Message) => {
      if (!this.userTypes.has(data.type)) {
        return;
      }

      let cls = this.userTypes.get(data.type);
      let handler = this.messageHandlers.get(data.type);

      let msg = cls.fromMessageDB(data);

      handler(msg);
    };
  }
}
