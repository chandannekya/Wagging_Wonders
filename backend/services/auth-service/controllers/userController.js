const express = require("express");
const User = require("../models/user");

const kafka = require("../config/queue");

exports.getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

const updateAdoptpet = async () => {
  const consumer = kafka.consumer({ groupId: "auth-group1" });
  await consumer.connect();
  await consumer.subscribe({ topic: "adopt-pet-topic" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const { userId, petId } = JSON.parse(message.value.toString());
        console.log(userId, petId);
        const user = await User.findById(userId);
        if (!user) {
          console.log({ message: "User not found" });
          return;
        }

        user.petsAdopted.push(petId);

        await user.save();
        console.log("pet adopted");
      } catch (error) {
        console.error(error);
      }
    },
  });
};

const updateDonatedpet = async () => {
  const consumer = kafka.consumer({ groupId: "auth-group" });
  await consumer.connect();

  await consumer.subscribe({ topic: "donate-pet-topic" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const { userId, petId } = JSON.parse(message.value.toString());

        const user = await User.findById(userId);

        if (!user) {
          console.log(`⚠️ User ${userId} not found`);
          return;
        }

        user.petDoneted.push(petId);
        await user.save();

        console.log(`✅ User ${userId} updated with donated pet ${petId}`);
      } catch (error) {
        console.error("❌ Error processing message:", error);
      }
    },
  });
};

exports.updateDeletePet = async (req, res) => {
  try {
    const { petId } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      $pull: { petDoneted: petId },
    });

    return res.status(200).json({
      message: "Pet deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

exports.getalluserDetails = async (req, res) => {
  try {
    const { userIds } = req.body;

    // Validate and convert IDs

    // Use objectIds in the query

    const users = await User.find({ _id: { $in: userIds } }).select(
      "-password"
    );

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

updateDonatedpet();

updateAdoptpet();
