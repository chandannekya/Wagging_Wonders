import React, { useEffect, useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { getChats } from "../services/oprations/chat";
import { useNavigate } from "react-router-dom";

const Chatlist = () => {
  const [chats, setChats] = useState([]);

  const [chatrooms, setChatrooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      const res = await getChats();
      setChatrooms(res);
      setChats(res);
    };

    fetchChats();
  }, []);
  console.log(chats);
  return (
    <div className=" ">
      <div className="flex p-5 justify-around  px-6  items-center rounded-b-lg  gap-4  bg-pink-100">
        <button className="text-4xl">
          <IoArrowBackCircleSharp
            onClick={() => {
              navigate("/");
            }}
          />
        </button>
        <h1 className=" text-3xl font-bold">Wannger Chats</h1>
      </div>

      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <div
            className="flex items-center gap-4 justify-around p-5"
            onClick={() => {
              navigate(`/chat/${chat.users[0]._id}`, {
                state: { postedBy: { id: chat._id, name: chat.users[0].name } },
              });
            }}
            key={index}
          >
            <div className="flex gap-5 items-center">
              <CgProfile className="text-5xl" />
              <div>
                <h1 className="text-xl font-semibold">{chat.users[0].name}</h1>
                <p className="text-sm text-gray-500">
                  {chat?.lastMessage?.message}
                </p>
              </div>
            </div>
            <p>
              {new Date(chat?.lastMessage?.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))
      ) : (
        <div className=" text-center">No Chats found</div>
      )}
    </div>
  );
};

export default Chatlist;
