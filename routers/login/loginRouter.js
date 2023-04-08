//external import
const express = require("express");
//internal import
const {
  login,
  logOut,
} = require("../../controlars/loginControler/loginControler");
const {
  loginValidators,
  loginValidatorHandler,
} = require("../../meddlewars/login/loginValidators");

const router = express.Router();

//user page
router.get("/login", login);
router.post("/", loginValidators, loginValidatorHandler, login);
router.post("/logout", logOut);

//router export
module.exports = router;
