import axios from "axios";
import { chatEndpoints } from "../Apis";
const { GET_CHATS, SEND_MESSAGE, CHATROOM, GET_CHAT } = chatEndpoints;

export const getChat = async (chatRoomId) => {
  try {
    const response = await axios.get(`${GET_CHAT}/${chatRoomId}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).value
        }`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error while calling getChat API: ", error);
  }
};

export const sendMessage = async (message, receverId, chatId) => {
  try {
    const response = await axios.post(
      SEND_MESSAGE,
      {
        chatId,
        receiverId: receverId,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).value
          }`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log("Error while calling sendMessage API: ", error);
  }
};

export const getChatRoom = async (userId) => {
  try {
    const token = JSON.parse(localStorage.getItem("token")).value;

    const response = await axios.post(
      `${CHATROOM}${userId}`,
      {}, // No body data, so empty object
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    // axios already returns parsed data
    return response.data;
  } catch (error) {
    console.log("Error while calling getChatRoom API: ", error);
  }
};

export const getChats = async () => {
  try {
    const tokenData = JSON.parse(localStorage.getItem("token"));
    if (!tokenData) throw new Error("Token not found");

    const token = tokenData.value;

    const response = await axios.get(`${GET_CHATS}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error while calling getChats API: ",
      error.response?.data || error.message
    );
  }
};
