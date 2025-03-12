const Pet = require("../models/pet.js");
const axios = require("axios");
const kafka = require("../config/queue.js");
const producer = kafka.producer();
// Helper function to update user after adopting pet

const updateUserWithPet = async (userId, petId) => {
  try {
    await axios.put(
      `http://localhost:8000/user/api/auth/updateAdoptpet/${userId}`,
      {
        petId,
      }
    );
  } catch (error) {
    console.error("Error updating user with adopted pet:", error.message);
  }
};

const adoptPet = async (req, res) => {
  try {
    const petId = req.params.petId;
    const userId = req.user.id;

    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    if (pet.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Pet is not available for adoption",
      });
    }

    await Pet.findByIdAndUpdate(
      petId,
      {
        $set: {
          status: "Adopted",
          adoptedBy: userId,
        },
      },
      { new: true }
    );

    await producer.connect();
    await producer.send({
      topic: "adopt-pet-topic",
      messages: [{ value: JSON.stringify({ userId, petId }) }],
    });

    console.log("data produce successfully", userId, petId);
    producer.disconnect();

    return res.status(200).json({
      success: true,
      pet,
      message: "Pet adopted successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

module.exports = { adoptPet };
