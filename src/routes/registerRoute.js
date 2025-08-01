const express = require("express");
const registerRouter = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// register to create a new user
registerRouter.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  // hash the password
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      res.status(500).send("password hashing failed");
    }
    // save the new user to database with hashed password
    const newUser = await userModel.create({
      name,
      email,
      password: hash,
    });
    res.status(200).send(newUser);
  });
});
//
module.exports = registerRouter;
