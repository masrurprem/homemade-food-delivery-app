const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cookedBy: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    is_available: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryModel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const foodModel = new mongoose.model("foodModel", foodSchema);

module.exports = foodModel;
