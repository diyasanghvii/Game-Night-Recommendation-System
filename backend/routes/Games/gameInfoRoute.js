const express = require("express");
const gameRoutes = express.Router();

const { getGenre } = require("../../controllers/Games/gameController");
const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
gameRoutes.get("/getgenre", authoriseCheck, getGenre);

module.exports = gameRoutes;
