const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded_payload = jwt.verify(token, "abcabcabc");
    const user = await userModel.findOne({
      email: decoded_payload.email,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token; // will be helpful during logging out
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send("please authenticate");
  }
};

module.exports = auth;
