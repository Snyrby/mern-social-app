const express = require('express');
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const { register, login, logout, verifyEmail, forgotPassword } = require("../controllers/authController");

router.post("/register", register); // chain base on use
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.delete("/logout", authenticateUser, logout);
router.post("/forgot-password", forgotPassword);
module.exports = router;