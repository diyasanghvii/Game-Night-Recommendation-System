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
    (rating) => rating.gameSteamId === gameSteamId
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

export const isGameOwned = (list, singleObject) => {
  for (let obj of list) {
    if (obj.appid === singleObject.appid) {
      return true;
    }
  }
  return false;
};

export const getOnlyUnRatedGames = (a, b) => {
  return a.filter((objA) => !b.some((objB) => objA.appid === objB.gameSteamId));
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${month}-${day}-${year}`;

  return formattedDate;
};
