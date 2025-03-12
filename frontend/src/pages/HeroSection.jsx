import React from "react";
import ButtonLink from "../components/ButtonLink";
import BlurCircle from "../components/BlurCircle";
import paw from "../assets/paw.png";
import cat from "../assets/herosectioncat.png";
import dog from "../assets/doghero.png";
import dog2 from "../assets/herodog2.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="font-raleway mb-50 p-8">
      {/* Background Blur Circle */}
      <BlurCircle top={20} left="45%" size={250} />
      <div className="absolute left-1 top-[50%] md:right-[40%] md:top-[25%] w-30 ">
        <img src={paw} />
      </div>
      <div className="absolute right-0 md:right-[10%] top-[10%] w-30 ">
        <img src={paw} />
      </div>
      <div className="absolute right-[15%] md:top-[80%] w-30 top-[80%] ">
        <img src={paw} />
      </div>
      <div className="flex">
        <div className="lg:absolute hidden lg:flex items-center justify-center bg-[#FFDE79] w-[250px] h-[200px] right-[20%] rounded-3xl shadow-lg">
          <img className="w-[150px] h-[150px]" src={cat} alt="" />
        </div>
        <div className="lg:absolute hidden lg:flex bg-[#FF8B4D] items-center justify-center w-[250px] h-[200px] right-[10%] top-[50%] rounded-3xl shadow-lg">
          <img
            className="w-[200px] h-[150px] object-contain"
            src={dog}
            alt=""
          />
        </div>
        <div className="lg:absolute hidden lg:flex justify-center items-center bg-[#FF4DBB] w-[250px] h-[200px] right-[30%] top-[70%] rounded-3xl shadow-lg">
          <img
            className="w-[150px] h-[150px] object-contain"
            src={dog2}
            alt=""
          />
        </div>
      </div>
      {/* Main Content */}
      <div className="w-[90%] md:w-3/4 mx-auto text-center md:text-left">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
          Wagging <br />
          Wonders
        </h1>

        <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-5xl mb-2">
          Where Every Tail Tells a Story!
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-5xl font-extralight">
          Bringing joy to pets and their <br /> parents with premium care,
          <br /> nutrition, and love.
        </p>

        <BlurCircle top={60} left="20%" size={250} />
        <div className="mt-5 flex flex-col md:flex-row gap-5 justify-cente items-center md:justify-start">
          <ButtonLink text={"Adopt"} color={"bg-[#FFDE79]"} to={"/pets"} />
          <ButtonLink
            text={"Donate"}
            color={"bg-[#FF8B4D]"}
            to={"/donate-pet"}
          />
        </div>

        <div className="hidden md:flex lg:hidden justify-center gap-8 mt-10">
          <div className="flex items-center justify-center bg-[#FFDE79] w-[200px] h-[150px] rounded-3xl shadow-lg">
            <img className="w-[100px] h-[100px]" src={cat} alt="cat" />
          </div>
          <div className="flex items-center justify-center bg-[#FF8B4D] w-[200px] h-[150px] rounded-3xl shadow-lg">
            <img
              className="w-[150px] h-[100px] object-contain"
              src={dog}
              alt="dog"
            />
          </div>
          <div className="flex items-center justify-center bg-[#FF4DBB] w-[200px] h-[150px] rounded-3xl shadow-lg">
            <img className="w-[100px] h-[100px]" src={dog2} alt="dog2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
