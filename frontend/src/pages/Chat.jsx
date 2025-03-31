import React from "react";
import Chatbox from "../components/Chatbox";
import Chatlist from "../components/Chatlist";
const Chat = () => {
  return (
    <div>
      <div className="flex w-screen h-screen">
        <div className="lg:w-1/4 md:w-1/3">
          <Chatlist />
        </div>
        <div className="w-3/4 ">
          <Chatbox />
        </div>
      </div>
    </div>
  );
};

export default Chat;
