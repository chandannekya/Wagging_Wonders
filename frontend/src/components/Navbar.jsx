import React, { useState } from "react";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { SiGooglemessages } from "react-icons/si";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Toggle Mobile Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle Dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  console.log(isAuthenticated);
  // Logout Function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signIn");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white w-full md:w-3/4 items-center text-black font-raleway font-medium text-lg md:text-xl flex justify-between shadow-lg shadow-[#D9D9D9] border-t-[1.5px] border-[#D9D9D9] rounded-2xl m-3">
        {/* Left Section */}
        <div className="hidden md:flex w-1/3 p-3 md:p-5 justify-around">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-gray-600" : "hover:text-gray-600"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-gray-600" : "hover:text-gray-600"
            }
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/donate"
            className={({ isActive }) =>
              isActive ? "text-gray-600" : "hover:text-gray-600"
            }
          >
            Donate
          </NavLink>
        </div>

        {/* Center Section */}
        <div className="relative flex w-1/2 md:w-1/3 justify-center items-center">
          <div className="flex justify-center items-center relative">
            <img
              src={logo}
              alt="logo"
              className="absolute w-14 h-14 md:w-18 md:h-18 object-contain"
            />
            <div className="bg-[#D9D9D9] w-8 h-14 md:w-10 md:h-18">
              <div className="bg-white w-8 h-14 md:w-10 md:h-18 rounded-tr-3xl"></div>
            </div>
            <div className="bg-[#D9D9D9] w-20 md:w-30 h-14 md:h-18 rounded-b-md"></div>
            <div className="bg-[#D9D9D9] w-8 h-14 md:w-10 md:h-18">
              <div className="bg-white w-8 h-14 md:w-10 md:h-18 rounded-tl-3xl"></div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <NavLink to={"/chat"}>
          <SiGooglemessages className="text-3xl cusror-pointer" />
        </NavLink>
        <div className="flex p-2 md:p-4 w-1/3 justify-end gap-2 relative">
          {/* Desktop Dropdown */}
          {isAuthenticated ? (
            <div
              className="hidden md:flex items-center cursor-pointer relative"
              onClick={toggleDropdown}
            >
              {user?.name || "User"}
              <span className="text-3xl md:text-4xl">
                <RiArrowDropDownLine />
              </span>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md w-32 text-sm">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="hidden md:flex items-center"
              onClick={() => navigate("/signIn")}
            >
              Sign In
            </button>
          )}
          {/* Mobile Menu Icon */}
          <div
            className="md:hidden text-3xl cursor-pointer"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <HiX /> : <HiMenuAlt2 />}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className=" absolute right-10 top-20 bg-white shadow-md rounded-md md:hidden text-center">
          <NavLink
            to="/about"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/donate"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Donate
          </NavLink>
          {isAuthenticated ? (
            <>
              <div className="px-4 py-2 text-gray-700">
                {user?.name || "User"}
              </div>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                navigate("/signIn");
                toggleMenu();
              }}
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
