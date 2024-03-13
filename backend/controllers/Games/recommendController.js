const {
  generateRecommendations,
} = require("../../services/Games/recommendationService");
const {
  preprocessGameData,
} = require("../../services/Games/dataPreprocessingService");

// @desc Get Game Recommendation
// @route POST /recommend/getRecommendations
// @access Private
async function getRecommendations(req, res) {
  try {
    const selectedUsers = req.body.selected_users;
    const recommendations = await generateRecommendations(
      selectedUsers,
      preprocessGameData
    );
    res.status(200).json({ recommendations });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
}
module.exports = {
  getRecommendations,
};
