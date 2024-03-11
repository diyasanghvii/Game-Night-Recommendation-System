import { calculateGameScore, recommendGames } from "./recommendationAlgo";

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

export default { generateRecommendations };
