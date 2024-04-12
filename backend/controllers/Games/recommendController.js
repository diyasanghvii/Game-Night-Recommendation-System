const util = require('util');
const { recommendGames } = require("../../services/Games/recommendationAlgo");
const {
  preprocessGameData,
} = require("../../services/Games/dataPreprocessingService");

// @desc Get Game Recommendation
// @route GET /recommend/getRecommendations
// @access Private
async function getRecommendations(req, res) {
  try {
    const {selected_users, parameter_values} = req.body;
    const gameData = await preprocessGameData(selected_users);
    const selectedNames = selected_users.map(memberObj => memberObj.username);
    const recommendedGames = await recommendGames(gameData, selectedNames, parameter_values);
    res.status(200).json({ recommendedGames });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
}
module.exports = {
  getRecommendations,
};
