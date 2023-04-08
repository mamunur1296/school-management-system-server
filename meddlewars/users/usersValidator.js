const { check, validationResult } = require("express-validator");
const People = require("../../models/people");
const createError = require("http-errors");
const addUserValidator = [
  check("name")
    .isLength({ min: 5 })
    .withMessage("name is required")
    .matches(/^[a-zA-Z\s]*$/, "i")
    .withMessage("name must not contain anything other than alphabet")
    .custom(async (value) => {
      try {
        const user = await People.findOne({ name: value });
        if (user) {
          throw createError(400, "Name already in use!");
        }
      } catch (err) {
        throw createError(400, err.message);
      }
    })
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .trim()
    .custom(async (value) => {
      try {
        const user = await People.findOne({ email: value });
        if (user) {
          throw createError(400, "Email already in use!");
        }
      } catch (err) {
        throw createError(400, err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be 8 characters & 1 uppercase 1 lowercase  & 1 symbol"
    ),
];

const addUserValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return next(createError(400, errorMessages.join("; ")));
  }
  next();
};
module.exports = {
  addUserValidator,
  addUserValidatorHandler,
};
