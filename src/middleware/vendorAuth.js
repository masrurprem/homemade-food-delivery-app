const vendorModel = require("../models/vendorModel");
const jwt = require("jsonwebtoken");
//
const vendorAuth = async (req, res, next) => {};
try {
  const token = req.header("Authorization").replace("Bearer", "");
  const payload = jwt.verify(token, "abcabcabc");
  const vendor = await vendorModel.findOne({
    email: payload.email,
    "tokens.token": token,
  });

  if (!vendor) {
    throw new Error();
  }
  // here, so vendor is authorized
  req.token = token;
  req.vendor = vendor;
  next();
} catch (error) {
  res.status(400).send("please authenticate");
}

module.exports = vendorAuth;
