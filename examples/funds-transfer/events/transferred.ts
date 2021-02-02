import { attribute, Message } from "@mbriggs/evt";

export default class Transferred extends Message {
  @attribute() fundsTransferId: string;
  @attribute() depositAccountId: string;
  @attribute() withdrawalAccountId: string;
  @attribute() withdrawalId: string;
  @attribute() depositId: string;
  @attribute() amount: number;
  @attribute() time: string;
  @attribute() processedTime: string;
}
