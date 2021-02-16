const mongoose = require("mongoose");
const { db } = require("@root/config");
const { logger } = require("../utils/logger");

mongoose.set("debug", db.debug);

mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(logger.info("MongoDB Connected"))
  .catch(e => {
    logger.error(e);
    process.exit(0);
  });

module.exports = {
  User: require("./models/User"),
};
