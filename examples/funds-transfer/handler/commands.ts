import { Dispatcher, ReadEntity, Write } from "@mbriggs/evt";
import { partial } from "lodash";
import * as uuid from "uuid";

import FundsTransfer from "@mbriggs/funds-transfer-component/funds-transfer";

import { Transfer } from "@mbriggs/funds-transfer-component/commands";

import { transfer } from "@mbriggs/funds-transfer-component/handler/commands/transfer-commands";

export function commandsHandler(read: ReadEntity<FundsTransfer>, write: Write) {
  const timestamp = () => new Date().toISOString();
  const identifier = () => uuid.v4();

  let h = new Dispatcher();
  h.handle(Transfer, partial(transfer, read, write, identifier, timestamp));

  return h.handler();
}
