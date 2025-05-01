import React, { useEffect, useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { getChats } from "../services/oprations/chat";
import { useNavigate } from "react-router-dom";

const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(""); // Handle error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await getChats(navigate);
        setChats(res);
      } catch (err) {
        setError("Failed to load chats. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchChats();
  }, []);

  // Format time function to handle timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex p-5 justify-between items-center rounded-b-lg gap-4 bg-[#FF8B4D] shadow-lg">
        <button className="text-4xl text-white" onClick={() => navigate("/")}>
          <IoArrowBackCircleSharp />
        </button>
        <h1 className="text-3xl font-semibold text-white">Wagging Chats</h1>
      </div>

      {/* Loading or error handling */}
      {loading ? (
        <div className="text-center py-10 text-xl text-gray-600">
          Loading Chats...
        </div>
      ) : error ? (
        <div className="text-center py-10 text-xl text-red-500">{error}</div>
      ) : chats.length > 0 ? (
        chats.map((chat, index) => (
          <div
            className="flex items-center gap-4 justify-between p-5 border-b border-gray-300 bg-white hover:bg-gray-100 rounded-lg shadow-md transition-all cursor-pointer"
            onClick={() => {
              navigate(`/chat/${chat.users[0]._id}`, {
                state: { postedBy: { id: chat._id, name: chat.users[0].name } },
              });
            }}
            key={index}
          >
            <div className="flex gap-4 items-center">
              <CgProfile className="text-5xl text-[#FF4DBB]" />
              <div>
                <h1 className="text-xl font-semibold text-[#FF4DBB]">
                  {chat.users[0].name}
                </h1>
                <p className="text-sm text-gray-500">
                  {chat?.lastMessage?.message || "No messages yet"}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              {chat?.lastMessage?.timestamp
                ? formatTime(chat.lastMessage.timestamp)
                : "No time available"}
            </p>
          </div>
        ))
      ) : (
        <div className="text-center py-10 text-xl text-gray-500">
          No Chats Found
        </div>
      )}
    </div>
  );
};

export default Chatlist;
