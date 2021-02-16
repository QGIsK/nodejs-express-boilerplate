const path = require("path");
const util = require("util");
const multer = require("multer");

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __basedir + "/public/uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

exports.imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

exports.limit = 2 * 1024 * 1024;

exports.upload = multer({
  storage: this.storage,
  fileFilter: this.imageFilter,
  limit: this.limit,
});
