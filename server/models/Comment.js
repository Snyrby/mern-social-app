const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    description: {
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
  },
  { timestamps: true }
);

CommentSchema.statics.calcTotalPostComments = async function (postId) {
  const result = await this.aggregate([
    { $match: { post: postId } },
    {
      $group: {
        _id: "$post",
        numOfPosts: { $sum: 1 },
      },
    },
  ]);
  try {
    await this.model("Post").findOneAndUpdate(
      { _id: postId },
      {
        numOfPosts: result[0]?.numOfPosts || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

CommentSchema.post("save", async function () {
  await this.constructor.calcTotalPostComments(this.post);
});

module.exports = mongoose.model("Comment", CommentSchema);
