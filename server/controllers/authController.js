const User = require("../models/User");
const Token = require("../models/Token");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} = require("../utils");
const crypto = require("crypto");

// REGISTER USER
const register = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
    picturePath,
    friends,
    location,
    occupation,
  } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
    verificationToken,
    location,
    occupation,
    picturePath,
    friends,
  });
  const origin = "http://localhost:3000";
  await sendVerificationEmail({
    name: user.firstName,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Success! Please check you email for verification" });
};

module.exports = {
  register,
};
