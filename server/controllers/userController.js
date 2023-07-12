const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, checkPermissions, attachCookiesToResponse } = require("../utils");
const fs = require("fs");
const path = require("path");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const getUserFriends = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
    .select("friends")
    .populate({
      path: "friends",
      select: "firstName lastName picturePath occupation",
    });
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${id}`);
  }
  const friendsList = user.friends;
  res.status(StatusCodes.OK).json({ friends: friendsList });
};

const addRemoveFriend = async (req, res) => {
  const { id, friendId } = req.params;
  const user = await User.findOne({ _id: id }).select("friends");
  const friend = await User.findOne({ _id: friendId }).select("friends");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${id}`);
  }
  if (!friend) {
    throw new CustomError.NotFoundError(`No user with id : ${friendId}`);
  }
  if (user.friends.includes(friendId)) {
    user.friends.pop(friendId);
    friend.friends.pop(id);
  } else {
    user.friends.push(friendId);
    friend.friends.push(id);
  }
  await user.save();
  await friend.save();
  const friendsList = await User.findOne({ _id: id })
    .select("friends")
    .populate({
      path: "friends",
      select: "firstName lastName picturePath occupation",
    });
  res.status(StatusCodes.OK).json({ friends: friendsList.friends });
};

const updateUser = async (req, res) => {
  const { firstName, lastName, location, occupation } = req.body;
  if (!firstName || !lastName || !location || !occupation) {
    throw new BadRequestError("Please provide all values");
  }
  let { picturePath } = req.user;
  if (req.files) {
    const userImage = req.files.picture;
    if (!userImage.mimetype.startsWith("image")) {
      throw new CustomError.BadRequestError("Please upload an image");
    }
    const maxSize = 1024 * 1024 * 10;
    if (userImage.size > maxSize) {
      throw new CustomError.BadRequestError(
        "Please upload an image smaller than 10MB"
      );
    }
    fs.unlink(
      path.join(
        __dirname,
        "../../client/src/assets/" + `${req.user.picturePath}`
      ), (err) => {
        if (err) {
          throw err;
        }
      }
    );
    const imagePathAbsolute = path.join(
      __dirname,
      "../../client/src/assets/" + `${userImage.name}`
    );
    await userImage.mv(imagePathAbsolute);
    picturePath = userImage.name;
  }

  console.log(picturePath);

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    {
      firstName,
      lastName,
      occupation,
      location,
      picturePath,
    },
    { new: true, runValidators: true }
  );
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({user: tokenUser});
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
};
