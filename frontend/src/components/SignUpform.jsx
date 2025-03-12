import React from "react";
import { useForm } from "react-hook-form";
import { signUp } from "../services/oprations/auth";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const SignUpform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(signUp(data, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primaryYellow/5 p-4">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-textGray text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Name can only contain letters and spaces",
                },
              })}
              type="text"
              id="name"
              placeholder="Name"
              className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-secondaryOrange focus:outline-none"
            />
            <label
              htmlFor="name"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
            >
              Name
            </label>
            {errors.name && (
              <span className="text-pink-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
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
          <div className="relative">
            <input
              {...register("confirm_password", {
                required: "confirm_password is required",
                minLength: {
                  value: 6,
                  message: "Confirm Password must be same as password",
                },
              })}
              type="password"
              id="confirm_password"
              placeholder="confirm_password"
              className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-secondaryOrange focus:outline-none"
            />
            <label
              htmlFor="confirm_password"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
            >
              Confirm Password
            </label>
            {errors.confirm_password && (
              <span className="text-pink-500 text-xs">
                {errors.confirm_password.message}
              </span>
            )}
          </div>

          <div className="flex gap-5">
            {" "}
            <div className="relative">
              <input
                {...register("city", {
                  required: "city is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "City can only contain letters and spaces",
                  },
                })}
                type="text"
                id="city"
                placeholder="City"
                className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-secondaryOrange focus:outline-none"
              />
              <label
                htmlFor="city"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
              >
                City
              </label>
              {errors.city && (
                <span className="text-pink-500 text-xs">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                {...register("postal_code", {
                  required: "Postal is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "postal code can only contain 6 digit numbers ",
                  },
                })}
                type="text"
                id="postal_code"
                placeholder="Postal Code"
                className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-secondaryOrange focus:outline-none"
              />
              <label
                htmlFor="postal_code"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
              >
                Postal Code
              </label>
              {errors.postal_code && (
                <span className="text-pink-500 text-xs">
                  {errors.postal_code.message}
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <input
              {...register("state", {
                required: "State is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "State can only contain letters and spaces",
                },
              })}
              type="text"
              id="state"
              placeholder="State"
              className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-secondaryOrange focus:outline-none"
            />
            <label
              htmlFor="state"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
            >
              State
            </label>
            {errors.state && (
              <span className="text-pink-500 text-xs">
                {errors.state.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-secondaryOrange cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-textGray mt-4">
          Already Register ?{" "}
          <NavLink
            to="/signin"
            className="text-accentPink font-bold hover:underline"
          >
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpform;
