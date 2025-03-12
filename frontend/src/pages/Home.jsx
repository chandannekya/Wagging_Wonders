import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "./HeroSection";
import About from "./About";
import Donation from "./Donation";
const Home = () => {
  return (
    <div className=" ">
      <Navbar />
      <HeroSection />
      <About />
      <Donation />
    </div>
  );
};

export default Home;
