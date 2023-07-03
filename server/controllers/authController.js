const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require('path');
const {
  createJWT,
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
  if (!req.files) {
    throw new CustomError.BadRequestError("No image has been uploaded");
  }
  const userImage = req.files.picture;
  if (!userImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an image");
  }
  const maxSize = 1024 * 1024 * 5;
  if (userImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload an image smaller than 5MB");
  }
  const imagePathAbsolute = path.join(__dirname, "../../client/public/" + `${userImage.name}`);
  await userImage.mv(imagePathAbsolute);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
    verificationToken,
    location,
    occupation,
    picturePath: userImage.name,
    friends,
  });
  // const origin = "http://localhost:3000";
  // await sendVerificationEmail({
  //   name: user.firstName,
  //   email: user.email,
  //   verificationToken: user.verificationToken,
  //   origin,
  // });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Success! Please check you email for verification" });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Verification failed");
  }
  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError("Verification failed");
  }
  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";
  await user.save();
  res.status(StatusCodes.OK).json({
    msg: "Email successfully verified. You may now log in to your account",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email }).populate({
    path:"friends",
    select:"firstName lastName picturePath occupation",
  });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  // if (!user.isVerified) {
  //   throw new CustomError.UnauthenticatedError(
  //     "Please verify your email before logging in"
  //   );
  // }

  const tokenUser = createTokenUser(user);

  const token = createJWT({ user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

module.exports = {
  register,
  verifyEmail,
  login,
};
