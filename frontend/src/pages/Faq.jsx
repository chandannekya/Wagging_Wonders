import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import componetfaq from "../assets/faqcomponent.png";
import catImage from "../assets/faqimage.png";
import paw from "../assets/paw.png"; // 🐾 make sure you have the paw icon!

const Faq = () => {
  const faqs = [
    {
      question: "What services does Wagging Wonders offer?",
      answer:
        "We offer pet adoption, grooming, boarding, daycare, and training services to ensure your furry friends are happy and well cared for.",
    },
    {
      question: "How can I adopt a pet from Wagging Wonders?",
      answer:
        "To adopt a pet, visit our center, meet the available pets, fill out an adoption form, and complete a short interview to ensure the best match for you and your pet.",
    },
    {
      question: "Do you provide pet boarding services?",
      answer:
        "Yes, we offer safe and comfortable boarding services with personalized care, including daily exercise, feeding, and playtime.",
    },
    {
      question: "How can I contact Wagging Wonders for more information?",
      answer:
        "You can reach us via our website, call us at our helpline, or visit our center during operating hours. We are happy to assist!",
    },
  ];

  const [showAnswer, setShowAnswer] = useState([]);

  const toggleAnswer = (index) => {
    setShowAnswer((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="w-[90%]  mx-auto mt-10 md:mt-20 flex flex-col lg:flex-row items-center relative gap-10 font-raleway overflow-hidden">
      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 relative"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">
          Frequently Wondered <br /> Questions
        </h1>

        <div className="absolute w-full top-28 -z-10 blur-lg opacity-60 p-5 rounded-3xl h-[300px] bg-[rgba(214,70,195,0.15)]" />

        <div className="space-y-4 lg:h-screen">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 border-b border-gray-300"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <h2 className="text-lg sm:text-xl font-semibold">
                  {faq.question}
                </h2>
                {showAnswer.includes(index) ? (
                  <FaMinus className="text-gray-600 hover:text-black transition duration-200" />
                ) : (
                  <IoMdAdd className="text-gray-600 hover:text-black transition duration-200" />
                )}
              </div>
              <p
                className={`mt-2 text-gray-700 transition-all duration-300 ease-in-out ${
                  showAnswer.includes(index) ? "block" : "hidden"
                }`}
              >
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 hidden lg:flex justify-center relative"
      >
        <img
          src={componetfaq}
          className="w-full max-w-md"
          alt="FAQ Component"
        />
        <motion.img
          initial={{ y: 20 }}
          animate={{ y: [20, 0, 20] }}
          transition={{ duration: 4 }}
          src={catImage}
          className="absolute bottom-0 right-1/2 translate-x-1/2 w-[350px] sm:w-[400px] lg:w-[450px]"
          alt="Cat"
        />
      </motion.div>

      {/* Paws for Decoration */}
      <motion.img
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: [-30, 0, -30] }}
        transition={{ duration: 5 }}
        src={paw}
        alt="Paw"
        className="absolute top-10 right-0  w-12 sm:w-16 md:w-20"
      />

      <motion.img
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: [30, 0, 30] }}
        transition={{ duration: 6 }}
        src={paw}
        alt="Paw"
        className="absolute bottom-2/3 right-10 sm:right-1/3 w-12 sm:w-16 md:w-20"
      />

      <motion.img
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: [-20, 0, -20] }}
        transition={{ duration: 4 }}
        src={paw}
        alt="Paw"
        className="absolute bottom-50 left-0 w-10 sm:w-12 md:w-16"
      />
    </div>
  );
};

export default Faq;
