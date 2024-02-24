const express = require("express");
const steamRoutes = express.Router();

const {
  getUserSteamGameList,
} = require("../../controllers/Games/steamController");
const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
steamRoutes.get("/getusersteamgamelist", authoriseCheck, getUserSteamGameList);

module.exports = steamRoutes;
