function calculateGameScore(game, totalFriends) {
  const ownershipScore = calculateOwnershipScore(game.ownership, totalFriends);
  const ratingScore = calculateRatingScore(game.ratings, game.ownership);
  const interestScore = calculateInterestScore(game.interest, game.ownership);
  const genreScore = calculateGenreScore(game.matchedgenres);

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

  const reason = "reason (TBD)";
  return { ...game, totalScore, reason };
}

function calculateOwnershipScore(ownership, totalFriends) {
  const numOwners = ownership.filter(Boolean).length;
  return numOwners / totalFriends;
}

function calculateRatingScore(gameRatings, ownership) {
  const filteredRatings = gameRatings.filter(
    (rating, index) => ownership[index] && rating !== null
  );
  const totalRatings = filteredRatings.reduce((sum, rating) => sum + rating, 0);

  if (!filteredRatings.length) return 0;

  return totalRatings / filteredRatings.length;
}

function calculateInterestScore(interestLevels, ownership) {
  const filteredInterests = interestLevels.filter(
    (interest, index) => ownership[index] == 0 && interest !== null
  );
  const totalInterest = filteredInterests.reduce((sum, interest) => sum + interest, 0);

  if (!filteredInterests.length) return 0;

  return totalInterest / filteredInterests.length;
}

function calculateGenreScore(matchedGenres) {
  const totalGenres = matchedGenres.reduce((sum, genre) => sum + genre, 0);
  const numGenres = matchedGenres.length;
  return totalGenres / numGenres;
}

function recommendGames(gameData) {
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
