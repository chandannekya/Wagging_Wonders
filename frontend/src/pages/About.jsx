import React from "react";
import paw from "../assets/paw.png";
import BlurCircle from "../components/BlurCircle";

const About = () => {
  return (
    <div className="flex relative flex-col font-raleway items-center justify-between m-5 md:m-20 mt-20">
      <div className="flex flex-col-reverse md:flex-row w-full md:w-3/4 gap-10 md:gap-15 rounded-2xl justify-evenly items-center bg-[#FFDE79] p-5">
        <p className="w-full md:w-2/4 text-base md:text-lg lg:text-xl p-5 text-center md:text-left">
          At Wagging Wonders, we connect loving families with pets in need.
          Whether you're looking to adopt a furry friend or donate to support
          rescued animals, we make it easy to change lives.
        </p>

        <div className="flex flex-row lg:flex-col justify-center items-center">
          <div className="bg-black w-2 h-2 rounded-full"></div>
          <div className="bg-black w-[350px] lg:w-[1px] rounded-3xl lg:h-[150px] h-[1px]"></div>
          <div className="bg-black w-2 h-2 rounded-full"></div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold">
          About <br /> Us!
        </h1>
      </div>

      <div className="flex flex-col md:flex-row w-full items-center justify-around mt-10">
        <div className="relative mb-10 md:mb-0 text-center lg:text-left">
          <h1 className="text-4xl md:text-4xl font-bold mb-4">Our Mission</h1>
          <p className="text-lg md:text-xl lg:text-2xl">
            🐾 Rescue & Rehome: <br />
            Saving stray and abandoned pets. <br />
            ❤️ Responsible Adoption: <br /> Finding the perfect match. <br />
            💰 Support & Care: <br /> Donations provide food, shelter, and
            medical aid.
          </p>
          <div
            className="
              absolute 
              top-[65%] left-[50%] 
              w-full h-[250px]
              -translate-x-1/2 -translate-y-1/2 
              bg-[rgba(214,70,195,0.15)] 
              rounded-lg 
              blur-xl
              -z-50
            "
          ></div>
        </div>
        <div className="bg-amber-500 w-32 h-32 md:w-40 md:h-40 lg:w-70 lg:h-70 rounded-3xl"></div>
      </div>

      <div className="absolute right-[85%] md:right-[35%] md:top-[40%] w-20 md:w-30 top-[45%]">
        <img src={paw} alt="Paw" className="w-full h-auto" />
      </div>
      <div className="absolute right-0 md:top-[95%] w-20 md:w-30 top-[60%]">
        <img src={paw} alt="Paw" className="w-full h-auto" />
      </div>
      <div className="absolute right-0 md:top-[20%] w-20 md:w-30 top-[90%]">
        <img src={paw} alt="Paw" className="w-full h-auto" />
      </div>
      <div className="absolute right-[90%] md:top-[-10%] w-20 md:w-30 top-[80%]">
        <img src={paw} alt="Paw" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default About;
