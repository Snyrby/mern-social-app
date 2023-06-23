const Post = require("../models/Post");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createPost = async (req, res) => {
  const { userId, description, picturePath } = req.body;
  const isValidUser = await User.findOne({ _id: userId });
  console.log(isValidUser);
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
  const post = await Post.create(newPost);
  res.status(StatusCodes.CREATED).json(post);
};

const getFeedPosts = async (req, res) => {
  const posts = await Post.find({}).populate("userInfo");
  res.status(StatusCodes.OK).json(posts);
};

const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  const posts = await Post.find({ user: userId }).populate("userInfo");
  if (!posts) {
    throw new CustomError.NotFoundError(
      `No posts found with the user id of ${userId}`
    );
  }
  res.status(StatusCodes.OK).json({posts});
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
