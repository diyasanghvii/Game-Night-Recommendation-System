const axios = require("axios");

// @desc Get Game Data from Rawg
// @route GET /search/getGameDetails
// @access Public
const getGameDetails = async (req, res) => {
  try {
    const appid = req.query.appid;
    const url = `http://store.steampowered.com/api/appdetails/?appids=${appid}`;
    const response = await axios.get(url);
    const data = response.data[appid].data;
    res.status(200).send({
      message: "Fetched Steam game's details from Steam!",
      game: data,
    });
  } catch (e) {
    res.status(500).send("Error Occurred, Try again!");
  }
};

// @desc Get All Games from Steam that match the search text
// @route GET /search/getAllGames
// @access Public
const getAllGamesBySearch = async (req, res) => {
  try {
    const gameName = req.query.gameName;
    const url = `https://steamcommunity.com/actions/SearchApps/${gameName}`;
    const response = await axios.get(url);
    const data = response.data;
    res.status(200).send({
      message: "Fetched Steam game's details from Steam!",
      games: data,
    });
  } catch (e) {
    res.status(500).send("Error Occurred, Try again!");
  }
};

// @desc Get Top 10 featured Games from Steam
// @route GET /search/getFeaturedGames
// @access Public
const getFeaturedGames = async (req, res) => {
  try {
    const url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/features`;
    const response = await axios.get(url);
    const data = response.data;
    res.status(200).send({
      message: "Fetched Featured games from Steam!",
      games: data,
    });
  } catch (e) {
    res.status(500).send("Error Occurred, Try again!");
  }
};

module.exports = {
  getGameDetails,
  getAllGamesBySearch,
  getFeaturedGames
};

