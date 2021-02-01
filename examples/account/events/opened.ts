import { attribute, Message } from "@mbriggs/evt";

export default class Opened extends Message {
  @attribute() accountId: string;
  @attribute() customerId: string;
  @attribute() time: string;
  @attribute() processedTime: string;
}
