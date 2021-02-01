import { attribute, Message } from "@mbriggs/evt";

export default class Open extends Message {
  @attribute() accountId: string;
  @attribute() customerId: string;
  @attribute() time: string;
}
