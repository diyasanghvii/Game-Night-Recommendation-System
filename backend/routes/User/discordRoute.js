const express = require("express");
const discordRoutes = express.Router();

const {
  fetchPresence,
} = require("../../controllers/User/discordController");

const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
discordRoutes.post("/fetchpresence", authoriseCheck, fetchPresence);

module.exports = discordRoutes;