const { Server } = require("socket.io");
const ChatRoom = require("../model/chatRoom");
const Message = require("../model/message");
let io;

const connectedUsers = new Map();

const intializeSocketIo = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔗: New connection: ${socket.id}`);

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      connectedUsers.set(chatId, socket.id);
      console.log(`⚡: User joined chat: ${chatId}`);
    });

    socket.on("sendMessage", async (messageData) => {
      
      const { chatId, message, senderId, receiverId } = messageData;

      // Save to DB
      const newMessage = new Message({ chatId, message, senderId, receiverId });
      await newMessage.save();

      await ChatRoom.findByIdAndUpdate(chatId, {
        lastMessage: newMessage._id,
        $push: { messages: newMessage._id },
      });

      io.to(chatId).emit("receiveMessage", messageData);
    });

    socket.on("disconnect", () => {
      console.log(`❌: User disconnected: ${socket.id}`);
      connectedUsers.forEach((value, key) => {
        if (value === socket.id) {
          connectedUsers.delete(key);
        }
      });
    });
  });
};

module.exports = {
  intializeSocketIo,
  getSocket: () => io,
  connectedUsers,
};
