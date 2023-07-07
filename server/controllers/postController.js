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
    user: userId,
    description,
    picturePath,
  });
  //TODO: Uncomment for authentication
  // req.body.userId = req.user.userId;
  // const post = await Post.create(req.body);
  const createdPost = await Post.create(newPost);
  const posts = await createdPost.populate({
    path: "user",
    select: "firstName lastName picturePath location",
  });
  res.status(StatusCodes.CREATED).json({ posts });
};

const getFeedPosts = async (req, res) => {
  const posts = await Post.find({}).populate({
    path: "user",
    select: "firstName lastName picturePath location",
  });
  res.status(StatusCodes.OK).json({ posts });
};

const getUserPosts = async (req, res) => {
  const { id: user } = req.params;
  const posts = await Post.find({ user }).populate({
    path: "user",
    select: "firstName lastName picturePath location",
  });
  if (!posts) {
    throw new CustomError.NotFoundError(
      `No posts found with the user id of ${user}`
    );
  }
  res.status(StatusCodes.OK).json({ posts });
};

const likePost = async (req, res) => {
  const { id: postId } = req.params;
  const { userId } = req.body;
  const post = await Post.findOne({ _id: postId }).populate({
    path: "user",
    select: "firstName lastName picturePath location",
  });
  const isLiked = post.likes.includes(userId);
  if (isLiked) {
    post.likes.pop(userId);
  } else {
    post.likes.push(userId);
  }
  await post.save();
  res.status(StatusCodes.OK).json({ post });

  // res.status(StatusCodes.OK).json({ updatedPost, count: updatedPost.likes.length });
};

module.exports = {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
};
