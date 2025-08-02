const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
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

// adding password hashing middleware before saving to database
userSchema.pre("save", async function (next) {
  const user = this;
  console.log(this);
  if (user.isModified("password")) {
    //hash the password
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// the auth method for user instance
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  console.log("this refer", this);
  const token = jwt.sign({ email: user.email }, "abcabcabc");
  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  return token;
};

// hiding private data
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

//making user login function
userSchema.statics.findByCredentials = async (email, password) => {
  // get user by email
  const user = await userModel.findOne({ email });
  console.log(user);
  if (!user) {
    throw new Error("unable to login");
  }
  // pasword match
  const is_match = await bcrypt.compare(password, user.password);
  console.log(is_match);
  if (!is_match) {
    throw new Error("unable to login");
  }
  return user;
};

//
const userModel = new mongoose.model("userModel", userSchema);

module.exports = userModel;
