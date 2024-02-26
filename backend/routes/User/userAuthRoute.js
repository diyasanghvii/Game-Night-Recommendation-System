const express = require("express");
const userRoutes = express.Router();

const {
  login,
  signUpOne,
  signUpTwo,
  signUpThree,
  getUserDetails,
  updateGenre,
} = require("../../controllers/User/userAuthController");

const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
userRoutes.post("/login", login);
userRoutes.post("/signupone", signUpOne);
userRoutes.post("/signuptwo", authoriseCheck, signUpTwo);
userRoutes.post("/signupthree", authoriseCheck, signUpThree);
userRoutes.get("/getuserdetails", authoriseCheck, getUserDetails);
userRoutes.post("/updategenre", authoriseCheck, updateGenre);

module.exports = userRoutes;