const rateLimit = require("express-rate-limit");

const API_LIMITER = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 250,
});

const AUTHENTICATION_LIMITER = {
  CREATE: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 7, // start blocking after 5 requests
    message: "You've tried making to many account, Please try again later.",
  }),
  LOGIN: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 10, // start blocking after 5 requests
    message: "You've tried to login to many times, Please try again later.",
  }),
  RESET: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message:
      "You've tried resetting your password to many times, Please try again later.",
  }),
};

module.exports = { API_LIMITER, AUTHENTICATION_LIMITER };
