const express = require("express");
const Router = express.Router();

const Controller = require("@controllers/authentication");

const { AUTHENTICATION_LIMITER, API_LIMITER } = require("@utils/limiter");
const { ensureAuthenticated } = require("@middleware/auth");

Router.post("/login", AUTHENTICATION_LIMITER.LOGIN, Controller.local);

Router.post("/register", AUTHENTICATION_LIMITER.CREATE, Controller.register);

Router.get(
  "/get-user-by-token",
  API_LIMITER,
  ensureAuthenticated,
  Controller.getUserByToken,
);

module.exports = Router;
