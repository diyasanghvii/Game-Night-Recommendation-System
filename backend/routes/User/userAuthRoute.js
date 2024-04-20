const express = require("express");
const userRoutes = express.Router();

const {
  login,
  signUpOne,
  signUpTwo,
  signUpThree,
  getUserDetails,
  saveUserDetails,
  deleteUserDetails,
  updateGenre,
  getUserRatings,
  updateRating,
  saveGameUnOwnedRating,
  verifyUserSteamId,
  clearRating,
  checkUniqueDiscordUserName, 
  checkUniqueSteamId,
} = require("../../controllers/User/userAuthController");

const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
userRoutes.post("/login", login);
userRoutes.post("/signupone", signUpOne);
userRoutes.post("/signuptwo", authoriseCheck, signUpTwo);
userRoutes.post("/signupthree", authoriseCheck, signUpThree);
userRoutes.get("/getuserdetails", authoriseCheck, getUserDetails);
userRoutes.post("/saveuserdetails", authoriseCheck, saveUserDetails);
userRoutes.delete("/deleteuserdetails", authoriseCheck, deleteUserDetails);
userRoutes.post("/updategenre", authoriseCheck, updateGenre);
userRoutes.get("/getpreferences", authoriseCheck, getUserRatings);
userRoutes.post("/updaterating", authoriseCheck, updateRating);
userRoutes.post(
  "/updateunownedgamerating",
  authoriseCheck,
  saveGameUnOwnedRating
);
userRoutes.post("/verifyusersteamid", authoriseCheck, verifyUserSteamId);
userRoutes.post("/clearrating", authoriseCheck, clearRating);
userRoutes.post("/checkuniquesteamid", authoriseCheck,checkUniqueSteamId );
userRoutes.post("/checkuniquediscordusername", authoriseCheck, checkUniqueDiscordUserName);

module.exports = userRoutes;
