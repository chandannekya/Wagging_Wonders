import io from "socket.io-client";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { sendMessage, getChat } from "../services/oprations/chat";
import { CgProfile } from "react-icons/cg";
import { SlOptionsVertical } from "react-icons/sl";
import { GrAttachment } from "react-icons/gr";
import { IoSendSharp } from "react-icons/io5";

// SOCKET SERVER URL
const SOCKET_URL = "http://localhost:5003/"; // Replace with your server URL

const Chatbox = () => {
  const [messages, setmessages] = useState([]);
  const [message, setmessage] = useState("");
  const [socket, setSocket] = useState(null);
  const location = useLocation();
  const chatContainerRef = useRef(null);

  const receverId = location.pathname.split("/")[2];
  const chatId = location.state?.postedBy.id;
  const currentUserId = JSON.parse(localStorage.getItem("user")).user?._id;

  // Connect to socket and listen for messages
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Join room
    newSocket.emit("joinChat", chatId);

    // Receive new messages
    newSocket.on("receiveMessage", (data) => {
      if (data.senderId !== currentUserId) {
        setmessages((prev) => [...prev, data]);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chatId]);

  // Fetch old chat history from DB
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await getChat(chatId);
        console.log("chatId", res);
        setmessages(res);
      } catch (err) {
        console.error("Error fetching chat history", err);
      }
    };
    fetchChat();
  }, [chatId]);

  // Auto-scroll to bottom when new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending message
  const sendMessagehandler = async () => {
    if (message.trim() === "") return;

    const newMessage = {
      chatId,
      message,
      senderId: currentUserId,
      receiverId: receverId,
      timestamp: new Date().toISOString(),
    };

    // Optimistically update UI
    setmessages((prev) => [...prev, newMessage]);

    try {
      // await sendMessage(message, receverId, chatId);
      // Emit to other users

      socket.emit("sendMessage", newMessage);
    } catch (err) {
      console.error("Message failed to send", err);
    }

    setmessage("");
  };

  const onchangeHandler = (e) => {
    e.preventDefault();
    setmessage(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen font-[var(--font-raleway)] overflow-hidden">
      {/* Header */}
      <div className="flex p-5 justify-between items-center rounded-b-lg gap-4 bg-[var(--color-primaryYellow)] shadow-md">
        <div className="flex items-center gap-5">
          <CgProfile className="text-4xl text-[var(--color-textGray)]" />
          <h1 className="text-2xl font-semibold text-[var(--color-textGray)]">
            {location.state?.postedBy.name}
          </h1>
        </div>
        <SlOptionsVertical className="text-[var(--color-textGray)]" />
      </div>

      {/* Messages */}
      <div
        className="flex-1 w-full justify-between p-4 flex flex-col overflow-hidden"
        style={{
          background:
            "linear-gradient(180.39deg, rgba(255, 255, 255, 0.001) 12.17%, rgba(255, 222, 121, 0.4) 99.58%)",
        }}
      >
        <div
          ref={chatContainerRef}
          className="flex-grow overflow-auto overflow-x-hidden p-4 space-y-4"
        >
          {messages.length > 0 ? (
            messages.map((msg, index) => {
              const isSender = msg.senderId === currentUserId;
              return (
                <div
                  key={index}
                  className={`flex flex-col gap-1 ${
                    isSender ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isSender ? "flex-row-reverse" : ""
                    }`}
                  >
                    <CgProfile className="text-3xl text-[var(--color-textGray)]" />
                    <div
                      className={`rounded-[32px] p-4 max-w-[50%] object-contain ${
                        isSender
                          ? "bg-secondaryOrange text-white"
                          : "bg-[var(--color-primaryYellow)] text-[var(--color-textGray)]"
                      }`}
                    >
                      <p className="break-words">{msg.message}</p>
                    </div>
                  </div>
                  <p className="text-[var(--color-textGray)] text-xs">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500">No messages yet</div>
          )}
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-[32px] flex items-center gap-2 p-4 border-2 border-[var(--color-primaryYellow)] shadow-sm mt-2">
          <GrAttachment className="text-[var(--color-textGray)] cursor-pointer" />
          <textarea
            placeholder="Type..."
            className="w-full focus:outline-none resize-none overflow-hidden h-auto text-[var(--color-textGray)]"
            rows="1"
            onChange={onchangeHandler}
            value={message}
            style={{ maxHeight: "6rem" }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(
                e.target.scrollHeight,
                96
              )}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessagehandler();
              }
            }}
          />
          <IoSendSharp
            className="cursor-pointer text-2xl text-[var(--color-accentPink)]"
            onClick={sendMessagehandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
