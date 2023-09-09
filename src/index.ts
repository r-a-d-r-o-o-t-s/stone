import { envstone } from "./_env";
import { server } from "./server/server";

const { STONE_PORT } = envstone

server().then(http => {
  http?.listen(STONE_PORT, () => {
    console.log(`stone running on ${STONE_PORT}`);
  });
});



