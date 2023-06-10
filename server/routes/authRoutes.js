const express = require('express');
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const { register } = require("../controllers/authController");

router.post("/register", register); // chain base on use
module.exports = router;