const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
        type: String,
        required: [true, "Please provide a comment"],
        maxlength: 100,
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
  }, {timestamps: true});