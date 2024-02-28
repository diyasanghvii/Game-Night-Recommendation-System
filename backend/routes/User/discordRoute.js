const express = require("express");
const discordRoutes = express.Router();

const { fetchPresence, fetchVoiceChannels } = require("../../controllers/User/discordController");

const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
discordRoutes.get("/fetchpresence", authoriseCheck, fetchPresence);
discordRoutes.get("/fetchvoicechannels", authoriseCheck, fetchVoiceChannels);

module.exports = discordRoutes;
