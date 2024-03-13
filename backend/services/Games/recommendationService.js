const { calculateGameScore, recommendGames } = require("./recommendationAlgo");

async function generateRecommendations(
  selectedUsers,
  preprocessGameData
) {
  const gameData = await preprocessGameData(
    selectedUsers
  );
  const recommendedGames = recommendGames(gameData, selectedUsers);
  return recommendedGames;
}

module.exports = { generateRecommendations };
