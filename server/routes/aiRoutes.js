const express = require("express");
const chatController = require("../controller/aiController");
const router = express.Router();

router.post("/", chatController);

module.exports = router;
