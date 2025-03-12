import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import DogImg from "../assets/herodog2.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { GetAllPet } from "../services/oprations/pet";
import { useNavigate } from "react-router-dom";
const Petlisting = () => {
  const [pets, setpets] = useState();
  const navigate = useNavigate();
  const getPet = async () => {
    const data = await GetAllPet();

    setpets(data.data);
  };

  useEffect(() => {
    getPet();
  }, []);

  return (
    <div className="font-raleway p-4 w-3/4  m-8">
      {/* Header */}
      <div className="flex items-center gap-2 p-2">
        <IoArrowBackCircleOutline
          className="text-2xl "
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-bold md:text-3xl">
          Find Your New Best Friend
        </h1>
      </div>

      {/* Filters */}

      <div className="flex flex-col lg:flex-row  justify-between gap-4  ">
        {pets && pets.length > 0 ? (
          <div className=" flex max-h-fit  lg:flex-col gap-3 p-5 border-2 border-secondaryOrange rounded-md">
            <select className="border rounded-md p-2 px-3 focus:outline-none border-secondaryOrange">
              <option value="">Select Breed</option>
              <option value="labrador">Labrador</option>
              <option value="bulldog">Bulldog</option>
            </select>

            <select className="border rounded-md p-2 focus:outline-none border-secondaryOrange">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select className="border rounded-md p-2 focus:outline-none border-secondaryOrange">
              <option value="">Select Species</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>
        ) : (
          ""
        )}
        <div className="  grid   lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 ">
          {pets && pets.length > 0 ? (
            pets.map((pet) => (
              <Card
                key={pet.id} // Ensure each item has a unique key (use pet.id or index)
                Image={pet.photo}
                Name={pet.name}
                Breed={pet.breed}
                gender={pet.gender}
                Species={pet.species}
                id={pet._id}
                data={pet}
              />
            ))
          ) : (
            <p>No pets available</p> // Optional: Show a message if the list is empty
          )}
        </div>
      </div>
      {/* Card Component */}
    </div>
  );
};

export default Petlisting;
