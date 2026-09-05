const express = require("express");
const chatController = require("../controller/aiController");
const router = express.Router();

router.post("/chat", chatController);

module.exports = router;
