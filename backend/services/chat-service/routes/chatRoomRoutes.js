const express = require("express");

const router = express.Router();

const {
  createChatRoom,
  getChatRoomsByUser,
  deleteChatRoom,
} = require("../controllers/chatRoomController");

const { auth } = require("../middelewares/Auth");

router.post("/", auth, createChatRoom);
router.get("/", auth, getChatRoomsByUser);

router.delete("/:id", deleteChatRoom);

module.exports = router;
