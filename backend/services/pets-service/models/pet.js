const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    species: {
      type: String,
      required: true,
    },

    breed: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    temprament: {
      type: String,
      required: true,
    },
    photo: {
      type: String, // URL or path to the pet’s image
    },

    status: {
      type: String,
      enum: ["Available", "Adopted", "Donated"],
      default: "Available", // Current status of the pet
    },

    description: {
      type: String,
      required: true, // Short description about the pet
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    adoptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      postalCode: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
