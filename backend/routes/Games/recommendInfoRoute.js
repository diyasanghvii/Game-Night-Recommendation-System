const express = require("express");
const recommendRoutes = express.Router();

const {
  getRecommendations,
} = require("../../controllers/Games/recommendController").default;
const { authoriseCheck } = require("../../middleware/authMiddleware");

// API Routes
recommendRoutes.post("/getRecommendations", authoriseCheck, getRecommendations);

module.exports = recommendRoutes;
