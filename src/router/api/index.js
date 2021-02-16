const express = require("express");
const Router = express.Router();

const { API_LIMITER } = require("@utils/limiter");

Router.use("/auth", require("./authentication"));

Router.all(API_LIMITER);

module.exports = Router;
