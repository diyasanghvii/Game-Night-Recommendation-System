const express = require("express");
const steamRoutes = express.Router();

const {
  getUserSteamGameList,
  backUpUserSteamData,
} = require("../../controllers/Games/steamController");
const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
steamRoutes.get("/getusersteamgamelist", authoriseCheck, getUserSteamGameList);
steamRoutes.post("/backupusersteamdata", authoriseCheck, backUpUserSteamData);

module.exports = steamRoutes;
