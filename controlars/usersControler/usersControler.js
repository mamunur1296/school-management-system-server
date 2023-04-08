const People = require("../../models/people");
const bcrypt = require("bcrypt");
// get user
const getUsers = async (req, res, next) => {
  try {
    const user = await People.find({});
    res.status(200).json({
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      error: "there was a server side error",
    });
  }
};

// add user
const addUsers = async (req, res, next) => {
  let newPeople;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  newPeople = new People({
    ...req.body,
    password: hashedPassword,
  });

  try {
    const result = await newPeople.save();
    res.status(200).json({
      message: "people inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "there was a server side error",
    });
  }
};
const removeUsers = async (req, res, next) => {
  try {
    const result = await People.findByIdAndDelete({
      _id: req.params.id,
    });
    console.log(result);
    res.status(200).json({
      message: "people deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "there was a server side error",
    });
  }
};

module.exports = {
  getUsers,
  addUsers,
  removeUsers,
};

//  let newUser;
//  const hashedPassword = await bcrypt.hash(req.body.password, 10);
//  if (req.files && req.files.length > 0) {
//    newUser = new user({
//      ...req.body,
//      // avatar: req.files[0].filename,
//      password: hashedPassword,
//    });
//  } else {
//    newUser = new user({
//      ...req.body,
//      password: hashedPassword,
//    });
//  }
//  //save user
//  try {
//    const result = await newUser.save();
//    res.status(200).json({
//      data: result,
//    });
//  } catch (err) {
//    res.json({
//      error: err,
//    });
//  }
