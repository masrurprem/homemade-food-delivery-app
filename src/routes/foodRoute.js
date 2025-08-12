const express = require("express");
const foodModel = require("../models/foodModel");
const foodRouter = express.Router();

// getting all the foods irrespective of categories
foodRouter.get("/all", async (req, res) => {
  // necessary for pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  //necessary for sorting: sortBy--> price
  let sortOps = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sortOps[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    // all foods with pagination
    const foods = await foodModel
      .find({})
      .populate("category")
      .skip(skip)
      .limit(limit)
      .sort(sortOps);
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

//update food

// delete a food item

module.exports = foodRouter;
