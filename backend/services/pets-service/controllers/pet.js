const Pet = require("../models/pet");

const getAllpets = async (req, res) => {
  try {
    const pets = await Pet.find({ status: "Available" });
    

    res.status(200).json(pets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPet = async (req, res) => {
  try {
    const { petId } = req.params;

    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    res.status(200).json(pet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getbylocation = async (req, res) => {
  try {
    const pets = await Pet.find({ location: req.params.location });

    if (!pets) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    res.status(200).json(pets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getbySpecies = async (req, res) => {
  try {
    const pets = await Pet.find({ species: req.params.species });

    if (!pets) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    res.status(200).json(pets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUserDelete = async (userId, petId) => {
  try {
    await axios.put(
      `http://localhost:5001/api/auth/updateDeletedpet/${userId}`,
      {
        petId,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const deletePet = async (req, res) => {
  try {
    const { petId } = req.params;
    const userId = req.user.id;

    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    await Pet.findByIdAndDelete(petId);

    await updateUserDelete(userId, petId);

    res.status(200).json({
      success: true,
      message: "Pet deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

module.exports = {
  getAllpets,
  getPet,
  getbylocation,
  getbySpecies,
  deletePet,
};
