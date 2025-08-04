const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const vendorSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//
vendorSchema.statics.findByVenCredentials = async (email, password) => {
  // get user by email
  const vendor = await vendorModel.findOne({ email });
  if (!vendor) {
    throw new Error("unable to login vendor");
  }
  // validate password
  const is_match = await bcrypt.compare(password, vendor.password);
  if (!is_match) {
    throw new Error("unable to login");
  }
  return vendor;
};

// token generation function for a vendor instance
vendorSchema.methods.generateAuthToken = async function () {
  const vendor = this;
  const token = jwt.sign({ email: vendor.email }, "abcabcabc");
  vendor.tokens = vendor.tokens.concat({ token: token });
  await vendor.save();
  return token;
};

//
const vendorModel = new mongoose.model("vendorModel", vendorSchema);

module.exports = vendorModel;
