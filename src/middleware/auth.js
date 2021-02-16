const jwt = require("jsonwebtoken");
const db = require("@db/");

const { secret, select } = require("@root/config");
const { NotFound } = require("@utils/errors");

module.exports = {
  checkAuth: async function (req, res, next) {
    try {
      let token =
        req.headers["x-access-token"] ||
        req.headers["authorization"] ||
        req.query.bearer ||
        req.query.authorization;
      if (token) {
        if (token.startsWith("Bearer ")) {
          token = token.slice(7, token.length);
        }
        jwt.verify(token, secret, async (err, decoded) => {
          if (err) {
            throw new NotFound("Page not found.");
          }
          const user = await db.User.findById(decoded.id).select(select.user);

          if (user) req.user = user;
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  },
  ensureAuthenticated: async function (req, res, next) {
    try {
      if (req.user) next();

      throw new NotFound("Page not found");
    } catch (err) {
      next(err);
    }
  },

  checkRoles: async function (req, res, next, roles) {
    try {
      if (!req.user.roles.include(roles)) throw new NotFound("Page not found.");

      next();
    } catch (err) {
      next(err);
    }
  },
};
