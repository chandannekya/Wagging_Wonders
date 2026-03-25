import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center font-raleway px-4">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center text-center max-w-lg w-full">
        <IoCloseCircleOutline className="text-7xl text-red-500 mb-6" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Payment Cancelled</h1>
        <p className="text-gray-500 mb-8 font-medium">Your checkout session was safely stopped. No charges were made to your account. You can continue shopping whenever you're ready.</p>
        <button 
          onClick={() => navigate(-1)}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-2xl shadow-md transition-all ease-in-out"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
