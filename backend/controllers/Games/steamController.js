const axios = require("axios");
const User = require("../../models/User/userModal");

const BASE_URL = "http://api.steampowered.com";

// @desc Get User Steam Data
// @route POST /steam/getUserSteamGameList
// @access Private
const getUserSteamGameList = async (req, res) => {
  try {
    const email = req.user.email;
    let userInfo = await User.findOne({ email: email }).exec();
    const url = `${BASE_URL}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${userInfo.steamId}&format=json&include_appinfo=True&include_played_free_games=True`;
    const response = await axios.get(url);
    const data = response.data;
    res.status(200).send({
      message: "Fetched user steam game list!",
      steamGames: data.response.games,
    });
  } catch (e) {
    res.status(500).send("Error Occurred, Try again!");
  }
};

module.exports = {
  getUserSteamGameList,
};
