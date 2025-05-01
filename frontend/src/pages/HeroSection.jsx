import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ButtonLink from "../components/ButtonLink";
import BlurCircle from "../components/BlurCircle";
import paw from "../assets/paw.png";
import cat from "../assets/herosectioncat.png";
import dog from "../assets/doghero.png";
import dog2 from "../assets/herodog2.png";

const DecorativePaw = ({ position }) => (
  <motion.div
    className={`absolute ${position} w-30`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <img src={paw} alt="paw print" />
  </motion.div>
);

const PetCard = ({ src, alt, bgColor, extraClasses = "", delay = 0 }) => (
  <motion.div
    className={`flex items-center justify-center ${bgColor} w-[250px] h-[200px] rounded-3xl shadow-lg ${extraClasses}`}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
  >
    <img className="w-[150px] h-[150px] object-contain" src={src} alt={alt} />
  </motion.div>
);

const HeroSection = () => {
  return (
    <div className="font-raleway mb-50 p-8 relative">
      {/* Background Blur Circles */}
      <BlurCircle top={20} left="45%" size={250} />
      <BlurCircle top={60} left="20%" size={250} />

      {/* Decorative Paws */}
      <DecorativePaw position="left-1 top-[50%] md:right-[40%] md:top-[25%]" />
      <DecorativePaw position="right-0 md:right-[10%] top-[10%]" />
      <DecorativePaw position="right-[15%] top-[80%] md:top-[80%]" />

      {/* Floating Pet Cards */}
      <div className="flex">
        <div className="hidden lg:flex lg:absolute right-[20%]">
          <PetCard
            src={cat}
            alt="Cute cat"
            bgColor="bg-[#FFDE79]"
            delay={0.2}
          />
        </div>
        <div className="hidden lg:flex lg:absolute right-[10%] top-[50%]">
          <PetCard
            src={dog}
            alt="Happy dog"
            bgColor="bg-[#FF8B4D]"
            delay={0.4}
          />
        </div>
        <div className="hidden lg:flex lg:absolute right-[30%] top-[70%]">
          <PetCard
            src={dog2}
            alt="Playful dog"
            bgColor="bg-[#FF4DBB]"
            delay={0.6}
          />
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="w-[90%] md:w-3/4 mx-auto text-center md:text-left"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
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

        {/* Buttons */}
        <div className="mt-5 flex flex-col md:flex-row gap-5 items-center md:justify-start">
          <ButtonLink text="Adopt" color="bg-[#FFDE79]" to="/pets" />
          <ButtonLink text="Donate" color="bg-[#FF8B4D]" to="/donate-pet" />
        </div>

        {/* Small Screen Pet Cards */}
        <div className="hidden md:flex lg:hidden justify-center gap-8 mt-10">
          <PetCard
            src={cat}
            alt="Cat"
            bgColor="bg-[#FFDE79]"
            extraClasses="w-[200px] h-[150px]"
            delay={0.2}
          />
          <PetCard
            src={dog}
            alt="Dog"
            bgColor="bg-[#FF8B4D]"
            extraClasses="w-[200px] h-[150px]"
            delay={0.4}
          />
          <PetCard
            src={dog2}
            alt="Dog 2"
            bgColor="bg-[#FF4DBB]"
            extraClasses="w-[200px] h-[150px]"
            delay={0.6}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
