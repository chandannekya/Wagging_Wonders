import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { groomingEndpoints } from "../services/Apis";

const Grooming = () => {
  const [groomers, setGroomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroomers();
  }, []);

  const fetchGroomers = async () => {
    try {
      const res = await fetch(groomingEndpoints.GET_GROOMERS);
      const data = await res.json();
      if (data.success) {
        setGroomers(data.groomers);
      }
    } catch (err) {
      // Ignore if backend isn't ready
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (groomerId) => {
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;
      const userId = userStr ? JSON.parse(userStr).user?._id : null;
      
      if (!token) {
        toast.error("Please login to book an appointment.");
        return;
      }

      const res = await fetch(groomingEndpoints.BOOK_GROOMER, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ groomerId, userId, date: new Date().toISOString() })
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
        <span className="inline-block bg-[#FF4DBB] text-white font-bold px-6 py-2 rounded-full mb-4 shadow-sm">Pamper Your Pet</span>
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Professional Grooming Services</h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed">Treat your furry friend to a spa day. Book one of our certified, loving groomers today.</p>
      </motion.div>

      {loading ? (
        <div className="text-center z-10"><p className="text-lg font-bold animate-pulse text-[#FF8B4D]">Loading groomers...</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl z-10">
          {groomers.map((groomer, i) => (
            <motion.div
              key={groomer._id || i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-4 border-[#FFDE79] flex flex-col items-center"
            >
              <img src={groomer.image} alt={groomer.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#FFDE79] shadow-sm mx-auto" />
              <h2 className="text-2xl font-bold text-center mb-1">{groomer.name}</h2>
              <p className="text-[#FF8B4D] font-bold text-center mb-6">{groomer.location}</p>
              
              <div className="w-full bg-gray-50 rounded-2xl p-5 mb-8 text-sm border border-gray-100 flex-grow">
                <p className="font-bold mb-3 text-lg border-b pb-2">Services & Pricing</p>
                {groomer.services?.map((svc, idx) => (
                  <div key={idx} className="flex justify-between items-center mb-2 last:mb-0">
                    <span className="font-medium">{svc.name}</span>
                    <span className="font-black text-[#FF4DBB]">${svc.price}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleBook(groomer._id)}
                className="w-full py-4 bg-[#FF4DBB] text-white font-bold text-lg rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
              >
                Book Appointment
              </button>
            </motion.div>
          ))}
          {groomers.length === 0 && (
             <div className="col-span-full text-center py-12 bg-gray-50 rounded-[3rem] p-8 border-4 border-dashed border-gray-200">
              <p className="text-2xl font-bold text-gray-400">No groomers available nearby.</p>
              <p className="mt-2 text-lg text-gray-400">Please check back later!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Grooming;
