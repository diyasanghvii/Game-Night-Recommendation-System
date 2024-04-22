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
    if (error.message === 'API_KEY_LIMIT_REACHED_OR_ZERO_GAMES_USER') {
      res.status(500).json({ error: 'The API key limit was reached or a user has zero games. Please try again later.' });
    } else {
      res.status(500).json({ error: "Failed to fetch recommendations. Please try again later." });
    }
  }
}
module.exports = {
  getRecommendations,
};
