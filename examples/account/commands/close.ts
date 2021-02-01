import { attribute, Message } from "@mbriggs/evt";

export default class Close extends Message {
  @attribute() accountId: string;
  @attribute() time: string;
}
