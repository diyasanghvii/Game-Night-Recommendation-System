async function preprocessGameData(gamePool, members) {
  // Define the modified game pool structure
  let modifiedGamePool = [];

  // Iterate through each game in the game pool
  gamePool.forEach((game) => {
    // Initialize arrays for ownership, matched genres, ratings, and interest
    let ownership = [];
    let matchedGenres = [];
    let ratings = [];
    let interest = [];

    // Iterate through each member in the members list
    members.forEach((member) => {
      // Check ownership
      let isOwned = member.ownedgames.some(
        (ownedGame) => ownedGame.appid === game.appid
      );
      ownership.push(isOwned ? 1 : 0);

      // Calculate matched genres
      let matchedGenresCount = game.genres.filter((genre) =>
        member.preferredGenres.includes(genre.toLowerCase())
      ).length;
      matchedGenres.push(matchedGenresCount);

      // Find rating
      let ratingObj = member.preferences.find(
        (pref) => pref.gameSteamId === game.appid
      );
      ratings.push(ratingObj ? ratingObj.ratings || null : null);

      // Find interest
      let interestObj = member.preferences.find(
        (pref) => pref.gameSteamId === game.appid
      );
      interest.push(interestObj ? interestObj.interest || null : null);
    });

    // Check if all values in ownership, ratings, and interest arrays are null
    let allNull =
      ownership.every((value) => value === 0) &&
      ratings.every((value) => value === null) &&
      interest.every((value) => value === null);

    // If not all values are null, construct the modified game object and push it to the modified game pool
    if (!allNull) {
      let modifiedGame = {
        gameSteamId: game.appid,
        gameName: game.name,
        ownership: ownership,
        matchedgenres: matchedGenres,
        ratings: ratings,
        interest: interest,
      };
      modifiedGamePool.push(modifiedGame);
    }
  });

  // Output the modified game pool
  return modifiedGamePool;
}

module.exports = { preprocessGameData };
