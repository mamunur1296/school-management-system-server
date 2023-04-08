const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

const loginValidators = [
  check("name").isLength({ min: 5 }).withMessage("user name is mast !"),
  check("password").isLength({ min: 5 }).withMessage("password name is mast !"),
];
const loginValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return next(createError(400, errorMessages.join("; ")));
  }
  next();
};
module.exports = {
  loginValidators,
  loginValidatorHandler,
};
