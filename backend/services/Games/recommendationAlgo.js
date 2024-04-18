function calculateGameScore(game, totalFriends, parameter_values) {

  const weights = {
    ownership: 0.6,
    rating: 0.5,
    interest: 0.3,
    genre: 0.2,
    totalPlaytime: 1,
    playtimeTwoWeeks: 0.5,
  };
  // const weights = {
  //   ownership: parameter_values.ownership,
  //   rating: parameter_values.ratings,
  //   interest: parameter_values.interest,
  //   genre: parameter_values.preferredGenres,
  //   totalPlaytime: parameter_values.totalPlaytime,
  //   playtimeTwoWeeks: parameter_values.playtime2Weeks,
  // };

  const ownershipScore = weights.ownership == 0 ? 0 : calculateOwnershipScore(game.ownership, totalFriends);
  const ratingScore = weights.rating == 0 ? 0 : calculateRatingScore(game.ratings, game.ownership, game.totalPlaytime);
  const interestScore = weights.interest == 0 ? 0 : calculateInterestScore(game.interest, game.ownership);
  const genreScore = weights.genre == 0 ? 0 : calculateGenreScore(game.matchedgenres, game.noOfGameGenres);
  const totalPlaytimeScore = weights.totalPlaytime == 0 ? 0 : calculateTotalPlaytimeScore(game.totalPlaytime, game.ownership);
  const playtimeTwoWeeksScore = weights.playtimeTwoWeeks == 0 ? 0 : calculatePlaytimeTwoWeeksScore(game.playtime_2weeks, game.ownership);

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
  //const scores = [ownershipScore, ratingScore, interestScore, genreScore, totalPlaytimeScore, playtimeTwoWeeksScore];
  console.log(scores);
  console.log(weights);
  const maxTotalScore = calculateMaxTotalScore(weights, scores);
  const maxScore = Math.max(...scores);
  //const reason = getReason(maxScore, scores);
  const reason = getReason2(maxScore, scores, weights);

  return { ...game, totalScore: totalScore.toFixed(6), reason , ownershipScore, ratingScore, interestScore, genreScore, totalPlaytimeScore, playtimeTwoWeeksScore, maxTotalScore};
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
  return (numOfNonZeroValues / ownership.length).toFixed(6);
}

function calculatePlaytimeTwoWeeksScore(playtimeTwoWeeks, ownership) {
  const ownedPlaytimes = playtimeTwoWeeks.filter(
    (playtime, index) => ownership[index] && playtime !== 0
  );

  const numOwnedPlaytimes = ownedPlaytimes.length;
  if (numOwnedPlaytimes === 0) return 0;

  const sumPlaytimes = ownedPlaytimes.reduce((sum, playtime) => sum + playtime, 0);
  const avgPlaytime = sumPlaytimes / numOwnedPlaytimes;

  // Normalize the average playtime to a score between 0 and 1
  const normalizedScore = Math.min(avgPlaytime / 10, 1);

  // Scale the score to range from -1 to 1
  return (normalizedScore * 2 - 1).toFixed(6); 
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
  const minPlaytime = Math.min(ownedPlaytimes);
  const maxPlaytime = Math.max(nonZeroPlaytimes);
  const sumPlaytimes = nonZeroPlaytimes.reduce((sum, playtime) => sum + playtime, 0);
  let normalizedSumPlaytimes = (sumPlaytimes - minPlaytime) / (maxPlaytime - minPlaytime);
  console.log('normalizedSumPlaytimes',normalizedSumPlaytimes);

  normalizedSumPlaytimes = normalizedSumPlaytimes * calculatePLaytimeConfidence(nonZeroPlaytimes.length,
    ownedPlaytimes.length, ownership);
  console.log('normalizedSumPlaytimes2',normalizedSumPlaytimes);

  return normalizedSumPlaytimes.toFixed(6);
  //* calculateConfidence(filteredPlaytimes, ownership.length)
}

function getReason(maxScore, scores) {
  const reasons = ["Game Ownership", "User Ratings", "Interest Expressed", "Matched Genres", "Total Playtime", "Playtime Last 2 Weeks"];
  const maxIndex = scores.indexOf(maxScore);
  // console.log('scores', scores);
  // console.log('maxScore', maxScore);
  // console.log('reason', reason);
  return reasons[maxIndex];
}

// function getReason1(maxScore, scores) {
//   const reasons = ["Game Ownership", "User Ratings", "Interest Expressed", "Matched Genres", "Total Playtime"];
//   const numericScores = scores.map(Number);
//   const maxIndex = numericScores.indexOf(Number(maxScore));
//   return reasons[maxIndex];
// }

// function getReason1(maxScore, scores, weights) {
//   const reasons = ["Game Ownership", "User Ratings", "Interest Expressed", "Matched Genres", "Total Playtime", "Playtime Last 2 Weeks"];
//   const numericScores = scores.map(Number);
  
//   // Find all indices where the score matches the maxScore
//   const maxIndices = numericScores.reduce((indices, score, index) => {
//     if (score == maxScore) {
//       indices.push(index);
//     }
//     return indices;
//   }, []);

//   if (maxIndices.length === 1) {
//     // If there is only one maxScore, return the corresponding reason
//     return reasons[maxIndices[0]];
//   } 
//   else {
//     // If there are ties, find the reason with the highest weight
//     let maxWeightIndex = maxIndices[0];
//     let maxWeight = weights[Object.keys(weights)[maxIndices[0]]];

//     for (let i = 1; i < maxIndices.length; i++) {
//       const currentWeight = weights[Object.keys(weights)[maxIndices[i]]];
//       if (currentWeight > maxWeight) {
//         maxWeightIndex = maxIndices[i];
//         maxWeight = currentWeight;
//       }
//     }

//     return reasons[maxWeightIndex];
//   }
//   /*
//   // APPROACH 2 (alternative, gotta test):
//   // else {
//   //   // If there are ties, return the reasons separated by a comma
//   //   const tiedReasons = maxIndices.map(index => reasons[index]);
//   //   return tiedReasons.join(", ");
//   // }
//   */
// }

function getReason1(maxScore, scores, weights) {
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
      const currentWeight = weights[Object.keys(weights)[maxIndices[i]]];
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

function getReason2(maxScore, scores, weights) {
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
    // If there are ties, find the reasons with the highest weight
    const maxWeight = Math.max(...maxIndices.map(index => weights[Object.keys(weights)[index]]));
    const maxWeightIndices = maxIndices.filter(index => weights[Object.keys(weights)[index]] === maxWeight);

    if (maxWeightIndices.length === 1) {
      // If there is only one reason with the highest weight, return it
      return reasons[maxWeightIndices[0]];
    } else {
      // If there are ties in both max score and weights, return the reasons separated by a comma
      const tiedReasons = maxWeightIndices.map(index => reasons[index]);
      return tiedReasons.join(", ");
    }
  }
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