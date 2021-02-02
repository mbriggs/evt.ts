import { attribute, Message } from "@mbriggs/evt";

export default class Withdrawn extends Message {
  @attribute() fundsTransferId: string;
  @attribute() withdrawalId: string;
  @attribute() accountId: string;
  @attribute() amount: number;
  @attribute() time: string;
  @attribute() processedTime: string;
}
