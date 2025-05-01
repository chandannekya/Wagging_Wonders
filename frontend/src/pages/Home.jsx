import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "./HeroSection";
import About from "./About";
import Donation from "./Donation";
import Faq from "./Faq";
import Contactus from "./Contactus";
import Footer from "./Footer";
const Home = () => {
  return (
    <div className=" flex flex-col">
      <Navbar />
      <HeroSection />
      <About />
      <Donation />
      <Faq></Faq>
      <Contactus />
      <Footer />
    </div>
  );
};

export default Home;
