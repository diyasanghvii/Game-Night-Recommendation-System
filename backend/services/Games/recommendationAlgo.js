function calculateGameScore(game, totalFriends, parameter_values) {
  const ownershipScore = calculateOwnershipScore(game.ownership, totalFriends);
  const ratingScore = calculateRatingScore(game.ratings, game.ownership);
  const interestScore = calculateInterestScore(game.interest, game.ownership);
  const genreScore = calculateGenreScore(game.matchedgenres, game.noOfGameGenres);
  const totalPlaytimeScore = calculateTotalPlaytimeScore(game.totalPlaytime, game.ownership);

  const weights = {
    ownership: parameter_values.ownership,
    rating: parameter_values.ratings,
    interest: parameter_values.interest,
    genre: parameter_values.preferredGenres,
    totalPlaytime: parameter_values.totalPlaytime,
    playtimeTwoWeeks: parameter_values.playtime2Weeks,
  };

  const totalScore =
    ownershipScore * weights.ownership +
    ratingScore * weights.rating +
    interestScore * weights.interest +
    genreScore * weights.genre +
    totalPlaytimeScore * weights.totalPlaytime;

  const scores = [ownershipScore, ratingScore, interestScore, genreScore, totalPlaytimeScore];
  // console.log(scores);
  // console.log(weights);
  const maxTotalScore = calculateMaxTotalScore(weights, scores);
  const maxScore = Math.max(...scores);
  const reason = getReason(maxScore, scores);

  return { ...game, totalScore: totalScore.toFixed(6), reason , ownershipScore, ratingScore, interestScore, genreScore, maxTotalScore};
}

function calculateMaxTotalScore(weights, scores) {
  let sumOfWeights = 0;
  if (scores.ownershipScore !== 0) sumOfWeights += weights.ownership;
  if (scores.ratingScore !== 0) sumOfWeights += weights.rating;
  if (scores.interestScore !== 0) sumOfWeights += weights.interest; // TODO: subtract (0 interest is Dislike)
  if (scores.genreScore !== 0) sumOfWeights += weights.genre;
  if (scores.totalPlaytimeScore !== 0) sumOfWeights += weights.totalPlaytime;

  return sumOfWeights * 10;
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

// []
function calculateConfidence(numOfNonZeroValues, numOfOwnedValues, ownership) {
  return (numOfNonZeroValues / ownership.length).toFixed(6);
}

function calculateTotalPlaytimeScore(totalPlaytimes, ownership) {
  //TODO WORK
  const ownedPlaytimes = totalPlaytimes.filter(
    (playtime, index) => ownership[index] && (playtime !== null)
  );
  const nonZeroPlaytimes = ownedPlaytimes.filter(
    (playtime) => playtime !== 0
  );

  const numNonZeroPlaytimes = nonZeroPlaytimes.length;
  if (!numNonZeroPlaytimes) return 0;
  if (numNonZeroPlaytimes == 1) return 1 * calculateConfidence(1, ownedPlaytimes.length, ownership);

  // Find the min and max playtime values
  const minPlaytime = Math.min(ownedPlaytimes);
  const maxPlaytime = Math.max(nonZeroPlaytimes);
  const sumPlaytimes = nonZeroPlaytimes.reduce((sum, playtime) => sum + playtime, 0);
  let normalizedSumPlaytimes = (sumPlaytimes - minPlaytime) / (maxPlaytime - minPlaytime);
  console.log('normalizedSumPlaytimes',normalizedSumPlaytimes);

  normalizedSumPlaytimes = normalizedSumPlaytimes * calculateConfidence(nonZeroPlaytimes.length,
    ownedPlaytimes.length, ownership);
  console.log('normalizedSumPlaytimes2',normalizedSumPlaytimes);

  return normalizedSumPlaytimes.toFixed(6);
  //* calculateConfidence(filteredPlaytimes, ownership.length)
}

function getReason(maxScore, scores) {
  const reasons = ["Game Ownership", "User Ratings", "Interest Expressed", "Matched Genres", "Total Playtime"];
  const numericScores = scores.map(Number);
  const maxIndex = numericScores.indexOf(Number(maxScore));
  return reasons[maxIndex];
}

function recommendGames(gameData, selectedNames, parameter_values) {
  const totalFriends = gameData[0].ownership.length;

  const scoredGames = gameData.map((game) =>
    calculateGameScore(game, totalFriends, parameter_values)
  );
  const sortedGames = scoredGames.sort((a, b) => b.totalScore - a.totalScore);

  return sortedGames.slice(0, 10);
}

module.exports = {
  recommendGames,
};