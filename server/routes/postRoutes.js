const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost
} = require("../controllers/postController");

// TODO: Uncomment for authenticate
// router.route("/").get(authenticateUser, getFeedPosts).post(authenticateUser, createPost); // chain base on use
router.route("/").get(getFeedPosts).post(createPost); // chain base on use
// router.get("/:userId", authenticateUser, getUserPosts);
router.get("/:userId", getUserPosts);
router.patch("/:id/like", authenticateUser, likePost);
module.exports = router;
