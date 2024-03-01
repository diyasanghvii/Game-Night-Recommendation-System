// write common function here

// Example
export const addNumbers = (number1, number2) => {
  return number1 + number2;
};

export const gameRatingMatch = (ratings, gameName, gameSteamId, gameRawgId) => {
  if (!ratings) return null;

  const ratingObj = ratings.find(
    (rating) =>
      rating.gameName === gameName ||
      rating.gameSteamId === gameSteamId ||
      rating.gameRawgId === gameRawgId
  );

  return ratingObj ? ratingObj.ratings : null;
};
