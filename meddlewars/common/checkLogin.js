const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) => {
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookies) {
    try {
      const token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      req.user = decoded;
      next();
    } catch (err) {
      req.status(300).json({
        message: "Authentication failed ",
      });
    }
  } else {
    req.status(300).json({
      message: "Authentication failed ",
    });
  }
};

module.exports = checkLogin;
