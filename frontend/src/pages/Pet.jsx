import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackOutline, IoLocationOutline } from "react-icons/io5";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AdoptPet } from "../services/oprations/pet";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const Pet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = location.state || {};

  const adoptHandler = async () => {
    try {
      dispatch(AdoptPet(data._id));
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-center bg-[#fafafa]">
        <p className="text-2xl font-bold text-gray-400 mb-4">Pet not found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-[#FF8B4D] text-white rounded-lg hover:bg-[#ff7a33] transition-colors"
        >
          Return
        </button>
      </div>
    );
  }

  const position = [data.location?.latitude || 26.8467, data.location?.longitude || 80.9462];

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 pb-20 px-4 md:px-8 lg:px-12 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#FF8B4D] transition-colors w-fit font-medium text-sm"
        >
          <IoArrowBackOutline /> Back to listings
        </button>

        <div className="flex flex-col md:flex-row gap-10 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          
          {/* Image */}
          <div className="md:w-1/2 flex flex-col">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100"
            >
              <img
                src={data.photo || "https://via.placeholder.com/500"}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Details */}
          <div className="md:w-1/2 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#FF4DBB]/10 text-[#FF4DBB] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{data.species}</span>
              <span className="bg-[#FF8B4D]/10 text-[#FF8B4D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{data.gender}</span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">{data.name}</h1>
            <p className="text-gray-500 font-medium text-lg mb-6 flex items-center gap-2">
              <IoLocationOutline className="text-[#FFDE79] text-2xl" /> {data.location?.city || 'Unknown Location'}, {data.location?.state || ''}
            </p>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Breed</p>
                <p className="text-gray-900 font-medium">{data.breed}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Age</p>
                <p className="text-gray-900 font-medium">{data.age || '?'} years</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Temperament</p>
                <p className="text-gray-900 font-medium">{data.temperament}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Status</p>
                <p className="text-green-500 font-medium">Available</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">About</p>
              <p className="text-gray-600 leading-relaxed text-sm">
                {data.description || `${data.name} is looking for a loving home! Get in touch with the owner to learn more.`}
              </p>
            </div>

            <div className="mt-auto flex gap-4">
              <button
                className="flex-1 bg-[#FF8B4D] text-white font-semibold py-4 rounded-xl shadow-md hover:bg-[#ff7a33] hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
                onClick={adoptHandler}
              >
                Apply to Adopt
              </button>
              <button
                className="flex-1 bg-white border-2 border-[#FFDE79] text-gray-900 font-semibold py-4 rounded-xl hover:bg-yellow-50 transition-colors text-sm"
                onClick={() => navigate(`/chat/${data.postedBy}`)}
              >
                Message Owner
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight flex items-center gap-2">Reported Location <span className="text-2xl">📍</span></h2>
          <div className="w-full h-[300px] rounded-xl overflow-hidden bg-gray-100 relative z-0 border border-gray-200">
            <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              <Marker position={position}>
                <Popup className="font-raleway font-semibold text-gray-800">{data.name}'s general area.</Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Pet;
