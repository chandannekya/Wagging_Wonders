const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },

    address: {
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

    petDoneted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        default: false,
      },
    ],

    petsAdopted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],

    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
