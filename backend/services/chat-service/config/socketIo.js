const { Server, Socket } = require("socket.io");

let io;

const connectedUsers = new Map();

const intializeSocketIo = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", (chatId, userId) => {
      socket.join(chatId);
      connectedUsers.set(userId, socket.id);
      console.log(`⚡: User joined chat: ${chatId}`);
    });

    socket.on("sendMessage", (messageData) => {
      const { chatId, message, senderId, receiverId } = messageData;
      console.log(`⚡: Message sent: ${message}`);
      socket.to(chatId).emit("receiveMessage", messageData);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
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
};
