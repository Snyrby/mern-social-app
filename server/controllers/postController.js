const Post = require("../models/Post");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createPost = async (req, res) => {
  const { userId, description, picturePath } = req.body;
  const isValidUser = await User.findOne({ _id: userId });
  if (!isValidUser) {
    throw new CustomError.NotFoundError(`No user with id : ${userId}`);
  }
  const newPost = new Post({
    userId,
    description,
    picturePath,
  });
  req.body.user = req.user.userId;
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json(post);
};

const getFeedPosts = async (req, res) => {
  const post = await Post.find();
  res.status(StatusCodes.OK).json(post);
};

const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  const post = await Post.find({ userId });
  res.status(StatusCodes.OK).json(post);
};

const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const post = await Post.findById(id);
  const isLiked = post.likes.get(userId);

  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { likes: post.likes },
    { new: true }
  );

  res.status(StatusCodes.OK).json(updatedPost);
};

module.exports = {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
};
