//external import
const express = require("express");

//internal import
const {
  getUsers,
  addUsers,
  removeUsers,
} = require("../../controlars/usersControler/usersControler");
const avatarUpload = require("../../meddlewars/users/avatarUplode");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../../meddlewars/users/usersValidator");
const checkLogin = require("../../meddlewars/common/checkLogin");

const router = express.Router();

//user page
router.get("/", checkLogin, getUsers);
//add user
router.post("/", addUserValidator, addUserValidatorHandler, addUsers);
//removeUsers
router.delete("/:id", removeUsers);
//router export
module.exports = router;
// avatarUpload,
