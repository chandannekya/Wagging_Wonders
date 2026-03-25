import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { donationEndpoints } from "../services/Apis";

const Donation = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ amount: "", message: "", donorName: "" });

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await fetch(donationEndpoints.GET_DONATIONS);
      const data = await res.json();
      if (data.success) {
        setDonations(data.donations);
      }
    } catch (err) {
      // Ignore if backend isn't ready
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;
      
      const res = await fetch(donationEndpoints.DONATION_CHECKOUT, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Stripe Error: Cannot initiate checkout.");
      }
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
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Support Our Furry Friends</h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed">Your generous donations help us provide food, shelter, and medical care for pets in need.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 bg-[#FFDE79] p-10 rounded-3xl shadow-lg border-[3px] border-white"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-[#4b4b4b]">Make a Donation</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold mb-2">Donor Name</label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-[#FF8B4D] transition-all font-medium text-lg placeholder-gray-400 border border-transparent"
                placeholder="John Doe"
                value={formData.donorName}
                onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Amount ($)</label>
              <input
                type="number"
                required
                min="1"
                className="w-full px-5 py-4 bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-[#FF8B4D] transition-all font-medium text-lg placeholder-gray-400 border border-transparent"
                placeholder="50"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Message (Optional)</label>
              <textarea
                className="w-full px-5 py-4 bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-[#FF8B4D] transition-all font-medium text-lg placeholder-gray-400 border border-transparent resize-none h-32"
                placeholder="For the puppies!"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-4 mt-2 bg-[#FF8B4D] text-white font-bold text-xl rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Donate Now ❤️
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 flex flex-col"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-[#FF4DBB] text-white py-4 rounded-full shadow-md">Recent Heroes</h2>
          
          <div className="flex-grow bg-gray-50 rounded-3xl p-6 shadow-inner overflow-y-auto max-h-[500px] border-4 border-gray-100">
            {loading ? (
              <p className="text-center font-bold text-gray-400 mt-10 animate-pulse">Loading donations...</p>
            ) : donations.length === 0 ? (
              <p className="text-center font-bold text-gray-400 mt-10">Be the first to donate!</p>
            ) : (
              <div className="flex flex-col gap-4">
                {donations.map((d, i) => (
                  <motion.div
                    key={d._id || i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 bg-white rounded-2xl shadow-sm border-l-[6px] border-[#FFDE79] hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-xl">{d.donorName}</h3>
                      <span className="bg-[#FF8B4D] text-white font-black px-4 py-1 rounded-full text-sm">
                        ${d.amount}
                      </span>
                    </div>
                    {d.message && <p className="text-gray-500 italic text-sm">"{d.message}"</p>}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Donation;
