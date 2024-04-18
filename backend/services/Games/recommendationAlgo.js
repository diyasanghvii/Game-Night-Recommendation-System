function calculateGameScore(game, totalFriends) {
  const ownershipScore = calculateOwnershipScore(game.ownership, totalFriends);
  const ratingScore = calculateRatingScore(game.ratings, game.ownership);
  const interestScore = calculateInterestScore(game.interest, game.ownership);
  const genreScore = calculateGenreScore(game.matchedgenres, game.noOfGameGenres);

  const weights = {
    ownership: 0.5,
    rating: 0.2,
    interest: 0.1,
    genre: 0.2,
  };

  const totalScore =
    ownershipScore * weights.ownership +
    ratingScore * weights.rating +
    interestScore * weights.interest +
    genreScore * weights.genre;

  const scores = [ownershipScore, ratingScore, interestScore, genreScore];
  const maxScore = Math.max(...scores);
  const reason = getReason(maxScore, scores);

  return { ...game, totalScore: totalScore.toFixed(6), reason , ownershipScore, ratingScore, interestScore, genreScore};
}

function calculateOwnershipScore(ownership, totalFriends) {
  const numOwners = ownership.filter(Boolean).length;
  return (numOwners / totalFriends).toFixed(6);
}

function calculateRatingScore(gameRatings, ownership) {
  const filteredRatings = gameRatings.filter(
    (rating, index) => ownership[index] && rating !== null
  );
  const totalRatings = filteredRatings.reduce((sum, rating) => sum + rating, 0);

  if (!filteredRatings.length) return 0;

  return (totalRatings / (filteredRatings.length * 5)).toFixed(6);
}

function calculateInterestScore(interestLevels, ownership) {
  const filteredInterests = interestLevels.filter(
    (interest, index) => ownership[index] == 0 && interest !== null
  );
  const totalInterest = filteredInterests.reduce((sum, interest) => sum + interest, 0);

  if (!filteredInterests.length) return 0;

  return (totalInterest / filteredInterests.length).toFixed(6);
}

function calculateGenreScore(matchedGenres, noOfGameGenres) {
  const totalGenres = matchedGenres.reduce((sum, genre) => sum + genre, 0);
  const numPlayers = matchedGenres.length;
  return (totalGenres / (noOfGameGenres * numPlayers)).toFixed(6);
}

function getReason(maxScore, scores) {
  const reasons = ["Game Ownership", "User Ratings", "Interest Expressed", "Matched Genres"];
  const numericScores = scores.map(Number);
  const maxIndex = numericScores.indexOf(Number(maxScore));
  return reasons[maxIndex];
}

function recommendGames(gameData, selectedNames, parameter_values) {
  console.log(parameter_values);
  const totalFriends = gameData[0].ownership.length;

  const scoredGames = gameData.map((game) =>
    calculateGameScore(game, totalFriends)
  );
  const sortedGames = scoredGames.sort((a, b) => b.totalScore - a.totalScore);

  return sortedGames.slice(0, 5);
}

module.exports = {
  recommendGames,
};