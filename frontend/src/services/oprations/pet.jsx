import { petsEndpoints } from "../Apis";
import axios from "axios";
import toast from "react-hot-toast";
import { loadingOn } from "../../slices/loadingSlice";

const { GetAllPets, ADOPT_PET, DONATE_PET } = petsEndpoints;

export const GetAllPet = async (dispatch) => {
  const toastId = toast.loading("Fetcing....");
  try {
    const response = await axios.get(GetAllPets);

    toast.dismiss(toastId);

    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || "Somthing Went Wrong", {
      id: toastId,
    });
  }
};

export const AdoptPet = (id) => async (dispatch) => {
  dispatch(loadingOn);

  const toastId = toast.loading("Processing....");
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      ADOPT_PET + id, // Fixed URL
      {}, // Empty body if no additional data is needed
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.dismiss(toastId);
    toast.success("Pet adopted successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Something Went Wrong", {
      id: toastId,
    });
  }
};

export const donatePet = (data, navigate) => async (dispatch) => {
  dispatch(loadingOn());

  const toastId = toast.loading("Processing....");

  try {
    const token = JSON.parse(localStorage.getItem("token")).value;
    // Create FormData object to handle file uploads properly
    const formData = new FormData();

    // Add all text fields to FormData
    Object.keys(data).forEach((key) => {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    });

    // Add the image file with key "photo"
    if (data.image) {
      formData.append("photo", data.image);
    }

    const response = await axios.post(DONATE_PET, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Let axios set the Content-Type header automatically with boundary
      },
    });

    toast.dismiss(toastId);
    toast.success("Pet donated successfully!");

    navigate("/"); // Navigate after success
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};
