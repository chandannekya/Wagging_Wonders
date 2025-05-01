import React from "react";
import { useNavigate } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <TbError404 className="text-6xl text-[#FF4DBB] mx-auto mb-4 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-center text-[#FF4DBB] mb-3">
          Something Went Wrong
        </h1>
        <p className="text-xl text-center text-gray-600 mb-6">
          We encountered an unexpected issue. Please try again later.
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={goHome}
            className="px-8 py-3 bg-[#FF8B4D] text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Go to Homepage
          </button>
          <button
            onClick={goBack}
            className="px-8 py-3 bg-[#FFDE79] text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
