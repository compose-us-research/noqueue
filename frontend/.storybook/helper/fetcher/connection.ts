import { connection as realConnection } from "../../../src/service/server/connection";
import * as fetcher from "./fetcher";
import * as push from "./push";

export const connection: typeof realConnection = { fetcher, push };
