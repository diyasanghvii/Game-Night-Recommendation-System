function calculateGameScore(game, userGames, userRatings, userGenres, totalFriends) {
    const ownershipScore = calculateOwnershipScore(game.ownership, totalFriends);
    const ratingScore = calculateRatingScore(game.ratings, userRatings, game.ownership);
    const interestScore = calculateInterestScore(game.ownership, userGames, totalFriends);
    const genreScore = calculateGenreScore(game.matchedgenres, userGenres);
    const minutesPlayedScore = calculateMinutesPlayedScore(game.ownership, userGames);
  
    // Define weights for each score (can be user-defined or learned from data)
    const weights = {
      ownership: 0.2,
      rating: 0.3,
      interest: 0.1,
      genre: 0.2,
      minutesPlayed: 0.2,
    };
  
    const totalScore =
      ownershipScore * weights.ownership +
      ratingScore * weights.rating +
      interestScore * weights.interest +
      genreScore * weights.genre +
      minutesPlayedScore * weights.minutesPlayed;
  
    return { ...game, totalScore };
  }
  
  function calculateOwnershipScore(ownership, totalFriends) {
    const numOwners = ownership.filter(Boolean).length;
    return numOwners / totalFriends;
  }
  
  function calculateRatingScore(gameRatings, userRatings, ownership) {
    const ratingsWithMinutes = gameRatings.map((rating, index) => ({
      rating,
      minutesPlayed: userRatings[index]?.minutesPlayed || 0,
    }));
  
    const filteredRatings = ratingsWithMinutes.filter((rating, index) => ownership[index]);
    const totalMinutes = filteredRatings.reduce((sum, rating) => sum + rating.minutesPlayed, 0);
  
    if (!totalMinutes) return 0;
  
    const weightedAverageRating = filteredRatings.reduce((sum, rating) => sum + (rating.rating * rating.minutesPlayed), 0) / totalMinutes;
    return weightedAverageRating;
  }
  
  function calculateInterestScore(ownership, userGames, totalFriends) {
    const interestedFriends = userGames.filter((userGame, index) => !ownership[index] && userGame.expressedInterest).length;
    return interestedFriends / (totalFriends - ownership.filter(Boolean).length);
  }
  
  function calculateGenreScore(matchedGenres, userGenres) {
    const totalGenres = matchedGenres.length;
    const matchingGenres = matchedGenres.filter((genre) => userGenres.includes(genre)).length;
    return matchingGenres / totalGenres;
  }
  
  function calculateMinutesPlayedScore(ownership, userGames) {
    const filteredMinutes = userGames.filter((userGame, index) => ownership[index]).map((game) => game.minutesPlayedInLastTwoWeeks || 0);
    const totalMinutes = filteredMinutes.reduce((sum, minutes) => sum + minutes, 0);
  
    const numPlayers = filteredMinutes.length;
    if (!numPlayers) return 0;
  
    return totalMinutes / numPlayers;
  }
  
  function recommendGames(gameData, selectedUsers) {
    const totalFriends = selectedUsers.length;
    const userGames = {}; // Map user discord name to their games data
    const userRatings = {}; // Map user discord name to their ratings data
    const userGenres = []; // Array of genres for all users
  
    const scoredGames = gameData.map((game) => calculateGameScore(game, userGames[game.game], userRatings, userGenres, totalFriends));
    const sortedGames = scoredGames.sort((a, b) => b.totalScore - a.totalScore);
  
    return sortedGames.slice(0, 10); // Return the top 10 recommended games
  }
  