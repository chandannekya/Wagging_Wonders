// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatId: { type: String, required: true }, // Unique chat room ID
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
