import { host } from "@mbriggs/evt";
import startAccount from "./account/start";

host({ name: "accounts" }, startAccount);
