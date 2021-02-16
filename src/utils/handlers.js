const DB = require("@db");

const assert = require("assert");
const { NotFound } = require("./errors");

module.exports = Router => {
  function getUser(id) {
    return Promise.resolve(
      DB.User.findById(id).catch(err => {
        throw new NotFound(`Page not found`);
      }),
    );
  }


  const bindings = [
    { param: "user", handler: getUser },
  ];

  function handleParam({ param, handler }) {
    // just a sanity check to make sure we have what we need
    assert(param, "Binding mush have a param");
    assert(handler, "Binding must have a handler");

    // second argument to `route.param` must be a function
    // of similar signature to a normal middleware with exception of
    // having an additional parameter which represents the value of placeholder

    return function (req, res, next, id) {
      return handler(id)
        .then(model => {
          // we assign the db model to request object for future use
          if (!model) throw new NotFound("Page not found");
          req[param] = model;
          next();
        })
        .catch(err => {
          // any errors thrown by handler will be passed to express error handler
          next(err);
        });
    };
  }

  bindings.forEach(function (binding) {
    Router.param(binding.param, handleParam(binding));
  });
};
