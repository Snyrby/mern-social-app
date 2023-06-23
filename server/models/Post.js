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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PostSchema.virtual("userInfo", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
  justOne: false,
  options: {
    select: "firstName lastName picturePath",
  },
})

module.exports = mongoose.model("Post", PostSchema);
