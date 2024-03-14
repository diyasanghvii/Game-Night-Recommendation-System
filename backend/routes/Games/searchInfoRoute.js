const express = require("express");
const steamSearchRoutes = express.Router();

const {
  getAllGamesBySearch,
  getGameDetails,
  getFeaturedGames
} = require("../../controllers/Games/steamSearchController");
const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
steamSearchRoutes.get("/getAllGames", authoriseCheck, getAllGamesBySearch);
steamSearchRoutes.get("/getGameDetails", authoriseCheck, getGameDetails);
steamSearchRoutes.get("/getFeaturedGames", authoriseCheck, getFeaturedGames);

module.exports = steamSearchRoutes;
