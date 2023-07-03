const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const { 
    createComment, 
    getAllComments 
} = require("../controllers/commentController");

router.route("/:postId").get(getAllComments);
router.route("/").post(authenticateUser, createComment);

module.exports = router;