const express = require("express");
const foodModel = require("../models/foodModel");
const foodRouter = express.Router();

// getting all the foods irrespective of categories
foodRouter.get("/foods/all", async (req, res) => {
  try {
    const foods = await foodModel.find({}); // all foods
    res.status(200).send(foods);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = foodRouter;
