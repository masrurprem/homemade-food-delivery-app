const express = require("express");
const userRoute = require("./routes/userRoute");
const vendorRoute = require("./routes/vendorRoute");
const foodRouter = require("./routes/foodRoute");
const catRouter = require("./routes/categoryRoute");
const registerRouter = require("./routes/registerRoute");
const searchRouter = require("./routes/searchRoute");
// const loginRoute = require("./routes/loginRoute");
require("./database/mongoDB");
const app = express();
const port = process.env.PORT || 3000;
//
app.use(express.json());
app.use("/users", userRoute);
app.use("/vendors", vendorRoute);
app.use("/foods", foodRouter);
app.use("/categories", catRouter);
app.use("/search", searchRouter);
app.use(registerRouter);
// app.use(loginRoute);

// listen
app.listen(port, (error) => {
  if (error) {
    console.log("error running server");
  }
  console.log("server running at port", `http://localhost:${port}`);
});
