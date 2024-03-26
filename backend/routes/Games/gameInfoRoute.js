const express = require("express");
const gameRoutes = express.Router();

const { getSteamGenres } = require("../../controllers/Games/gameController");
const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
gameRoutes.get("/getsteamgenre", authoriseCheck, getSteamGenres);

module.exports = gameRoutes;
