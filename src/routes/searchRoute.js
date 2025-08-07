const express = require("express");
const searchRouter = express.Router();
const foodModel = require("../models/foodModel");

searchRouter.get("/", async (req, res) => {
  const searchByName = req.query.name;
  try {
    const food = await foodModel.find({
      name: { $regex: new RegExp(searchByName, "i") },
    }); // food with searching by name on the search bar
    res.status(200).send(food);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = searchRouter;
