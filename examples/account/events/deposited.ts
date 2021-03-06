import { attribute, Message } from "@mbriggs/evt";

export default class Deposited extends Message {
  @attribute() depositId: string;
  @attribute() accountId: string;
  // TODO: handle conversion to/from bigdecimal
  @attribute() amount: number;
  @attribute() time: string;
  @attribute() processedTime: string;
  @attribute() sequence: number;
}
