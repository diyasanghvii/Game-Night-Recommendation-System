function calculateGameScore(game, totalFriends) {
  const ownershipScore = calculateOwnershipScore(game.ownership, totalFriends);
  const ratingScore = calculateRatingScore(game.ratings, game.ownership);
  const genreScore = calculateGenreScore(game.matchedgenres);

  const weights = {
    ownership: 0.9,
    rating: 0,
    genre: 0.1,
  };

  const totalScore =
    ownershipScore * weights.ownership +
    ratingScore * weights.rating +
    genreScore * weights.genre;

  const reason = "reason";
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
