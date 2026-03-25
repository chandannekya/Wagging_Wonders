import React from "react";
import { useParams } from "react-router-dom";
import Chatbox from "../components/Chatbox";
import Chatlist from "../components/Chatlist";

const Chat = () => {
  const params = useParams();
  const chatId = params.id;

  return (
    <div className="flex flex-col lg:flex-row w-full h-[100dvh] overflow-hidden bg-gray-50 font-raleway pt-20">
      
      {/* Mobile view */}
      <div className="lg:hidden w-full h-full flex-1 overflow-hidden">
        {chatId ? <Chatbox /> : <Chatlist />}
      </div>

      {/* Desktop view */}
      <div className="hidden lg:flex w-full h-[calc(100vh-80px)] max-w-[1600px] mx-auto border-x border-gray-100 bg-white shadow-2xl rounded-t-3xl overflow-hidden mt-6">
        <div className="w-[350px] xl:w-[400px] flex-shrink-0 border-r border-[#FFDE79]/30 bg-white">
          <Chatlist />
        </div>
        <div className="flex-1 bg-[#fafafa]">
          <Chatbox />
        </div>
      </div>
    </div>
  );
};

export default Chat;
