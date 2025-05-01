import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { donatePet } from "../services/oprations/pet";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import imagepet from "../assets/faqimage.png";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const DonatePetForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropzoneRef = useRef(null);
  const inputRef = useRef(null);
  const [previewSrc, setPreviewSrc] = useState("");

  useEffect(() => {
    const dropzone = dropzoneRef.current;
    if (!dropzone) return;

    const handleDragOver = (e) => {
      e.preventDefault();
      dropzone.classList.add("border-indigo-600");
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      dropzone.classList.remove("border-indigo-600");
    };

    const handleDrop = (e) => {
      e.preventDefault();
      dropzone.classList.remove("border-indigo-600");
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    };

    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDrop);

    return () => {
      dropzone.removeEventListener("dragover", handleDragOver);
      dropzone.removeEventListener("dragleave", handleDragLeave);
      dropzone.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleFileUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSrc(reader.result);
      setValue("image", file); // Store file in form state
    };
  };

  const onSubmit = (data) => {
    dispatch(donatePet(data, navigate));
  };

  return (
    <div className=" bg-white p-6 flex  flex-col max-w-11/12   rounded-3xl  ">
      <h1 className="font-bold  text-textGray flex items-center   text-xl">
        <IoArrowBackCircleSharp
          onClick={() => navigate(-1)}
          className="text-4xl cursor-pointer hover:scale-105 transition"
        />
        Fill The Form to Donate Pet
      </h1>

      <div className="   w-full  p-6 flex  gap-3 justify-between items-center">
        <form onSubmit={handleSubmit(onSubmit)} className=" w-xl">
          <div className="flex  gap-5 items-center  ">
            <div className="space-y-6 w-full">
              <div
                ref={dropzoneRef}
                className=" h-max relative border-2 border-gray-300 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => inputRef.current.click()}
              >
                {previewSrc ? (
                  <img
                    src={previewSrc}
                    className="max-h-40 mx-auto"
                    alt="Preview"
                  />
                ) : (
                  <>
                    <img
                      className="h-12 w-12"
                      src="https://www.svgrepo.com/show/357902/image-upload.svg"
                      alt="Upload"
                    />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      <span>Drag and drop</span>
                      <span className="text-secondaryOrange"> or browse </span>
                      <span>to upload</span>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
                <input
                  {...register("image", { required: "Pet image is required" })}
                  type="file"
                  className="hidden"
                  ref={inputRef}
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
                {errors.image && (
                  <span className="text-pink-500 text-xs">
                    {errors.image.message}
                  </span>
                )}
              </div>

              <div className="relative">
                <input
                  {...register("name", { required: "Pet name is required" })}
                  type="text"
                  id="name"
                  placeholder="Pet Name"
                  className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-secondaryOrange focus:outline-none"
                />
                <label
                  htmlFor="name"
                  className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
                >
                  Pet Name
                </label>
                {errors.name && (
                  <span className="text-pink-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    {...register("species", {
                      required: "Species is required",
                    })}
                    type="text"
                    id="species"
                    placeholder="Species (e.g., Dog, Cat)"
                    className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-secondaryOrange focus:outline-none"
                  />
                  <label
                    htmlFor="species"
                    className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
                  >
                    Species
                  </label>
                  {errors.species && (
                    <span className="text-pink-500 text-xs">
                      {errors.species.message}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    {...register("breed")}
                    type="text"
                    id="breed"
                    placeholder="Breed (Optional)"
                    className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-secondaryOrange focus:outline-none"
                  />
                  <label
                    htmlFor="breed"
                    className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
                  >
                    Breed
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    {...register("age", {
                      required: "Age is required",
                      valueAsNumber: true,
                    })}
                    type="number"
                    id="age"
                    placeholder="Age"
                    className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-secondaryOrange focus:outline-none"
                  />
                  <label
                    htmlFor="age"
                    className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
                  >
                    Age
                  </label>
                  {errors.age && (
                    <span className="text-pink-500 text-xs">
                      {errors.age.message}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    id="gender"
                    className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-secondaryOrange focus:outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <label
                    htmlFor="gender"
                    className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
                  >
                    Gender
                  </label>
                  {errors.gender && (
                    <span className="text-pink-500 text-xs">
                      {errors.gender.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  {...register("temprament", {
                    required: "Temperament is required",
                  })}
                  type="text"
                  id="temprament"
                  placeholder="Temperament (e.g., Friendly, Calm)"
                  className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-secondaryOrange focus:outline-none"
                />
                <label
                  htmlFor="temprament"
                  className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
                >
                  Temperament
                </label>
                {errors.temprament && (
                  <span className="text-pink-500 text-xs">
                    {errors.temprament.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <input
                    {...register("city", { required: "City is required" })}
                    type="text"
                    id="city"
                    placeholder="City"
                    className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-secondaryOrange focus:outline-none"
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
                    {...register("state", { required: "State is required" })}
                    type="text"
                    id="state"
                    placeholder="State"
                    className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-secondaryOrange focus:outline-none"
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

                <div className="relative">
                  <input
                    {...register("postelcode", {
                      required: "Postal Code is required",
                    })}
                    type="text"
                    id="postelcode"
                    placeholder="Postal Code"
                    className="peer relative h-10 w-full rounded-lg border-2 border-gray-300 px-4 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-secondaryOrange focus:outline-none"
                  />
                  <label
                    htmlFor="postelcode"
                    className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
                  >
                    Postal Code
                  </label>
                  {errors.postelcode && (
                    <span className="text-pink-500 text-xs">
                      {errors.postelcode.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="relative">
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  id="description"
                  placeholder="Brief description about the pet"
                  className="peer relative w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm text-gray-700 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-secondaryOrange focus:outline-none"
                ></textarea>
                <label
                  htmlFor="description"
                  className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-gray-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryOrange"
                >
                  Description
                </label>
                {errors.description && (
                  <span className="text-pink-500 text-xs">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-secondaryOrange cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Donate Pet
              </button>
            </div>
          </div>
        </form>

        <div className="hidden md:flex flex-col items-center justify-center w-1/2 h-full bg-primaryYellow/5 rounded-3xl p-4">
          <img src={imagepet} alt="" className="w-3xs" />

          <h2 className=" font-bold mb-6 text-textGray text-center text-6xl">
            Donate a Pet
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DonatePetForm;
