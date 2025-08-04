const express = require("express");
const foodModel = require("../models/foodModel");
const foodRouter = express.Router();

// getting all the foods irrespective of categories
foodRouter.get("/all", async (req, res) => {
  try {
    const foods = await foodModel.find({}); // all foods
    res.status(200).send(foods);
  } catch (err) {
    res.status(400).send(err);
  }
});

// create new food
foodRouter.post("/addNew", async (req, res) => {
  const newFood = new foodModel(req.body);
  try {
    await newFood.save();
    res.status(200).send("Food Saved!");
  } catch (e) {
    console.log(e);
    res.status(401).send("Something went wrong , try again");
  }
});

module.exports = foodRouter;
