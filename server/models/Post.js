const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please provide a post"],
      maxlength: [1000, "Posts can not be more than 1000 characters"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    picturePath: {
      type: String,
      default: "",
    },
    likes: [{
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: "",
    }],
    numOfComments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Post", PostSchema);
