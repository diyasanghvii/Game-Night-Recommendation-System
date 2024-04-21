function calculateGameScore(game, totalFriends, parameter_values, maxPlaytimeAcrossGames) {

  // const weights = {
  //   ownership: 0.5,
  //   rating: 0.4,
  //   interest: 0.3,
  //   genre: 0.2,
  //   totalPlaytime: 0.6,
  //   playtimeTwoWeeks: 0.5,
  // };
  const weights = {
    ownership: parameter_values.ownership,
    rating: parameter_values.ratings,
    interest: parameter_values.interest,
    genre: parameter_values.preferredGenres,
    totalPlaytime: parameter_values.totalPlaytime,
    playtimeTwoWeeks: parameter_values.playtime2Weeks,
  };

  const ownershipScore = weights.ownership == 0 ? 0 : calculateOwnershipScore(game.ownership, totalFriends);
  const ratingScore = weights.rating == 0 ? 0 : calculateRatingScore(game.ratings, game.ownership, game.totalPlaytime);
  const interestScore = weights.interest == 0 ? 0 : calculateInterestScore(game.interest, game.ownership);
  const genreScore = weights.genre == 0 ? 0 : calculateGenreScore(game.matchedgenres, game.noOfGameGenres);
  const totalPlaytimeScore = weights.totalPlaytime == 0 ? 0 : calculateTotalPlaytimeScore(game.totalPlaytime, game.ownership);
  const playtimeTwoWeeksScore = weights.playtimeTwoWeeks == 0 ? 0 : calculatePlaytimeTwoWeeksScore(game.playtime_2weeks, game.ownership, maxPlaytimeAcrossGames);

  const totalScore =
    ownershipScore * weights.ownership +
    ratingScore * weights.rating +
    interestScore * weights.interest +
    genreScore * weights.genre +
    totalPlaytimeScore * weights.totalPlaytime +
    playtimeTwoWeeksScore * weights.playtimeTwoWeeks;

    const scores = [
      parseFloat(ownershipScore),
      parseFloat(ratingScore),
      parseFloat(interestScore),
      parseFloat(genreScore),
      parseFloat(totalPlaytimeScore),
      parseFloat(playtimeTwoWeeksScore)
    ];

  const maxTotalScore = calculateMaxTotalScore(weights, scores);
  const maxScore = Math.max(...scores);
  const reason = getReason(maxScore, scores, weights);

  return { ...game, totalScore: totalScore.toFixed(6), reason , ownershipScore, ratingScore, interestScore, genreScore, totalPlaytimeScore, playtimeTwoWeeksScore, maxTotalScore};
}

function getMaxPlaytimeAcrossGames(gameData) {
  let maxPlaytime = 0;

  for (const game of gameData) {
    const maxGamePlaytime = Math.max(...game.playtime_2weeks);
    if (maxGamePlaytime > maxPlaytime) {
      maxPlaytime = maxGamePlaytime;
    }
  }

  return maxPlaytime;
}

function calculateMaxTotalScore(weights, scores) {
  let sumOfWeights = 0;
  if (scores[0] !== 0) sumOfWeights += weights.ownership;
  if (scores[1] !== 0) sumOfWeights += weights.rating;
  if (scores[2] !== 0) sumOfWeights += weights.interest;
  if (scores[3] !== 0) sumOfWeights += weights.genre;
  if (scores[4] !== 0) sumOfWeights += weights.totalPlaytime;
  if (scores[4] !== 0) sumOfWeights += Math.abs(weights.playtimeTwoWeeks);

  return sumOfWeights * 10;
}

function calculateOwnershipScore(ownership, totalFriends) {
  const numOwners = ownership.filter(Boolean).length;
  return (numOwners / totalFriends).toFixed(6);
}

function calculateRatingScore(gameRatings, ownership, totalPlaytimes) {
  const filteredRatings = gameRatings.map((rating, index) => {
    if (ownership[index] && rating !== null) {
      const playtime = totalPlaytimes[index];
      const confidence = calculateRatingConfidence(playtime);
      return rating * confidence;
    }
    return 0;
  });

  const totalRatings = filteredRatings.reduce((sum, rating) => sum + rating, 0);
  const numRatings = filteredRatings.filter(rating => rating > 0).length;

  if (numRatings === 0) return 0;

  return (totalRatings / (numRatings * 5)).toFixed(6);
}

function calculateRatingConfidence(playtime) {
  const baseConfidence = 0.5; // Minimum confidence for zero playtime
  const maxConfidence = 1; // Maximum confidence for very large playtime
  const growthRate = 0.1; // Determines how quickly the confidence grows with playtime

  return baseConfidence + (maxConfidence - baseConfidence) * (1 - Math.exp(-growthRate * playtime));
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
function calculatePLaytimeConfidence(numOfNonZeroValues, numOfOwnedValues, ownership) {
  return (numOfNonZeroValues / numOfOwnedValues).toFixed(6);
}

function calculatePlaytimeTwoWeeksScore(playtimeTwoWeeks, ownership, maxPlaytimeAcrossGames) {
  const ownedPlaytimes = playtimeTwoWeeks.filter(
    (playtime, index) => ownership[index] && playtime !== 0
  );

  const numOwnedPlaytimes = ownedPlaytimes.length;
  if (numOwnedPlaytimes === 0) return 0;
  const sumPlaytimes = ownedPlaytimes.reduce((sum, playtime) => sum + playtime, 0);
  const avgPlaytime = sumPlaytimes / numOwnedPlaytimes;

  // Normalize the average playtime based on the maximum playtime across all games
  const normalizedScore = avgPlaytime / maxPlaytimeAcrossGames;

  // Scale the score to range from 0 to 1
  return normalizedScore.toFixed(6);
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
  if (numNonZeroPlaytimes == 1) return 1 * calculatePLaytimeConfidence(1, ownedPlaytimes.length, ownership);

  // Find the min and max playtime values
  const minPlaytime = Math.min(...ownedPlaytimes);
  const maxPlaytime = Math.max(...nonZeroPlaytimes);
  const sumPlaytimes = nonZeroPlaytimes.reduce((sum, playtime) => sum + playtime, 0);
  let normalizedSumPlaytimes = (sumPlaytimes - minPlaytime) / (maxPlaytime - minPlaytime);

  normalizedSumPlaytimes = normalizedSumPlaytimes * calculatePLaytimeConfidence(nonZeroPlaytimes.length,
    ownedPlaytimes.length, ownership);

  return normalizedSumPlaytimes.toFixed(6);
}


function getReason(maxScore, scores, weights) {
  const reasons = ["Game Ownership", "User Ratings", "Interest Expressed", "Matched Genres", "Total Playtime", "Playtime Last 2 Weeks"];
  const numericScores = scores.map(Number);
  
  // Find all indices where the score matches the maxScore
  const maxIndices = numericScores.reduce((indices, score, index) => {
    if (score === maxScore) {
      indices.push(index);
    }
    return indices;
  }, []);

  if (maxIndices.length === 1) {
    // If there is only one maxScore, return the corresponding reason
    return reasons[maxIndices[0]];
  } else {
    // If there are ties, find the reason with the highest weight
    let maxWeightIndex = maxIndices[0];
    let maxWeight = weights[Object.keys(weights)[maxIndices[0]]];

    for (let i = 1; i < maxIndices.length; i++) {
      let currentWeight = weights[Object.keys(weights)[maxIndices[i]]];
      
      // Double the weight of playtimeTwoWeeks if it's greater than 0
      if (maxIndices[i] === 5 && currentWeight > 0) {
        currentWeight *= 2;
      }
      
      if (currentWeight > maxWeight) {
        maxWeightIndex = maxIndices[i];
        maxWeight = currentWeight;
      }
    }

    // Get the highest weighted reason
    const highestWeightedReason = reasons[maxWeightIndex];

    // Get the tied reasons excluding the highest weighted reason
    const tiedReasons = maxIndices
      .filter(index => index !== maxWeightIndex)
      .map(index => reasons[index]);

    if (tiedReasons.length > 0) {
      // If there are tied reasons, return the highest weighted reason followed by the tied reasons
      return `${highestWeightedReason}, ${tiedReasons.join(", ")}`;
    } else {
      // If there are no tied reasons, return only the highest weighted reason
      return highestWeightedReason;
    }
  }
}

function recommendGames(gameData, selectedNames, parameter_values) {
  const totalFriends = gameData[0].ownership.length;
  const maxPlaytimeAcrossGames = getMaxPlaytimeAcrossGames(gameData);

  const scoredGames = gameData.map((game) =>
    calculateGameScore(game, totalFriends, parameter_values, maxPlaytimeAcrossGames)
  );
  const sortedGames = scoredGames.sort((a, b) => b.totalScore - a.totalScore);

  return sortedGames.slice(0, 6);
}

module.exports = {
  recommendGames,
};