const uploader = require("../../utill/singleUploder");

const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/png", "image/jpg"],
    1000000,
    "only .jpg , .jpeg or .png format allowed !"
  );
  //call the function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            massage: err.massage,
          },
        },
      });
    } else {
      next();
    }
  });
};
module.exports = avatarUpload;
