// Copyright 2021-2023 radroots - kit authors & contributors
// SPDX-License-Identifier: UNLICENSED

//import * as dotenv from "dotenv-safe";
//import path from "path";
import type { TypesStoneEnv } from "./types";

/*dotenv.config({
  allowEmptyValues: false,
  example: path.join(__dirname, `..`, `..`, `.env.kit`),
});*/

let msg: string | undefined;

const { STONE_PORT } = process.env;
if (!STONE_PORT) {
  msg = `process.env.STONE_PORT`;
  throw new Error(msg);
}

const { STONE_CORS_ORIGIN } = process.env;
if (!STONE_CORS_ORIGIN) {
  msg = `process.env.STONE_CORS_ORIGIN`;
  throw new Error(msg);
}

/**
 * * Radroots Documentation
 *
 * @created 02 25 2023
 * @notes [ ]
 *
 */
export const envstone: TypesStoneEnv = {
  STONE_PORT,
  STONE_CORS_ORIGIN,
};
