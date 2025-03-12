const { donatePet } = require("../controllers/Donate/donatePet.js");

const {
  getAllpets,
  getPet,
  getbylocation,
  getbySpecies,

  deletePet,
} = require("../controllers/pet.js");
const { adoptPet } = require("../controllers/adoptPet.js");
const { auth } = require("../middleware/Auth.js");
const upload = require("../middleware/multer.js");

const express = require("express");

const router = express.Router();

router.post("/donatePet", upload.single("photo"), auth, donatePet);

router.get("/AllPet", getAllpets);
router.get("/pet/:ID", getPet);
router.get("/pet/location/:location", getbylocation);
router.get("/pet/species/:species", getbySpecies);
router.delete("/remove/:id", deletePet);
router.post("/adopt-pet/:petId", auth, adoptPet);

module.exports = router;
