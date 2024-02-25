const express = require("express");
const rawgRoutes = express.Router();

const {
  getAllGamesBySearch,
  getGameDetails,
} = require("../../controllers/Games/rawgController");
const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
rawgRoutes.get("/getAllGames", authoriseCheck, getAllGamesBySearch);
rawgRoutes.get("/getGameDetails", authoriseCheck, getGameDetails);

module.exports = rawgRoutes;
