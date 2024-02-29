const express = require("express");
const discordRoutes = express.Router();

const { fetchPresence, fetchVoiceChannels, fetchServerList } = require("../../controllers/User/discordController");

const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
discordRoutes.get("/fetchpresence", authoriseCheck, fetchPresence);
discordRoutes.get("/fetchvoicechannels", authoriseCheck, fetchVoiceChannels);
discordRoutes.get("/fetchserverlist", fetchServerList);


module.exports = discordRoutes;
