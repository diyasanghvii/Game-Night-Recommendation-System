const express = require("express");
const userRoutes = express.Router();

const {
  login,
  signUpOne,
  signUpTwo,
  signUpThree,
} = require("../../controllers/User/userAuthController");

// API Routes
userRoutes.post("/login", login);
userRoutes.post("/signupone", signUpOne);
userRoutes.post("/signuptwo", signUpTwo);
userRoutes.post("/signupthree", signUpThree);

module.exports = userRoutes;