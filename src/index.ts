import { log } from "@radroots-focus/logger";
import "@radroots-focus/teleios";
import { envstone } from "./_env";
import { server } from "./server/server";

const { STONE_PORT } = envstone

server().then(http => {
  http?.listen(STONE_PORT, () => {
    log(`stone running on ${STONE_PORT}`);
  });
});



