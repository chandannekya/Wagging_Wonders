import React from "react";
import ButtonLink from "./ButtonLink";
import { useNavigate } from "react-router-dom";
import Pet from "../pages/Pet";

import { getChatRoom } from "../services/oprations/chat";

const Card = ({ Image, Name, Species, Breed, gender, id, data }) => {
  const navigate = useNavigate();
  console.log(data);
  const chatClick = async () => {
    const rsdata = await getChatRoom(data.postedBy);
    navigate(`/chat/${data.postedBy}`);
    console.log(rsdata);
  };

  return (
    <div className="p-5  border-2 font-raleway border-gray-300 rounded-lg shadow-md">
      <div className="flex flex-col ">
        {/* Image */}
        <div className="w-full hover:scale-105 transition-all h-40 overflow-hidden rounded-lg">
          <img
            src={Image}
            className="w-full h-full object-contain "
            alt={Name}
          />
        </div>

        {/* Name */}
        <h1 className="font-raleway text-2xl mt-3 font-bold ">{Name}</h1>

        {/* Details */}
        <div className="flex gap-3">
          <div className="  flex flex-col  gap-2  mt-3">
            <span className="border-2 px-3 text-xs  text-center  w-fit t border-accentPink/69 rounded-full">
              {Species}
            </span>
            <span className="border-2 text-center px-3 text-xs  w-fit border-secondaryOrange rounded-full">
              {gender}
            </span>
            <span className="border-2 px-3  text-center w-fit text-xs border-gray-400 rounded-full">
              {Breed}
            </span>
          </div>

          {/* Buttons */}
          <div className="  flex justify-between items-end gap-3  mt-4">
            <button
              onClick={() => navigate(`/pets/${id}`, { state: { data } })}
              className="bg-amber-500 p-2 rounded-md hover:scale-105 transition-all"
            >
              Meet me
            </button>
            <button
              onClick={chatClick}
              className="bg-amber-300 p-2 px-4 rounded-md hover:scale-105 transition-all"
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
