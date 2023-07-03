const express = require('express');
const router = express.Router();

const { register, login } = require("../controllers/authController");

router.post("/register", register); // chain base on use
router.post("/login", login);
module.exports = router;