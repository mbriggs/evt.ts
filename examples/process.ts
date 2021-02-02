import { host, compose } from "@mbriggs/evt";
import startAccount from "./account/start";
import startFundsTransfer from "./funds-transfer/start";

host({ name: "accounts" }, compose(startAccount, startFundsTransfer));
