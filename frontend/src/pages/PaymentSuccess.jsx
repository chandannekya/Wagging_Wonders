import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center font-raleway px-4">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center text-center max-w-lg w-full">
        <IoCheckmarkCircleOutline className="text-7xl text-green-500 mb-6" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Payment Successful!</h1>
        <p className="text-gray-500 mb-8 font-medium">Thank you for your purchase. We have received your payment perfectly, and your furry friend is going to love it!</p>
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-[#FF8B4D] hover:bg-[#ff7a33] text-white font-bold py-4 rounded-2xl shadow-md transition-all ease-in-out hover:shadow-lg"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
