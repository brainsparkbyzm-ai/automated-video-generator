console.log("chatRoutes loaded");

const express = require("express");
const router = express.Router();

const { chatController } = require("../controllers/chatController");

console.log("chatController:", chatController);

router.post("/chat", chatController);

module.exports = router;