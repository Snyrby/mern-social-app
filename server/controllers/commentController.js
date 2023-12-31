const Comment = require("../models/Comment");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Post = require("../models/Post");
const User = require("../models/User");
const { checkPermissions } = require("../utils");

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
  await isValidPost.save();
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

const deleteComment = async (req, res) => {
  const { userId } = req.user;
  const comment = await Comment.findOne({ _id: req.params.commentId });
  if (!comment) {
    throw new CustomError.NotFoundError(`No comment with id : ${commentId}`);
  }
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new CustomError.NotFoundError(`No User with id : ${userId}`);
  }
  const post = await Post.findOne({ _id: comment.post });
  if (!post) {
    throw new CustomError.NotFoundError(`No comment with id : ${postId}`);
  }
  if (
    req.user.role === "admin" &&
    userId !== comment.user.toString() &&
    userId !== post.user.toString()
  ) {
    throw new CustomError.UnauthorizedError(
      "Not authorized to access this route"
    );
  }
  await comment.deleteOne();
  post.numOfComments -= 1;
  await post.save();
  res.status(StatusCodes.OK).json({ msg: "Comment deleted successfully" });
};

module.exports = {
  createComment,
  getAllComments,
  deleteComment,
};
