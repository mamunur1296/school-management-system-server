//external import
const express = require("express");
//internal import
const {
  getStudents,
} = require("../../controlars/studentControler/studentControler");

const router = express.Router();

//user page
router.get("/", getStudents);

//router export
module.exports = router;
