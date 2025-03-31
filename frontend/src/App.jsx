import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Petlisting from "./pages/Petlisting";
import Pet from "./pages/Pet";
import DonatePet from "./pages/DonatePet";
import { useSelector } from "react-redux";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className=" justify-center flex scroll-smooth">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat/*" element={<Chat />} />
        <Route path="/pets" element={<Petlisting />} />
        <Route path="/pets/:id" element={<Pet />} />

        <Route
          path="/donate-pet"
          element={isAuthenticated ? <DonatePet /> : <SignIn />}
        />
      </Routes>
    </div>
  );
};

export default App;
