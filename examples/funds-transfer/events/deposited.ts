import { attribute, Message } from "@mbriggs/evt";

export default class Deposited extends Message {
  @attribute() fundsTransferId: string;
  @attribute() depositId: string;
  @attribute() accountId: string;
  @attribute() amount: number;
  @attribute() time: string;
  @attribute() processedTime: string;
}
