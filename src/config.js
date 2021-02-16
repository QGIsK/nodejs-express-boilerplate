exports.environment = process.env.NODE_ENV;
exports.port = process.env.PORT;

exports.db = {
  url: process.env.DB_URL,
  debug: process.env.DB_DEBUG,
};

exports.corsUrl = process.env.CORS_URL;

exports.logDirectory = process.env.LOG_DIR;
