const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please provide a comment"],
      maxlength: [1000, "Comment can not be more than 1000 characters"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
