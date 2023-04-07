//external import
const express = require("express");
//internal import
const { getUsers } = require("../../controlars/usersControler/usersControler");
const router = express.Router();

//user page
router.get("/", getUsers);

//router export
module.exports = router;
