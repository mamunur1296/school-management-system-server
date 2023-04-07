const createHttpError = require("http-errors");

// 404 not found handler
const isNotFoundHandler = (req, res, next) => {
  next(createHttpError(404, "your requested content was not found"));
};

// Default error handler
const isErrorhandler = (err, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };
  res.status(err.status || 500);
  res.json(res.locals.error);
};

module.exports = {
  isNotFoundHandler,
  isErrorhandler,
};
