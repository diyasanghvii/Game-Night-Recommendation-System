// write common function here

export const LOVE = 1;
export const INTERESTING = 0.75;
export const MEH = 0;

// Example
export const addNumbers = (number1, number2) => {
  return number1 + number2;
};

export const gameRatingMatch = (ratings, gameName, gameSteamId, gameRawgId) => {
  if (!ratings) return null;

  const ratingObj = ratings.find(
    (rating) =>
      rating.gameSteamId === gameSteamId
  );

  if (ratingObj && ratingObj.ratings) {
    return ratingObj.ratings;
  } else if (ratingObj && ratingObj.interest >= 0) {
    return ratingObj.interest;
  } else {
    return null;
  }
};

export const getUnownedRatingValue = (data) => {
  const ratings = {
    interesting: 0.75,
    love: 1,
    meh: 0,
  };
  return ratings[data];
};

export const isValidDiscordUsername = (username) => {
  if (typeof username !== "string") {
    return false;
  }

  username = username.trim();

  if (username.length < 2 || username.length > 32) {
    return false;
  }

  const invalidSubstrings = [
    "@",
    "#",
    ":",
    "```",
    "discord",
    "everyone",
    "here",
  ];
  for (const substring of invalidSubstrings) {
    if (username.includes(substring)) {
      return false;
    }
  }

  const invalidCharactersRegex = /[\u200B-\u200D\uFEFF]/;
  if (invalidCharactersRegex.test(username)) {
    return false;
  }

  if (username.length === 0) {
    return false;
  }

  return true;
};
