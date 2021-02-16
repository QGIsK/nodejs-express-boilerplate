const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    Default: Date.now,
  },
  updated_at: {
    type: Date,
    Default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  this.email = this.email.toLowerCase();

  this.password = bcrypt.hashSync(this.password, 10);

  next();
});

UserSchema.on("update", function (next) {
  this.updated_at = Date.now();

  next();
});

UserSchema.methods.comparePassword = function (password, callback) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
