const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// mongodb connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log("database not connected", err);
  });
