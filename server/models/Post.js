const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    post: {
      type: String,
      required: [true, "Please provide a post"],
      maxlength: [1000, "Posts can not be more than 1000 characters"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [{
      type: mongoose.Types.ObjectId,
      ref: "Comment",
      default: [],
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
