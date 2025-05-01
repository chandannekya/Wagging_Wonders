import React from "react";
import { useParams } from "react-router-dom";
import Chatbox from "../components/Chatbox";
import Chatlist from "../components/Chatlist";

const Chat = () => {
  const params = useParams();
  const chatId = params.id; // Get chat ID from URL parameter

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden">
      {/* For small screens (below 1024px), show Chatlist or Chatbox based on chatId */}
      <div className="lg:hidden w-full">
        {chatId ? (
          <Chatbox /> // Display Chatbox if chatId is available
        ) : (
          <Chatlist /> // Otherwise, display Chatlist
        )}
      </div>

      {/* For larger screens (above 1024px), display both Chatlist and Chatbox */}
      <div className="lg:w-1/4 hidden lg:block">
        <Chatlist />
      </div>
      <div className="lg:w-3/4 w-full">
        <Chatbox />
      </div>
    </div>
  );
};

export default Chat;
