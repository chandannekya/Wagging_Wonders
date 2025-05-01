import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const Contactus = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset(); // reset form after submit
  };

  // Reusable Input Field Component
  const InputField = ({
    id,
    label,
    type = "text",
    placeholder,
    validation,
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full md:w-1/2"
    >
      <input
        {...register(id, validation)}
        type={type}
        id={id}
        placeholder={placeholder}
        className="peer h-12 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all focus:border-secondaryOrange"
      />
      <label
        htmlFor={id}
        className="absolute left-3 -top-2 z-[1] px-1 text-xs text-gray-400 bg-white transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
      >
        {label}
      </label>
      {errors[id] && (
        <span className="text-pink-500 text-xs">{errors[id]?.message}</span>
      )}
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center  px-4">
      <div className="text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-raleway font-semibold"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg mt-2"
        >
          Have a question or just want to say hello? We'd love to hear from you!
        </motion.p>
      </div>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-3xl rounded-xl p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Name and Email Fields */}
        <div className="flex flex-col md:flex-row gap-6">
          <InputField
            id="name"
            label="Name"
            placeholder="Name"
            validation={{ required: "Name is required" }}
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            }}
          />
        </div>

        {/* Message Field */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <textarea
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message should be at least 10 characters",
              },
            })}
            id="message"
            placeholder="Message"
            className="peer w-full h-36 resize-none rounded-lg border-2 border-gray-300 px-4 py-2 text-sm text-gray-700 placeholder-transparent outline-none transition-all focus:border-secondaryOrange"
          />
          <label
            htmlFor="message"
            className="absolute left-3 -top-2 z-[1] px-1 text-xs text-gray-400 bg-white transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
          >
            Message
          </label>
          {errors.message && (
            <span className="text-pink-500 text-xs">
              {errors.message.message}
            </span>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-secondaryOrange text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Send
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Contactus;
