const { default: axios } = require("axios");
const ChatRoom = require("../model/chatRoom");
const message = require("../model/message");
const Message = require("../model/message");

const createChatRoom = async (req, res) => {
  try {
    const { user2 } = req.body;
    const user1 = req.user.id;

    if (!user2) {
      return res.status(400).json({
        message: "participants required",
      });
    }

    // Check if a chatroom already exists between these two users
    const existingRoom = await ChatRoom.findOne({
      participants: { $all: [user1, user2], $size: 2 },
    });

    if (existingRoom) {
      return res.status(200).json({
        message: "Chatroom already exists",
        chatRoom: existingRoom,
      });
    }

    // Create a new chatroom if it doesn't exist
    const chatRoom = new ChatRoom({ participants: [user1, user2] });
    await chatRoom.save();

    res.status(201).json(chatRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getChatRoomsByUser = async (req, res) => {
  try {
    const userId = req.user.id.toString(); // Convert to string once

    // Get chat rooms where the user is a participant
    const chatRooms = await ChatRoom.find({
      participants: { $in: [userId] },
    }).populate("participants");

    // Get unique user IDs excluding the current user
    const userIds = [
      ...new Set(
        chatRooms
          .flatMap((room) => room.participants)
          .map((id) => id.toString())
          .filter((id) => id !== userId)
      ),
    ];

    if (userIds.length === 0) {
      // If no other users, return chatRooms as is
      return res.status(200).json(chatRooms);
    }

    // Fetch user details for all unique user IDs
    const usersdel = await axios.post(
      "http://localhost:5001/api/auth/usersDel",
      { userIds }
    );

    // Create a Map for faster lookups
    const userMap = new Map();
    usersdel.data.users.forEach((user) => {
      userMap.set(user._id.toString(), user);
    });

    // Add users field to each chat room
    const updatedChatRooms = chatRooms.map((chat) => ({
      ...chat.toObject(),
      users: chat.participants
        .map((participant) => userMap.get(participant.toString()))
        .filter((user) => user), // Remove undefined entries (e.g., current user)
    }));

    res.status(200).json(updatedChatRooms);
  } catch (error) {
    console.error("Error in getChatRoomsByUser:", error);
    res.status(500).json({ message: error.message });
  }
};

//delete chat room

const deleteChatRoom = async (req, res) => {
  try {
    const chatRoomId = req.params.id;
    await ChatRoom.findByIdAndDelete(chatRoomId);
    await Message.deleteMany({
      chatId: chatRoomId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createChatRoom,
  getChatRoomsByUser,
  deleteChatRoom,
};
