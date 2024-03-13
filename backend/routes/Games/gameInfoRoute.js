const express = require("express");
const gameRoutes = express.Router();

const { getGenre, getSteamGenres } = require("../../controllers/Games/gameController");
const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
gameRoutes.get("/getgenre", authoriseCheck, getGenre);
gameRoutes.get("/getsteamgenre", authoriseCheck, getSteamGenres);

module.exports = gameRoutes;
