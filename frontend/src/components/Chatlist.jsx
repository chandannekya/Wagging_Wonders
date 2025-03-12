import React from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
const Chatlist = () => {
  return (
    <div className=" ">
      <div className="flex p-5 justify-around  px-6  items-center rounded-b-lg  gap-4  bg-pink-100">
        <button className="text-4xl">
          <IoArrowBackCircleSharp />
        </button>
        <h1 className=" text-3xl font-bold">Wannger Chats</h1>
      </div>

      <div className="flex items-center gap-4 justify-around p-5">
        <div className="flex gap-5 items-center">
          <CgProfile className="text-5xl" />
          <div className="">
            <h1 className="text-xl font-semibold ">full name</h1>
            <p className="text-sm text-gray-500">message.........</p>
          </div>
        </div>
        <p>time</p>
      </div>
    </div>
  );
};

export default Chatlist;
