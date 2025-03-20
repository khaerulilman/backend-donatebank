const express = require("express");
const { loginUser, logoutUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
