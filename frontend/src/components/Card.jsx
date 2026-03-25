import React from "react";
import { useNavigate } from "react-router-dom";
import { getChatRoom } from "../services/oprations/chat";

const Card = ({ Image, Name, Species, Breed, gender, id, data }) => {
  const navigate = useNavigate();

  const chatClick = async (e) => {
    e.stopPropagation();
    try {
      await getChatRoom(data.postedBy);
      navigate(`/chat/${data.postedBy}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div 
      className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-[#FFDE79] transition-all duration-300 cursor-pointer flex flex-col overflow-hidden h-full group"
      onClick={() => navigate(`/pets/${id}`, { state: { data } })}
    >
      <div className="relative w-full h-56 overflow-hidden bg-gray-50">
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          <span className="bg-white/90 backdrop-blur-sm text-[#FF4DBB] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {Species}
          </span>
          <span className="bg-white/90 backdrop-blur-sm text-[#FF8B4D] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {gender}
          </span>
        </div>
        <img
          src={Image || "https://via.placeholder.com/400"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt={Name}
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight mb-1 group-hover:text-[#FF8B4D] transition-colors">{Name}</h1>
        <p className="text-gray-500 text-sm mb-6 font-medium">{Breed}</p>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/pets/${id}`, { state: { data } });
            }}
            className="text-gray-900 font-semibold hover:text-[#FF8B4D] transition-colors text-sm"
          >
           View Details &rarr;
          </button>
          <button
            onClick={chatClick}
            className="bg-[#FF8B4D] text-white font-medium py-2 px-5 rounded-lg hover:bg-[#ff7a33] hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all text-sm"
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
