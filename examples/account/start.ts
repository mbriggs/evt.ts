import { startConsumer, Toolkit } from "@mbriggs/evt";
import Account from "./account";
import { accountProjection } from "./projection";
import { commandHandler } from "./handler/commands";
import { partial } from "lodash";

export async function start({ fetch, write, consumer }: Toolkit) {
  let readAccount = partial(fetch, Account, accountProjection(), "account");

  await startConsumer(
    await consumer("accountConsumer", "account"),
    commandHandler(readAccount, write)
  );
}
