const express = require("express");
const router = express.Router();

const { signup, googleAuth } = require("../controllers/auth_controllers");

router.post("/signup", signup);
router.post("/google", googleAuth);



module.exports = router;