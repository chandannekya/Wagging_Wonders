import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { signIn } from "../services/oprations/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignInform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(signIn(data.email, data.password, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primaryYellow/5 p-4">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-textGray text-center">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              type="email"
              id="email"
              placeholder="Email"
              className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-secondaryOrange focus:outline-none"
            />
            <label
              htmlFor="email"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
            >
              Email
            </label>
            {errors.email && (
              <span className="text-pink-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              type="password"
              id="password"
              placeholder="Password"
              className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-secondaryOrange focus:outline-none"
            />
            <label
              htmlFor="password"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
            >
              Password
            </label>
            {errors.password && (
              <span className="text-pink-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-secondaryOrange cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-textGray mt-4">
          Don't have an account?{" "}
          <NavLink
            to={"/signup"}
            className="text-accentPink font-bold hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignInform;
