import { startConsumer, Toolkit } from "@mbriggs/evt";
import { partial } from "lodash";

import FundsTransfer from "./funds-transfer";
import { fundsTransferProjection } from "./projection";

import { commandsHandler } from "./handler/commands";
import { eventsHandler } from "./handler/events";
import { accountEventsHandler } from "./handler/account-events";

const name = "fundsTransferService";

export default async function start({ fetch, write, consumer }: Toolkit) {
  let readFundsTransfer = partial(
    fetch,
    FundsTransfer,
    fundsTransferProjection(),
    "fundsTransfer"
  );

  let commands = startConsumer(
    consumer(name, "fundsTransfer:command"),
    commandsHandler(readFundsTransfer, write)
  );

  let events = startConsumer(
    consumer(name, "fundsTransfer"),
    eventsHandler(readFundsTransfer, write)
  );

  let accountEvents = startConsumer(
    consumer(name, "account"),
    accountEventsHandler(readFundsTransfer, write)
  );

  await Promise.all([commands, accountEvents, events]);
}
