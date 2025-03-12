const ChatRoom = require("../model/chatRoom");
const Message = require("../model/message");

const sendMessage = async (req, res) => {
  try {
    const { chatId, message, senderId, receiverId } = req.body;
    const newMessage = new Message({ chatId, message, senderId, receiverId });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessagesByChatId = async (req, res) => {
  try {
    const chatId = req.params.id;
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    await Message.findByIdAndDelete(messageId); // Delete message
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const { message } = req.body;
    await Message.findByIdAndUpdate(messageId, { message });

    res.status(200).json({ message: "Message updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessagesByChatId,
  deleteMessage,
  editMessage,
};
