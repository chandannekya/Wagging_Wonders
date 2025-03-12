import React from "react";
import { CgProfile } from "react-icons/cg";
import { SlOptionsVertical } from "react-icons/sl";
import { GrAttachment } from "react-icons/gr";
import { IoSendSharp } from "react-icons/io5";

const Chatbox = () => {
  return (
    <div className="flex flex-col h-screen font-[var(--font-raleway)]">
      {/* Header Section */}
      <div className="flex p-5 justify-between items-center rounded-b-lg gap-4 bg-[var(--color-primaryYellow)] shadow-md">
        <div className="flex items-center gap-5">
          <CgProfile className="text-4xl text-[var(--color-textGray)]" />
          <h1 className="text-2xl font-semibold text-[var(--color-textGray)]">
            Full name
          </h1>
        </div>
        <SlOptionsVertical className="text-[var(--color-textGray)]" />
      </div>

      {/* Chat Section */}
      <div
        className="flex-1 w-full justify-between p-6 rounded-2xl flex flex-col"
        style={{
          background:
            "linear-gradient(180.39deg, rgba(255, 255, 255, 0.001) 12.17%, rgba(255, 222, 121, 0.4) 99.58%)",
        }}
      >
        <div className="flex-grow overflow-auto">
          <div className="text-[var(--color-textGray)]">No messages yet...</div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-[32px] flex items-center gap-2 p-4 border-2 border-[var(--color-primaryYellow)] shadow-sm">
          <GrAttachment className="text-[var(--color-textGray)] cursor-pointer" />
          <textarea
            placeholder="Type..."
            className="w-full focus:outline-none resize-none overflow-hidden h-auto text-[var(--color-textGray)]"
            rows="1"
            style={{ maxHeight: "6rem" }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(
                e.target.scrollHeight,
                96
              )}px`;
            }}
          />
          <IoSendSharp className="cursor-pointer text-2xl text-[var(--color-accentPink)]" />
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
