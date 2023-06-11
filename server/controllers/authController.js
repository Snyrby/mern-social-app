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
  const user = await User.findOne({ email });

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

  // createRefreshToken
  let refreshToken = "";
  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });
  // if (existingToken) {
  //   const { isValid } = existingToken;
  //   if (!isValid) {
  //     throw new CustomError.UnauthenticatedError("Invalid Credentials");
  //   }
  //   refreshToken = existingToken.refreshToken;
  //   attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  //   res.status(StatusCodes.OK).json({ user: tokenUser });
  //   return;
  // }
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user.id };
  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
  register,
  verifyEmail,
  login,
  logout,
};
