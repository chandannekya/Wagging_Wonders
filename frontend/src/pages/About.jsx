import React from "react";
import { motion } from "framer-motion";
import paw from "../assets/paw.png";
import BlurCircle from "../components/BlurCircle";

const About = () => {
  const PawImage = ({ position, delay = 0 }) => (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.8, type: "spring" }}
      className={`absolute ${position} w-20 md:w-30`}
    >
      <img src={paw} alt="Paw" className="w-full h-auto" />
    </motion.div>
  );

  return (
    <div className="relative flex flex-col items-center justify-between mx-5 md:mx-10 lg:mx-20 mt-20 font-raleway">
      {/* About Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col-reverse md:flex-row w-full md:w-3/4 gap-10 md:gap-15 rounded-2xl items-center justify-evenly bg-[#FFDE79] p-5"
      >
        <p className="w-full md:w-2/4 text-base md:text-lg lg:text-xl p-5 text-center md:text-left">
          At Wagging Wonders, we connect loving families with pets in need.
          Whether you're looking to adopt a furry friend or donate to support
          rescued animals, we make it easy to change lives.
        </p>

        {/* Divider */}
        <div className="flex flex-row lg:flex-col items-center justify-center space-x-2 lg:space-x-0">
          <div className="bg-black w-2 h-2 rounded-full" />
          <div className="bg-black w-[350px] lg:w-[1px] h-[1px] lg:h-[150px] rounded-3xl" />
          <div className="bg-black w-2 h-2 rounded-full" />
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          About <br /> Us!
        </h1>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col md:flex-row w-full items-center justify-around mt-10"
      >
        <div className="relative mb-10 md:mb-0 text-center lg:text-left w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-4xl font-bold mb-4">Our Mission</h1>
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
            🐾 Rescue & Rehome: <br />
            Saving stray and abandoned pets. <br />
            ❤️ Responsible Adoption: <br />
            Finding the perfect match. <br />
            💰 Support & Care: <br />
            Donations provide food, shelter, and medical aid.
          </p>

          {/* Background Blur */}
          <div className="absolute top-[65%] left-1/2 w-full h-[250px] -translate-x-1/2 -translate-y-1/2 bg-[rgba(214,70,195,0.15)] rounded-lg blur-xl -z-50" />
        </div>

        {/* Decorative Box */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-amber-500 w-32 h-32 md:w-40 md:h-40 lg:w-70 lg:h-70 rounded-3xl"
        />
      </motion.div>

      {/* Paws Decorations */}
      <PawImage
        position="right-[85%] md:right-[35%] top-[45%] md:top-[40%]"
        delay={0.2}
      />
      <PawImage position="right-0 top-[60%] md:top-[95%]" delay={0.4} />
      <PawImage position="right-0 top-[90%] md:top-[20%]" delay={0.6} />
      <PawImage position="right-[90%] top-[80%] md:top-[-10%]" delay={0.8} />
    </div>
  );
};

export default About;
