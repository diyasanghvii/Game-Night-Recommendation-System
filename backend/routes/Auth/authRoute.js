const express = require("express");
const authRoutes = express.Router();

const { profile } = require("../../controllers/Auth/authController");

const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
authRoutes.get("/profile", authoriseCheck, profile);

module.exports = authRoutes;
