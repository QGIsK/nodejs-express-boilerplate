const jwt = require("jsonwebtoken");
const db = require("@db/");

const { BadRequest, ServerError, Forbidden } = require("@utils/errors");
const { secret, select } = require("@root/config");

exports.register = async (req, res, next) => {
  let { email, password, password2, username } = req.body;

  try {
    if (!email || !password || !password2 || !username) {
      throw new BadRequest("Please fill in all fields correctly.");
    }
    if (password != password2 && password.length < 6) {
      throw new BadRequest("Please fill in all fields correctly.");
    }

    email = email.toLowerCase();
    const user = await db.User.findOne({
      email,
    });
    if (user) {
      throw new Forbidden("Unauthorized.");
    } else {
      const newUser = new db.User({
        username,
        email,
        password,
      });

      await newUser.save();

      const token = await jwt.sign(
        {
          id: newUser._id,
          username: newUser.username,
        },
        secret,
        {
          expiresIn: "1d",
        },
      );

      let user = await db.User.findById(newUser._id).select(select.user);

      return res.status(201).json({
        token,
        user,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.local = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    if (!password || !email)
      throw new BadRequest("Please fill in all fields correctly.");

    let foundUser = await db.User.findOne({
      email: email.toLowerCase(),
    });

    if (!foundUser) {
      throw new Forbidden("Unauthorized.");
    }

    const auth = await foundUser.comparePassword(password);

    if (!auth) {
      throw new Forbidden("Unauthorized.");
    }

    let token = await jwt.sign(
      {
        id: foundUser._id,
        username: foundUser.username,
      },
      secret,
      {
        expiresIn: "1d",
      },
    );

    const user = await db.User.findById(foundUser.id).select(select.user);

    res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserByToken = (req, res, next) => {
  res.json({ user: req.user });
};
