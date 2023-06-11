const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost
} = require("../controllers/postController");

router.get("/", authenticateUser, getFeedPosts); // chain base on use
router.get("/:userId/posts", authenticateUser, getUserPosts);
router.patch("/:id/like", authenticateUser, likePost);
module.exports = router;
