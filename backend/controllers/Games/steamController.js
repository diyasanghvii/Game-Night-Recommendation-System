const axios = require("axios");
const User = require("../../models/User/userModal");
const { decrypt } = require("../../utils/encryptionUtils");

const BASE_URL = "http://api.steampowered.com";

// @desc Get User Steam Data
// @route GET /steam/getUserSteamGameList
// @access Private
const getUserSteamGameList = async (req, res) => {
  try {
    const email = req.user.email;
    let userInfo = await User.findOne({ email: email }).exec();
    res.status(200).send({
      message: "Fetched user steam game list!",
      steamGames: userInfo.steamGames,
    });
  } catch (e) {
    res.status(500).send("Error Occurred, Try again!");
  }
};

// @desc Save user steam data on DB
// @route POST /steam/backupusersteamdata
// @access Private
const backUpUserSteamData = async (req, res) => {
  try {
    let userInfo = await User.findOne({ email: req.user.email }).exec();
    const decryptedSteamId = decrypt(userInfo.steamId);
    const url = `${BASE_URL}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${decryptedSteamId}&format=json&include_appinfo=True&include_played_free_games=True`;
    const response = await axios.get(url);
    const data = response.data;
    await userInfo.updateOne({
      steamGames: data.response.games,
    });
    res.status(200).send({
      message: "Data Cached Successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error Occurred, Try again!");
  }
};

module.exports = {
  getUserSteamGameList,
  backUpUserSteamData,
};
