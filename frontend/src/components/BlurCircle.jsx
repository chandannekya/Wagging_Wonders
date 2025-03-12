import React from "react";

const BlurCircle = ({
  color = "rgba(214,70,195,0.15)",
  size = 250,
  top = 50,
  left = "50%",
}) => {
  return (
    <div
      style={{
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: left,
      }}
      className="
        absolute 
      
        transform -translate-x-1/2 
        rounded-full 
        blur-xl 
        -z-50
      "
    ></div>
  );
};

export default BlurCircle;
