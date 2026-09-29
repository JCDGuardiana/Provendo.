const express = require("express");
const router = express.Router();

const { signup, googleAuth, login } = require("../controllers/auth_controllers");

router.post("/signup", signup);
router.post("/google", googleAuth);
router.post("/login", login);


module.exports = router;