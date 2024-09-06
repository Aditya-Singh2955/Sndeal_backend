const express = require("express");
const router = express.Router();

const { login, signup } = require("../Controller/Auth");
const { getUserDetails } = require("../Controller/Fetch");
const { deleteUserDetails } = require("../Controller/Delete");
const { password } = require("../Controller/Password");
const { resetPassword } = require("../Controller/Reset");
const { update } = require("../Controller/Update");
const {
  createWatch,
  getwatch,
  //   getWatchById,
  updateWatch,
  //   deleteWatchById
} = require("../Controller/Watch");
const { createHomeAppliances, getHomeAppliances } = require("../Controller/HomeAppliance");
const { createCookware } = require("../Controller/Cookware");
const { itemSearch, getSuggestions } = require("../Controller/Search");
const { addToOrder } = require("../Controller/Cart");

router.post("/login", login);
router.post("/signup", signup);
router.get("/getUser", getUserDetails);
router.delete("/deleteUser", deleteUserDetails);
router.post("/password", password);
router.patch("/reset-password", resetPassword);
router.post("/update", update);

// Watch routes
router.post("/addwatch", createWatch);
router.get("/watches", getwatch);
router.put("/updatewatch", updateWatch);
// router.put("/watches/:id", updateWatchById);
// router.delete("/watches/:id", deleteWatchById);

// HomeAppliances Route
router.post("/addHomeAppliances", createHomeAppliances);
router.get("/homeappliances", getHomeAppliances);

// Cookware routes
router.post("/addcookware", createCookware);

// Main header search bar
router.get("/search", itemSearch);
router.get("/suggestions", getSuggestions); 


//cart api
router.post("/add-to-cart" , addToOrder)

module.exports = router;
