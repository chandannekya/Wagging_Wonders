import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { IoArrowBackOutline } from "react-icons/io5";
import { GetAllPet } from "../services/oprations/pet";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Petlisting = () => {
  const [pets, setpets] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const getPet = async () => {
    try {
      const data = await GetAllPet();
      setpets(data?.data || []);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPet();
  }, []);

  return (
    <div className="font-raleway min-h-screen bg-[#fafafa] pt-24 pb-20 px-4 md:px-8 lg:px-12 flex flex-col items-center w-full">
      <div className="w-full max-w-7xl flex flex-col">
        
        {/* Minimal Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex items-center gap-4 mb-12 w-full"
        >
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white border border-gray-200 rounded-full hover:border-[#FFDE79] hover:bg-yellow-50 transition-all shadow-sm text-gray-600"
          >
            <IoArrowBackOutline className="text-2xl" />
          </button>
          <div className="ml-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Available Pets</h1>
            <p className="text-gray-500 mt-1 max-w-lg text-sm md:text-base">Find a loyal companion. Filter by breed, gender, or species.</p>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
          
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="w-full lg:w-1/4 flex flex-col gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm lg:sticky lg:top-28"
          >
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-3">Filters</h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Breed</label>
              <select className="w-full bg-gray-50 border border-transparent rounded-lg p-3 text-sm text-gray-700 focus:bg-white focus:border-[#FF8B4D] focus:ring-2 focus:ring-[#FF8B4D]/20 focus:outline-none transition-all cursor-pointer appearance-none">
                <option value="">All Breeds</option>
                <option value="labrador">Labrador</option>
                <option value="bulldog">Bulldog</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Gender</label>
              <select className="w-full bg-gray-50 border border-transparent rounded-lg p-3 text-sm text-gray-700 focus:bg-white focus:border-[#FF8B4D] focus:ring-2 focus:ring-[#FF8B4D]/20 focus:outline-none transition-all cursor-pointer appearance-none">
                <option value="">Any Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Species</label>
              <select className="w-full bg-gray-50 border border-transparent rounded-lg p-3 text-sm text-gray-700 focus:bg-white focus:border-[#FF8B4D] focus:ring-2 focus:ring-[#FF8B4D]/20 focus:outline-none transition-all cursor-pointer appearance-none">
                <option value="">All Species</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </div>

            <button className="w-full mt-2 py-3 bg-[#FF8B4D] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md hover:bg-[#ff7a33] hover:-translate-y-0.5 transition-all">
              Update Results
            </button>
          </motion.div>

          {/* Cards Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
               <div className="flex justify-center items-center h-64"><p className="text-gray-400 font-medium animate-pulse">Loading pets...</p></div>
            ) : pets && pets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
                {pets.map((pet, i) => (
                  <motion.div key={pet._id || i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                    <Card
                      Image={pet.photo}
                      Name={pet.name}
                      Breed={pet.breed}
                      gender={pet.gender}
                      Species={pet.species}
                      id={pet._id}
                      data={pet}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-2xl p-16 flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-xl font-bold text-gray-900 mb-2">No pets found</p>
                <p className="text-gray-500 text-sm">Adjust your filters and try again.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Petlisting;
