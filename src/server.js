const app = require("./app");
const { port } = require("./config");
const { logger } = require("@utils/logger");

app
  .listen(port, _ => logger.info("Web Service is now Online"))
  .on("error", e => {
    logger.error(e);
  });
