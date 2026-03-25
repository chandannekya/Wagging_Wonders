import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { getChats } from "../services/oprations/chat";
import { useNavigate } from "react-router-dom";

const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await getChats(navigate);
        setChats(res);
      } catch (err) {
        setError("Failed to load chats.");
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="w-full h-full bg-white border-r border-gray-100 flex flex-col font-raleway">
      {/* Header */}
      <div className="flex px-6 py-6 justify-between items-center border-b border-gray-100 bg-white z-10">
        <div className="flex items-center gap-4">
          <button className="text-2xl text-gray-400 hover:text-[#FF8B4D] transition-colors" onClick={() => navigate("/")}>
            <IoArrowBackOutline />
          </button>
          <h1 className="text-xl font-extrabold text-[#4b4b4b] tracking-tight">Messages</h1>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-10"><p className="text-sm font-bold text-[#FF8B4D] animate-pulse">Loading...</p></div>
        ) : error ? (
          <div className="text-center py-10 text-sm text-red-500">{error}</div>
        ) : chats.length > 0 ? (
          chats.map((chat, index) => (
            <div
              className="flex items-center gap-4 justify-between p-5 border-b border-gray-50 bg-white hover:bg-[#FFDE79]/10 transition-colors cursor-pointer group"
              onClick={() => {
                navigate(`/chat/${chat.users[0]._id}`, {
                  state: { postedBy: { id: chat._id, name: chat.users[0].name } },
                });
              }}
              key={chat._id || index}
            >
              <div className="flex gap-4 items-center overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-[#FFDE79]/20 flex items-center justify-center text-[#FF8B4D] font-bold text-lg group-hover:bg-[#FFDE79]/40 transition-colors flex-shrink-0">
                  {chat.users[0].name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <h1 className="text-base font-bold text-[#4b4b4b] truncate group-hover:text-[#FF8B4D] transition-colors">{chat.users[0].name}</h1>
                  <p className="text-sm text-gray-400 truncate mt-0.5 font-medium">
                    {chat?.lastMessage?.message || "Active now"}
                  </p>
                </div>
              </div>
              <p className="text-[10px] font-bold text-gray-300 flex-shrink-0 self-start mt-1">
                {chat?.lastMessage?.timestamp ? formatTime(chat.lastMessage.timestamp) : ""}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-sm text-gray-400 font-medium">No active conversations.</div>
        )}
      </div>
    </div>
  );
};

export default Chatlist;
