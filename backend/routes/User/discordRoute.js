const express = require("express");
const discordRoutes = express.Router();

const { fetchPresence, fetchVoiceChannels, fetchServerList, sendList } = require("../../controllers/User/discordController");

const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
discordRoutes.get("/fetchpresence", authoriseCheck, fetchPresence);
discordRoutes.get("/fetchvoicechannels", authoriseCheck, fetchVoiceChannels);
discordRoutes.get("/fetchserverlist", authoriseCheck, fetchServerList);
discordRoutes.post("/sendlist", authoriseCheck, sendList);


module.exports = discordRoutes;
