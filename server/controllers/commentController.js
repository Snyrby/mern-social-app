const Comment = require("../models/Comment");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Post = require("../models/Post");
const User = require("../models/User");

const createComment = async (req, res) => {
  const { userId, postId, description } = req.body;
  const isValidUser = await User.findOne({ _id: userId });
  if (!isValidUser) {
    throw new CustomError.NotFoundError(`No user with id : ${userId}`);
  }
  const isValidPost = await Post.findOne({ _id: postId });
  if (!isValidPost) {
    throw new CustomError.NotFoundError(`No post with id : ${postId}`);
  }
  const newComment = new Comment({
    user: userId,
    post: postId,
    description,
  });
  const createdComment = await Comment.create(newComment);
  const comment = await createdComment.populate({
    path: "user",
    select: "firstName lastName picturePath",
  });
  isValidPost.numOfComments += 1;
  isValidPost.save();
  res.status(StatusCodes.CREATED).json({ comment });
};

const getAllComments = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId })
    .populate({
      path: "user",
      select: "firstName lastName picturePath",
    })
    .sort("-createdAt");
  res.status(StatusCodes.OK).json({ comments });
};

module.exports = {
  createComment,
  getAllComments,
};
