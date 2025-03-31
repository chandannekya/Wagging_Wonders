const express = require("express");

const router = express.Router();

const {
  sendMessage,
  getMessagesByChatId,
  deleteMessage,
  editMessage,
} = require("../controllers/messageController");
const { auth } = require("../middelewares/Auth");

router.post("/", auth, sendMessage);
router.get("/:id", auth, getMessagesByChatId);
router.delete("/:id", deleteMessage);
router.put("/:id", editMessage);

module.exports = router;
