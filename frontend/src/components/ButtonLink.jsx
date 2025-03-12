import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonLink = ({ text, color, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`
        ${color} 
        text-xl sm:text-2xl md:text-2xl
        w-[150px] sm:w-[180px] md:w-[200px] 
        py-2 sm:py-3 md:py-4 
        rounded-2xl 
        border-b-2 border-[rgba(19,19,19,0.23)] 
        transition-transform hover:scale-105 
      `}
    >
      {text}
    </button>
  );
};

export default ButtonLink;
