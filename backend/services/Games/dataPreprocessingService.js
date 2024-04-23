const axios = require("axios");
const User = require("../../models/User/userModal");
const BASE_URL = "http://api.steampowered.com";
const { encrypt, decrypt } = require('../../utils/encryptionUtils');

async function preprocessGameData(selected_users) {
  const members = selected_users;
  const gamePool = [];
  for (const key in members) {
    if (members.hasOwnProperty(key)) {
      const element = members[key];
      let data = await User.findOne({
        discordUserName: element.username,
      }).exec();
      const decryptedSteamId = decrypt(data.steamId);
      element.steamID = decryptedSteamId
      element.preferredGenres = data.preferredGenres;
      element.preferences = data.preferences;
      const url = `${BASE_URL}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${decryptedSteamId}&format=json&include_appinfo=True&include_played_free_games=True`;
      const response = await axios.get(url);
      //const response = {'data': {'response': {'games':[]}}};
      if (!response.data.response.games || response.data.response.games.length === 0) {
        throw new Error("API_KEY_LIMIT_REACHED_OR_ZERO_GAMES_USER");
      }
      const ownedGames = response.data.response.games;
      element.ownedgames = ownedGames ? ownedGames : [];
      const allGames = element.ownedgames.concat(element.preferences);
      for (const game of allGames) {
        let multiplayerFlag = false;
        let numGenres;
        //console.log(`${game.gameSteamId?game.gameSteamId:game.appid}`);
        const existingGame = gamePool.find(
          (item) =>
            item.appid ===
            parseInt(`${game.gameSteamId ? game.gameSteamId : game.appid}`)
        );
        if (
          !existingGame &&
          `${game.gameSteamId ? game.gameSteamId : game.appid}` != undefined
        ) {
          const genreUrl = `https://api.gamalytic.com/game/${
            game.gameSteamId ? game.gameSteamId : game.appid
          }/?fields=name,steamId,description,tags,features,genres`;
          const genreResponse = await axios.get(genreUrl);
          if (genreResponse === undefined) {
            continue;
          }
          const processArray = (array) => {
            return array.map((item) => {
              if (item.toLowerCase().includes("multiplayer")) {
                multiplayerFlag = true;
              }
              return item.toLowerCase();
            });
          };

          const genresList = processArray(genreResponse.data?.genres);
          numGenres = genresList.length;
          const tagsRes = processArray(genreResponse.data?.tags);
          const featuresRes = processArray(genreResponse.data?.features);
          if (!multiplayerFlag) continue;
          gamePool.push({
            appid: parseInt(
              `${game.gameSteamId ? game.gameSteamId : game.appid}`
            ),
            name: `${game.gameName ? game.gameName : game.name}`,
            genres: genresList,
            noOfGameGenres: numGenres,
            tags: tagsRes,
            features: featuresRes,
          });
        }
      }
    }
  }
  //console.log(JSON.stringify(gamePool, undefined, 3));
  //console.log(gamePool.length);
  // Define the modified game pool structure
  let modifiedGamePool = [];
  // Iterate through each game in the game pool
  gamePool.forEach((game) => {
    // Initialize arrays for ownership, matched genres, ratings, and interest
    let ownership = [];
    let matchedGenres = [];
    let ratings = [];
    let interest = [];
    let totalPlaytime = [];
    let playtime2weeks = [];

    // Iterate through each member in the members list
    members.forEach((member) => {
      // Check ownership, playtime, and playtime2weeks
    const ownedGame = member.ownedgames.find(ownedGame => ownedGame.appid === game.appid);
    ownership.push(ownedGame ? 1 : 0);
    totalPlaytime.push(ownedGame ? ownedGame.playtime_forever || 0 : 0);
    playtime2weeks.push(ownedGame ? ownedGame.playtime_2weeks || 0 : 0);

    // Calculate matched genres
    const matchedGenresCount = game.genres.filter(genre => member.preferredGenres.includes(genre.toLowerCase())).length;
    matchedGenres.push(matchedGenresCount);

    // Find rating and interest
    const prefObj = member.preferences.find(pref => pref.gameSteamId === game.appid);
    ratings.push(prefObj ? prefObj.ratings || null : null);
    interest.push(prefObj ? prefObj.interest || null : null);
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
        noOfGameGenres: game.noOfGameGenres,
        ratings: ratings,
        interest: interest,
        totalPlaytime: totalPlaytime,
        playtime_2weeks: playtime2weeks,
      };
      modifiedGamePool.push(modifiedGame);
    }
  });
  //console.log(JSON.stringify(modifiedGamePool, undefined, 3));
  // Output the modified game pool
  return modifiedGamePool;
}

module.exports = { preprocessGameData };
