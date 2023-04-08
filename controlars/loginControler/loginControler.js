const People = require("../../models/people");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const createError = require("http-errors");

const getLogin = (req, res, next) => {
  res.json({
    data: "student route",
  });
};

const login = async (req, res, next) => {
  try {
    const user = await People.findOne({
      $or: [{ name: req.body.userName }, { email: req.body.email }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        const userObj = {
          userID: user._id,
          userName: user.name,
          email: user.email,
          role: user.role,
        };
        //jwt token
        const token = jwt.sign(userObj, process.env.JWT_SECRETE, {
          expiresIn: process.env.JWT_EXPIRY,
        });
        //set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });
        //set Local users
        res.locals.loggedinUser = userObj;
        res.status(200).json({
          user: userObj,
          message: "login successfully ! ",
        });
      } else {
        throw createError("login failed . tray again !");
      }
    } else {
      throw createError("login failed . tray again !");
    }
  } catch (err) {
    throw createError(err.message);
  }
};
const logOut = (req, res, next) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send({
    message: "LogOut successfully",
  });
};

module.exports = {
  getLogin,
  login,
  logOut,
};
