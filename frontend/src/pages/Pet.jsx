import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AdoptPet } from "../services/oprations/pet";
import { useDispatch } from "react-redux";
const Pet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = location.state || {}; // Ensure data exists

  const adoptHandler = async () => {
    try {
      dispatch(AdoptPet(data._id));
    } catch (error) {
      console.log(error);
    }
  };
  // Handle missing data gracefully
  if (!data) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-center">
        <p className="text-2xl font-semibold text-red-500 mb-4">
          No pet data available.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-secondaryOrange text-white rounded-lg hover:bg-opacity-80 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Leaflet Map Configuration
  const position = [
    data.location.latitude || 26.8467, // Default to Lucknow if no data
    data.location.longitude || 80.9462,
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <IoArrowBackCircle
          className="text-4xl cursor-pointer hover:scale-105 transition"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-4xl font-extrabold">{data.name}</h1>
      </div>

      {/* Pet Details Section */}
      <div className="flex flex-col md:flex-row gap-8 border-2 p-3 rounded-xl border-secondaryOrange">
        {/* Pet Image */}
        <div className="md:w-1/3 w-full items-center flex justify-center">
          <img
            src={data.photo}
            alt={data.name}
            className="w-full h-auto object-cover rounded-xl "
          />
        </div>

        {/* Pet Description */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">Description</h2>
          <p className="text-lg text-gray-600">
            {data.description || "No description available."}
          </p>

          {/* Pet Info using .map() */}
          <div className="flex flex-col gap-2 text-lg text-gray-600">
            {[
              { label: "Breed", value: data.breed },
              { label: "Gender", value: data.gender },
              { label: "Age", value: `${data.age} years` },
              { label: "Species", value: data.species },
              { label: "Temperament", value: data.temperament },
              {
                label: "Address",
                value: `${data.location.city}, ${data.location.state}`,
              },
            ].map((item, index) => (
              <span key={index}>
                <strong>{item.label}:</strong> {item.value}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mt-4">
            {" "}
            <button
              className="bg-secondaryOrange p-2 rounded-md border-b-2  border-orange-300 hover:scale-105 "
              onClick={adoptHandler}
            >
              Request Adopt
            </button>
            <button
              className="bg-primaryYellow px-4 p-2 rounded-md border-b-2  border-yellow-300"
              onClick={() => navigate("")}
            >
              Chat{" "}
            </button>
          </div>
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Pet Location</h2>
        <MapContainer
          center={position}
          zoom={12}
          style={{ height: "300px", width: "100%", borderRadius: "10px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>{data.name} is here!</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Pet;
