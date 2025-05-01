import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import paw from "../assets/paw.png";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white border-t-4 border-[#FF8B4D] px-6 lg:px-20 py-10 font-raleway">
      <div className="grid gap-12 row-gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo & Description */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="sm:col-span-2"
        >
          <Link to="/" className="inline-flex items-center mb-4">
            <img src={paw} alt="logo" className="h-10 w-10" />
            <span className="ml-3 text-2xl font-extrabold tracking-wide text-gray-800">
              Wagging Wonders
            </span>
          </Link>
          <p className="text-sm text-gray-700 leading-relaxed max-w-md">
            At Wagging Wonders, we're passionate about creating joyful journeys
            for pets and their parents. Whether it's adoption, care, or
            nutrition—we're here to help every tail tell a beautiful story.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm"
        >
          <p className="text-lg font-semibold text-gray-900 mb-4">
            Quick Links
          </p>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:text-[#FF4DBB] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/pets" className="hover:text-[#FF4DBB] transition">
                Adopt
              </Link>
            </li>
            <li>
              <Link
                to="/donate-pet"
                className="hover:text-[#FF4DBB] transition"
              >
                Donate
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#FF4DBB] transition">
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact & Social */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm"
        >
          <p className="text-lg font-semibold text-gray-900 mb-4">
            Get in Touch
          </p>
          <p className="text-gray-700">
            Email:{" "}
            <a
              href="mailto:hello@waggingwonders.com"
              className="text-[#FF8B4D] font-medium hover:underline"
            >
              hello@waggingwonders.com
            </a>
          </p>

          <div className="mt-6">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Follow Us
            </p>
            <div className="flex space-x-4 text-[#FF8B4D] text-xl">
              <a href="#" className="hover:text-[#FF4DBB] transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-[#FF4DBB] transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-[#FF4DBB] transition">
                <FaYoutube />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col-reverse justify-between items-center lg:flex-row pt-6 mt-10 border-t border-gray-200"
      >
        <p className="text-sm text-gray-600 mt-4 lg:mt-0">
          © {new Date().getFullYear()} Wagging Wonders. All rights reserved.
        </p>
        <ul className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-6 text-sm text-gray-600">
          <li>
            <Link to="/privacy" className="hover:text-[#FF4DBB] transition">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="hover:text-[#FF4DBB] transition">
              Terms & Conditions
            </Link>
          </li>
        </ul>
      </motion.div>
    </footer>
  );
};

export default Footer;
