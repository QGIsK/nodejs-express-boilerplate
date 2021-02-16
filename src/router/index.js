const { Router } = require("express");

Router.use("/api", require("./api"));

module.exports = Router;
