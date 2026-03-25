import io from "socket.io-client";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { sendMessage, getChat } from "../services/oprations/chat";
import { SlOptionsVertical } from "react-icons/sl";
import { GrAttachment } from "react-icons/gr";
import { IoSendSharp, IoVideocamOutline, IoCallOutline } from "react-icons/io5";

const SOCKET_URL = "http://localhost:5003/";

const Chatbox = () => {
  const [messages, setmessages] = useState([]);
  const [message, setmessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const chatContainerRef = useRef(null);

  const receverId = location.pathname.split("/")[2];
  const chatId = location.state?.postedBy.id;
  const currentUserId = JSON.parse(localStorage.getItem("user"))?.user?._id;
  const contactName = location.state?.postedBy.name || "User";

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);
    if(chatId) newSocket.emit("joinChat", chatId);

    newSocket.on("receiveMessage", (data) => {
      if (data.senderId !== currentUserId) {
        setmessages((prev) => [...prev, data]);
      }
    });

    newSocket.on("connect_error", (err) => {
      setError("Failed to connect.");
    });

    return () => newSocket.disconnect();
  }, [chatId]);

  useEffect(() => {
    if(!chatId) return;
    const fetchChat = async () => {
      try {
        const res = await getChat(chatId);
        setmessages(res);
      } catch (err) {
        setError("Failed to load history.");
      }
    };
    fetchChat();
  }, [chatId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessagehandler = async () => {
    if (message.trim() === "") return;
    const newMessage = {
      chatId,
      message,
      senderId: currentUserId,
      receiverId: receverId,
      timestamp: new Date().toISOString(),
    };
    setmessages((prev) => [...prev, newMessage]);
    try {
      socket.emit("sendMessage", newMessage);
    } catch (err) {
      setError("Message failed to send.");
    }
    setmessage("");
  };

  if(!chatId) {
     return <div className="h-full w-full flex items-center justify-center bg-[#fafafa] font-raleway text-gray-400 font-medium">Select a conversation to start chatting.</div>
  }

  return (
    <div className="flex flex-col h-full font-raleway bg-[#fafafa]">
      {/* Header */}
      <div className="flex px-6 md:px-10 py-5 justify-between items-center bg-white border-b border-gray-100 z-10 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FF4DBB]/10 text-[#FF4DBB] font-bold flex items-center justify-center text-lg">
             {contactName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-[#4b4b4b] leading-tight tracking-tight">{contactName}</h1>
            <p className="text-xs text-green-500 font-bold tracking-wide mt-0.5">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6 text-gray-300">
           <IoCallOutline className="text-2xl cursor-pointer hover:text-[#FF8B4D] transition-colors" />
           <IoVideocamOutline className="text-2xl cursor-pointer hover:text-[#FF8B4D] transition-colors" />
           <SlOptionsVertical className="text-lg cursor-pointer hover:text-[#FF8B4D] transition-colors" />
        </div>
      </div>

      {error && <div className="text-center py-2 text-xs font-semibold bg-red-50 text-red-500">{error}</div>}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth" ref={chatContainerRef}>
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isSender = msg.senderId === currentUserId;
            return (
              <div key={index} className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}>
                <div className={`flex flex-col gap-1 max-w-[85%] md:max-w-[70%] ${isSender ? "items-end" : "items-start"}`}>
                  <div
                    className={`py-3 px-5 text-sm md:text-base font-semibold leading-relaxed shadow-sm ${
                      isSender
                        ? "bg-[#FF8B4D] text-white rounded-[1.5rem] rounded-tr-sm"
                        : "bg-white border border-gray-100 text-[#4b4b4b] rounded-[1.5rem] rounded-tl-sm"
                    }`}
                  >
                    <p className="break-words max-w-full">{msg.message}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold px-3">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm font-medium">
             Send a message to start the conversation
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 md:p-6 bg-white border-t border-gray-100 flex-shrink-0">
        <div className="flex items-end gap-3 bg-gray-50 rounded-3xl p-2 px-3 md:px-4 border border-gray-100 focus-within:border-[#FFDE79] focus-within:bg-white transition-all shadow-sm">
          <button className="text-gray-400 hover:text-[#FF8B4D] transition-colors p-3 mb-1">
            <GrAttachment className="text-xl" />
          </button>
          
          <textarea
            placeholder="Type your message..."
            className="w-full bg-transparent focus:outline-none resize-none text-sm md:text-base text-[#4b4b4b] py-4 font-medium scrollbar-hide"
            rows="1"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            style={{ maxHeight: "150px" }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessagehandler();
              }
            }}
          />
          
          <button 
            onClick={sendMessagehandler}
            disabled={!message.trim()}
            className={`p-4 rounded-2xl flex items-center justify-center transition-all mb-1 ${
              message.trim() ? "bg-[#FF8B4D] text-white hover:bg-[#ff7a33] hover:-translate-y-0.5 shadow-md" : "bg-gray-200 text-white"
            }`}
          >
            <IoSendSharp className="text-xl ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
