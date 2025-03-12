const multer = require("multer");
const Pet = require("../../models/pet.js");
const { uploadImageToCloudinary } = require("../../utils/imageUpload.js");
const axios = require("axios");
const kafka = require("../../config/queue.js");
const { json } = require("express");
const producer = kafka.producer();
// Helper function to upload image
const uploadPetImage = async (file) => {
  try {
    return await uploadImageToCloudinary(file.path, process.env.FOLDER_NAME);
  } catch (error) {
    console.log(error);
    throw new Error("Image upload failed");
  }
};

// Helper function to update user after donating pet
const updateUserWithPet = async (userId, petId) => {
  try {
    await axios.put(
      `http://localhost:8000/user/api/auth/updateDonatedpet/${userId}`,
      { petId }
    );
  } catch (error) {
    console.error("Error updating user with donated pet:", error.message);
  }
};

const donatePet = async (req, res) => {
  try {
    const {
      name,
      species,
      breed,
      age,
      gender,
      temprament,
      description,
      city,
      state,
      postelcode,
    } = req.body;
    const userId = req.user?.id;

    // Validate required fields
    if (
      !name ||
      !species ||
      !breed ||
      !age ||
      !gender ||
      !temprament ||
      !description ||
      !city ||
      !state ||
      !postelcode
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure user is authenticated
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Handle image upload
    let uploadphoto;
    try {
      uploadphoto = await uploadPetImage(req.file);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

    // Create pet entry

    const pet = await Pet.create({
      name,
      species,
      breed,
      age,
      gender,
      temprament,
      description,
      location: { city, state, postelcode },
      postedBy: userId,
      photo: uploadphoto.url,
    });
    const petId = pet._id;
    await producer.connect();
    await producer.send({
      topic: "donate-pet-topic",
      messages: [{ value: JSON.stringify({ userId, petId }) }],
    });

    console.log(`✅ Event published: User ${userId} donated pet ${pet._id}`);
    await producer.disconnect();
    // Update user with pet's ID
    // updateUserWithPet(userId, pet._id);

    // Respond to client
    return res.status(201).json({ message: "Pet Listed", pet });
  } catch (error) {
    console.error("Error creating pet entry:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

module.exports = { donatePet };
