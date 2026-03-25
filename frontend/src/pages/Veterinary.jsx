import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { vetEndpoints } from "../services/Apis";

const Veterinary = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVets();
  }, []);

  const fetchVets = async () => {
    try {
      const res = await fetch(vetEndpoints.GET_VETS);
      const data = await res.json();
      if (data.success) {
        setVets(data.vets);
      }
    } catch (err) {
      // Ignore if backend isn't ready
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (vetId) => {
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;
      const userId = userStr ? JSON.parse(userStr).user?._id : null;
      
      if (!token) {
        toast.error("Please login to book a consultation.");
        return;
      }

      const res = await fetch(vetEndpoints.BOOK_VET, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ vetId, userId, date: new Date().toISOString() })
      });
      const data = await res.json();
      if (data.success) toast.success(data.message);
      else toast.error("Booking failed");
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center bg-white font-raleway text-[#4b4b4b]">
     
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 z-10"
      >
        <span className="inline-block bg-[#FFDE79] text-[#4b4b4b] font-black px-6 py-2 rounded-full mb-4 shadow-sm">Health First</span>
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Expert Veterinary Care</h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed">Ensure your pet's health with our network of certified veterinarians. Book a consultation or health check-up today.</p>
      </motion.div>

      {loading ? (
        <div className="text-center z-10"><p className="text-lg font-bold animate-pulse text-[#FFDE79]">Loading veterinarians...</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl z-10">
          {vets.map((vet, i) => (
            <motion.div
              key={vet._id || i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-4 border-[#FF8B4D] flex flex-col items-center"
            >
              <img src={vet.image} alt={vet.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#FF8B4D] shadow-sm mx-auto" />
              <h2 className="text-2xl font-bold text-center">{vet.name}</h2>
              <p className="text-[#FF4DBB] font-bold text-center mb-1">{vet.specialty}</p>
              <p className="text-gray-400 font-medium text-center mb-6">{vet.clinicName}</p>
              
              <div className="w-full bg-gray-50 rounded-2xl p-5 mb-8 text-sm flex-grow">
                <p className="flex justify-between items-center mb-3"><span className="text-gray-500 font-bold">Location:</span> <span className="font-semibold text-right">{vet.location}</span></p>
                <p className="flex justify-between items-center mb-3"><span className="text-gray-500 font-bold">Consultation:</span> <span className="font-black text-xl text-[#FFDE79] bg-[#4b4b4b] px-3 py-1 rounded-lg">${vet.consultationFee}</span></p>
                <p className="flex justify-between items-center"><span className="text-gray-500 font-bold">Rating:</span> <span className="text-yellow-500 font-bold text-lg">★ {vet.rating}</span></p>
              </div>

              <button 
                onClick={() => handleBook(vet._id)}
                className="w-full py-4 bg-[#FF8B4D] text-white font-bold text-lg rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
              >
                Book Consultation
              </button>
            </motion.div>
          ))}
          {vets.length === 0 && (
             <div className="col-span-full text-center py-12 bg-gray-50 rounded-[3rem] p-8 border-4 border-dashed border-gray-200">
              <p className="text-2xl font-bold text-gray-400">No veterinarians available right now.</p>
              <p className="mt-2 text-lg text-gray-400">Our network is expanding. Please check back later!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Veterinary;
