const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  createJWT,
  checkPermissions,
} = require("../utils");

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
  const user = await User.findOne({ _id: req.params.id }).select("friends").populate({
    path:"friends",
    select:"firstName lastName picturePath occupation",
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
  const friendsList = await User.findOne({ _id: id }).select("friends").populate({
    path: "friends",
    select: "firstName lastName picturePath occupation",
  });
  res.status(StatusCodes.OK).json({ friends: friendsList.friends });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024 * 5;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 5MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  getUserFriends,
  addRemoveFriend,
  uploadImage,
};
