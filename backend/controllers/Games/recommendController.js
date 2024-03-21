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
    const {selected_users} = req.body;
    console.log(JSON.stringify(req.body, undefined, 4));
    //util.inspect(selected_users, { showHidden: false, depth: null, colors: true })
    const gameData = await preprocessGameData(selected_users);
    const selectedNames = selected_users.map(memberObj => memberObj.username);
    const recommendedGames = await recommendGames(gameData, selectedNames);
    res.status(200).json({ recommendedGames });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
}
module.exports = {
  getRecommendations,
};
