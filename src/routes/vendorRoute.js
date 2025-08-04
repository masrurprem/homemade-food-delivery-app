const express = require("express");
const vendorRoute = express.Router();
const vendorModel = require("../models/vendorModel");

// getting all the registered vendors--> most likely for admin panel
vendorRoute.get("/all", async (req, res) => {
  try {
    const allVendor = vendorModel.find({});
    res.status(200).send(allVendor);
  } catch (err) {
    res.status(400).send(err);
  }
});

// register to create a new vendor
vendorRoute.post("/register", async (req, res) => {
  const newVendor = new vendorModel(req.body);
  try {
    await newVendor.save();
    res.status(200).send("vendor registration complete");
  } catch (e) {
    res.status(400).send("unable to create new vendor");
  }
});

// vendor login route

vendorRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // get valid vendor with credentials
    const vendor = await vendorModel.findByVenCredentials(email, password);
    //token
    const token = await vendor.generateAuthToken();
    res.status(200).send({ vendor, token });
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

vendorRoute.get("/profile", vendorAuth, (req, res) => {
  res.send(req.vendor);
});

module.exports = vendorRoute;
