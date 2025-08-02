const express = require("express");
const vendorRoute = express.Router();
const vendorModel = require("../models/vendorModel");

// getting all the registered vendors
vendorRoute.get("/all", async (req, res) => {
  try {
    const allVendor = vendorModel.find({});
    res.status(200).send(allVendor);
  } catch (err) {
    res.status(400).send(err);
  }
});

// register to create a new vendor
vendorRoute.post("/register", (req, res) => {
  const { businessName, email, password } = req.body;
  // hash the password
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      res.status(500).send("password hashing failed");
    }
    // save the new user to database with hashed password
    const newVendor = await userModel.create({
      businessName,
      email,
      password: hash,
    });
    res.status(200).send(newVendor);
  });
});

// vendor login route

vendorRoute.post("/vendors/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // get valid vendor with credentials
    const vendor = await vendorModel.findByVenCredentials(email, password);
    res.status(200).send(vendor);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

module.exports = vendorRoute;
