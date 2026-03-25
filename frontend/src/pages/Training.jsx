import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { trainingEndpoints } from "../services/Apis";

const Training = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(trainingEndpoints.GET_COURSES);
      const data = await res.json();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (err) {
      // Ignore if backend isn't ready
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;
      const userId = userStr ? JSON.parse(userStr).user?._id : null;

      if (!token) {
        toast.error("Please login to enroll.");
        return;
      }

      const res = await fetch(trainingEndpoints.ENROLL_COURSE, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ courseId, userId })
      });
      const data = await res.json();
      if (data.success) toast.success(data.message);
      else toast.error("Enrollment failed");
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
        <span className="inline-block bg-[#FFDE79] text-[#4b4b4b] font-black px-6 py-2 rounded-full mb-4 shadow-sm border-[3px] border-[#FF8B4D]">Train & Play</span>
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Pet Training Programs</h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed">Unlock your pet's full potential with our expert-led training courses. From puppy basics to advanced obedience.</p>
      </motion.div>

      {loading ? (
        <div className="text-center z-10"><p className="text-lg font-bold animate-pulse text-[#FF8B4D]">Loading courses...</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl z-10">
          {courses.map((course, i) => (
            <motion.div
              key={course._id || i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-4 border-[#FF4DBB] flex flex-col items-center relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-[#FFDE79] text-[#4b4b4b] font-black py-2 px-5 rounded-full shadow-sm text-sm border-2 border-[#FF8B4D] z-10">{course.level}</div>
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-3xl mb-6 shadow-sm border-[3px] border-gray-100" />
              <h2 className="text-2xl font-bold text-center mb-2">{course.title}</h2>
              <p className="text-[#FF8B4D] font-bold text-center mb-6">Instructor: {course.instructor}</p>
              
              <div className="w-full bg-gray-50 rounded-2xl p-4 mb-8 text-sm flex flex-col gap-3 flex-grow border border-gray-100">
                <p className="flex justify-between items-center"><span className="text-gray-500 font-bold flex items-center">⏱ Duration:</span> <span className="font-bold text-lg text-[#4b4b4b]">{course.duration}</span></p>
                <p className="flex justify-between items-center"><span className="text-gray-500 font-bold flex items-center">💳 Price:</span> <span className="font-black text-xl text-[#FF4DBB]">${course.price}</span></p>
              </div>

              <button 
                onClick={() => handleEnroll(course._id)}
                className="w-full py-4 bg-[#FF4DBB] text-white font-bold text-lg rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
              >
                Enroll Now
              </button>
            </motion.div>
          ))}
          {courses.length === 0 && (
             <div className="col-span-full text-center py-12 bg-gray-50 rounded-[3rem] p-8 border-4 border-dashed border-gray-200">
              <p className="text-2xl font-bold text-gray-400">No training courses requested.</p>
              <p className="mt-2 text-lg text-gray-400">Check back later for new programs!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Training;
