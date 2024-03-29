const axios = require("axios");
const User = require("../../models/User/userModal");
const BASE_URL = "http://api.steampowered.com";

async function preprocessGameData(selected_users) {
  const members = selected_users;
  const gamePool = [];
  for (const key in members) {
    if (members.hasOwnProperty(key)) {
      const element = members[key];
      let data = await User.findOne({
        discordUserName: element.username,
      }).exec();
      element.steamID = data.steamId;
      element.preferredGenres = data.preferredGenres;
      element.preferences = data.preferences;
      const url = `${BASE_URL}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${data.steamId}&format=json&include_appinfo=True&include_played_free_games=True`;
      const response = await axios.get(url);
      const ownedGames = response.data.response.games;
      element.ownedgames = ownedGames ? ownedGames : [];
      for (const game of element.preferences) {
        let multiplayerFlag = false;
        const existingGame = gamePool.find(
          (item) => item.appid === game.gameSteamId
        );
        if (!existingGame && game.gameSteamId != undefined) {
          const genreUrl = `https://api.gamalytic.com/game/${game.gameSteamId}/?fields=name,steamId,description,tags,features,genres`;
          const genreResponse = await axios.get(genreUrl);
          if(genreResponse===undefined){
          continue;
          }
          const genresList = genreResponse.data?.genres.map(function(item) {
            if (item.toLowerCase().includes("multiplayer"))
            multiplayerFlag = true;
            return item.toLowerCase();
            });
          const tagsRes = genreResponse.data?.tags.map(function(item) {
            if (item.toLowerCase().includes("multiplayer"))
            multiplayerFlag = true;
            return item.toLowerCase();
            });
          const featuresRes = genreResponse.data?.features.map(function(item) {
            if (item.toLowerCase().includes("multiplayer"))
            multiplayerFlag = true;
            return item.toLowerCase();
            });
          if(!multiplayerFlag)
            continue;
          gamePool.push({
            appid: game.gameSteamId,
            name: game.gameName,
            genres: genresList,
            tags: tagsRes,
            features: featuresRes
          });
        }
      }
    }
  }

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
