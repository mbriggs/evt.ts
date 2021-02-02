import { attribute, Message } from "@mbriggs/evt";

export default class Transfer extends Message {
  @attribute() fundsTransferId: string;
  @attribute() withdrawalAccountId: string;
  @attribute() depositAccountId: string;
  @attribute() amount: number;
  @attribute() time: string;
}
