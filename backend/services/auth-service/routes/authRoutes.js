const { createUser, loginUser } = require("../controllers/authController");
const {
  updateAdoptpet,
  updateDonatedpet,
  updateUser,
  updateDeletePet, // Change this line
  getUsersById,
  getalluserDetails,
} = require("../controllers/userController");
const express = require("express");

const router = express.Router();

router.post("/signUp", createUser);
router.post("/login", loginUser);
// router.put("/updateAdoptpet:id", updateAdoptpet);
// router.put("/updateDonatedpet/:id", updateDonatedpet);
router.put("/:id", updateUser);
router.get("/:id", getUsersById);
router.post("/usersDel", getalluserDetails);
// router.put("/updateDeletedpet/:id", updateDeletePet);

module.exports = router;
