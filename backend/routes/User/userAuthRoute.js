const express = require("express");
const userRoutes = express.Router();

const {
  login,
  signUpOne,
} = require("../../controllers/User/userAuthController");

// API Routes
userRoutes.post("/login", login);
userRoutes.post("/signupone", signUpOne);

module.exports = userRoutes;