import { loginStart, loginSuccess, loginFailure } from "../../slices/authSlice";
import { loadingOn, loadingOff } from "../../slices/loadingSlice";
import { authEndpoits } from "../Apis";
import axios from "axios";
import toast from "react-hot-toast";

const { SIGNIN_API, SIGNUP_API } = authEndpoits;

export const signIn = (email, password, navigate) => async (dispatch) => {
  dispatch(loginStart());

  // Show loading toast
  const toastId = toast.loading("Processing...");

  try {
    const response = await axios.post(SIGNIN_API, { email, password });
    const now = new Date();
    // Save token and show success message
    const token = {
      value: response.data.token,

      // expiry: now.getTime() + 24 * 60 * 60 * 1000,
      expiry: now.getTime() + 24 * 60 * 60 * 1000,
    };
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(response.data));
    toast.success("LogIn Successfully", { id: toastId });
    navigate("/");
    dispatch(loginSuccess(response.data));
  } catch (error) {
    // Handle error
    toast.error(error.response?.message || "Login Failed", {
      id: toastId,
    });
    dispatch(loginFailure(error.response?.data?.message));
  }
};

export const signUp = (data, navigate) => async (dispatch) => {
  dispatch(loadingOn());

  const toastId = toast.loading("Signing Up...");

  try {
    const response = await axios.post(SIGNUP_API, {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirm_password,
      city: data.city,
      state: data.state,
      postalCode: data.postal_code,
    });

    toast.success("Sign Up Successfully!", { id: toastId });
    navigate("/signin");
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "SignUp Failed", {
      id: toastId,
    });
  } finally {
    dispatch(loadingOff());
  }
};
