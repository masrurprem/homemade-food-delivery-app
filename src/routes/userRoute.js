const express = require("express");
const userRoute = express.Router();
const userModel = require("../models/userModel");
const auth = require("../middleware/auth");

// getting all registered users
userRoute.get("/all", async (req, res) => {
  try {
    const allusers = await userModel.find({});
    if (!allusers) {
      res.status(404).send("users not found");
    }
    res.status(200).send(allUsers);
  } catch (err) {
    res.status(400).send("something went wrong", err);
  }
});

//creating new user
userRoute.post("/users/register", async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    const token = await generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(401).send("cannot register.. try again");
  }
});

// user login route
userRoute.post("/users/login", async (req, res) => {
  try {
    // fetch user by credentials
    const { email, password } = req.body;
    const user = await userModel.findByCredentials(email, password);
    // generate user jwt auth token
    const token = await generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send("something went wrong");
  }
});

// getting only one user profile
userRoute.get("/users/profile", auth, async (req, res) => {
  res.send(req.user);
});

// logout route: say logout from one current device
userRoute.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenObj) => {
      return tokenObj.token !== req.token;
    });
    //save user to database
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//logout from all logged-in devices
userRoute.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = []; // all tokens are removed
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(501).send();
  }
});

// export userModel
module.exports = userRoute;
