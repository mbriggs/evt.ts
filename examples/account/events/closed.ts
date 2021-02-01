import { attribute, Message } from "@mbriggs/evt";

export default class Closed extends Message {
  @attribute() accountId: string;
  @attribute() time: string;
  @attribute() processedTime: string;
}
