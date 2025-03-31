const express = require("express");
const databaseConnection = require("./config/db");
const { intializeSocketIo } = require("./config/socketIo");
var cookieParser = require("cookie-parser");
const http = require("http");
require("dotenv").config();

const chatRoomRoutes = require("./routes/chatRoomRoutes");
const messageRoutes = require("./routes/messageRoutes");
const app = express();
app.use(cookieParser());

const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

databaseConnection();
intializeSocketIo(server);
app.use("/api/chatroom", chatRoomRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5003;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
