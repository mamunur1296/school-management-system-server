//external import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  isNotFoundHandler,
  isErrorhandler,
} = require("./meddlewars/common/errorHandler");
//internal import
const app = express();
dotenv.config();

//Mongodb connection
mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connection successful"))
  .catch((err) => console.log(err));
// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//parser cookies
app.use(cookieParser(process.env.COOKIE_SECRETE));
//routing

//404 error handel
app.use(isNotFoundHandler);
//common error handler
app.use(isErrorhandler);

//app listen
app.listen(process.env.PORT, (req, res) => {
  console.log(`application is ran on port ${process.env.PORT}`);
});
