import { attribute, Message } from "@mbriggs/evt";

export default class WithdrawalRejected extends Message {
  @attribute() withdrawalId: string;
  @attribute() accountId: string;
  // TODO: handle conversion to/from bigdecimal
  @attribute() amount: number;
  @attribute() time: string;
  @attribute() sequence: number;
}
