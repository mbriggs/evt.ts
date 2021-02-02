import { attribute, Message } from "@mbriggs/evt";

export default class Cancelled extends Message {
  @attribute() fundsTransferId: string;
  @attribute() withdrawalAccountId: string;
  @attribute() depositAccountId: string;
  @attribute() withdrawalId: string;
  @attribute() amount: number;
  @attribute() time: string;
}
