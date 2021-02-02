import { Message, Timestamp, Write, stream } from "@mbriggs/evt";
import Withdraw from "@mbriggs/account-component/commands/withdraw";
import Deposit from "@mbriggs/account-component/commands/deposit";

const commandStreamName = (id: string) =>
  stream.name({ category: "account", type: "command", id });

export interface WithdrawParams {
  withdrawalId: string;
  accountId: string;
  amount: number;
  previousMessage?: Message;
}
export async function withdraw(
  write: Write,
  timestamp: Timestamp,
  { withdrawalId, accountId, amount, previousMessage }: WithdrawParams
) {
  let withdraw = Withdraw.build(previousMessage);

  withdraw.withdrawalId = withdrawalId;
  withdraw.accountId = accountId;
  withdraw.amount = amount;
  withdraw.time = timestamp();

  let streamName = commandStreamName(accountId);

  await write(withdraw, streamName);

  return withdraw;
}

export interface DepositParams {
  depositId: string;
  accountId: string;
  amount: number;
  previousMessage?: Message;
}

export async function deposit(
  write: Write,
  timestamp: Timestamp,
  { depositId, accountId, amount, previousMessage }: DepositParams
) {
  let deposit = Deposit.build(previousMessage);

  deposit.depositId = depositId;
  deposit.accountId = accountId;
  deposit.amount = amount;
  deposit.time = timestamp();

  let streamName = commandStreamName(accountId);

  await write(deposit, streamName);

  return deposit;
}
