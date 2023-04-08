const createError = require("http-errors");
const multer = require("multer");
const path = require("path");

const uploader = (folder, fileType, fileSize, errMassage) => {
  //file upload folder
  const UPLOADS_FOLDER = `${__dirname}/../public/${folder}`;
  //storage define
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });
  // upload obj
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: fileSize,
    },
    fileFilter: (req, file, cb) => {
      if (fileType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(errMassage));
      }
    },
  });
  return upload;
};
module.exports = uploader;
