import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// you forgot to import it
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Petlisting from "./pages/Petlisting";
import Pet from "./pages/Pet";
import DonatePet from "./pages/DonatePet";
import ErrorPage from "./pages/ErrorPage";
import Donation from "./pages/Donation";
import Grooming from "./pages/Grooming";
import Veterinary from "./pages/Veterinary";
import Training from "./pages/Training";
import Blog from "./pages/Blog";
import Store from "./pages/Store";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import { logout } from "./slices/authSlice";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? element : <Navigate to="/signIn" />;
};

const App = () => {
  const dispatch = useDispatch();
  // const tokenData = useSelector((state) => state.auth.token);
  const tokenData = localStorage.getItem("token");

  useEffect(() => {
    if (tokenData) {
      const remainingTime = tokenData?.expiry - new Date().getTime();

      console.log(remainingTime);

      if (remainingTime > 0) {
        const timeoutId = setTimeout(() => {
          dispatch(logout());
        }, remainingTime);

        return () => clearTimeout(timeoutId); // Clear timeout on cleanup
      } else {
        dispatch(logout());
      }
    }
  }, [dispatch, tokenData]); // Only re-run when tokenData changes

  return (
    <div className="justify-center flex scroll-smooth">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pets" element={<Petlisting />} />
        <Route path="/pets/:id" element={<Pet />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/grooming" element={<Grooming />} />
        <Route path="/vets" element={<Veterinary />} />
        <Route path="/training" element={<Training />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/store" element={<Store />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentCancel />} />

        {/* Private Routes */}
        <Route path="/chat/:id" element={<PrivateRoute element={<Chat />} />} />
        <Route
          path="/donate-pet"
          element={<PrivateRoute element={<DonatePet />} />}
        />

        {/* Redirect unauthorized access */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
