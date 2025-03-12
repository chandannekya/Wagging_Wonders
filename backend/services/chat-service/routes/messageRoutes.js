const express = require("express");

const router = express.Router();

const {
  sendMessage,
  getMessagesByChatId,
  deleteMessage,
  editMessage,
} = require("../controllers/messageController");

router.post("/", sendMessage);
router.get("/:id", getMessagesByChatId);
router.delete("/:id", deleteMessage);
router.put("/:id", editMessage);

module.exports = router;
