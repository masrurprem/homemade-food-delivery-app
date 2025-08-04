const express = require("express");
const catRouter = express.Router();
const foodModel = require("../models/foodModel");
const categoryModel = require("../models/categoryModel");

// get all foods of a specific category
catRouter.get("/:name", async (req, res) => {
  try {
    // get the category
    const Category = await categoryModel.findOne({
      name: req.params.name,
    });
    if (!Category) {
      res.status(400).send("category not found");
    }
    // find all foods of Category
    const foods = await foodModel.find({ category: Category._id });
    if (!foods) {
      res.status(500).send("no availabe food in the category");
    }
    res.status(200).send(foods);
  } catch (e) {
    res.status(400).send(e);
  }
});

// save category
catRouter.post("/addNew", async (req, res) => {
  const category = new categoryModel(req.body);
  try {
    await category.save();
    res.status(200).send(category);
  } catch (e) {
    console.log(e);
    res.status(401).send("Something went wrong , try again");
  }
});

module.exports = catRouter;
