import React from "react";
import { motion } from "framer-motion";
import color1 from "../assets/colorDonation.png";
import color2 from "../assets/color2.png";
import ButtonLink from "../components/ButtonLink";

const Donation = () => {
  return (
    <div className="mt-[10rem]  flex items-center justify-center">
      <div className="relative font-raleway flex flex-col items-center justify-center text-center w-full px-4">
        {/* Blurred Background Circle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute max-w-[55.75rem] h-[24.625rem] rounded-[4.375rem] blur-[2.156rem]"
          style={{
            background: "rgba(214, 70, 195, 0.1)",
            top: "3.125rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-11/12 lg:w-3/4 mt-[2rem]"
        >
          <h1 className="text-[2.5rem] lg:text-[3.125rem] font-bold mb-[1rem]">
            Donate & Make a Difference 🐾
          </h1>
          <p className="text-[1.125rem] lg:text-[1.25rem] mb-[2rem]">
            Your kindness can save lives and give homeless pets a second chance.
            <br />
            Every donation helps provide food, shelter, and medical care for
            rescued animals.
          </p>
        </motion.div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-11/12 lg:w-3/4 mt-[2rem]"
        >
          <h1 className="text-[2rem] lg:text-[2.5rem] font-semibold mb-[1rem]">
            Your Donations Make an Impact
          </h1>
          <p className="text-[1.125rem] lg:text-[1.25rem] mb-[2.5rem] leading-relaxed">
            🍖 Nutritious Meals – Providing rescued pets with wholesome food for
            a healthier life <br />
            🏡 Safe Shelters – Offering warmth, security, and comfort to
            homeless animals. <br />
            🩺 Medical Care & Vaccinations – Ensuring every pet receives
            essential treatment and protection.
          </p>
        </motion.div>

        {/* Decorative Color Images (only visible on medium and larger screens) */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0.8, 1], opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: "easeInOut",
          }}
          className="absolute w-[6.25rem] h-[6.25rem] lg:w-[5.375rem] lg:h-[9.375rem] left-0 top-[0%] hidden lg:block"
        >
          <img
            src={color1}
            alt="Decoration"
            className="w-full h-full object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0.8, 1], opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: "easeInOut",
          }}
          className="absolute w-[6.25rem] h-[6.25rem] lg:w-[7.375rem] lg:h-[9.375rem] right-0 top-[90%] lg:top-[80%] hidden lg:block"
        >
          <img
            src={color2}
            alt="Decoration"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Donate Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-[3rem]"
        >
          <ButtonLink text={"Donate"} color={"bg-[#FFDE79]"} />
        </motion.div>
      </div>
    </div>
  );
};

export default Donation;
