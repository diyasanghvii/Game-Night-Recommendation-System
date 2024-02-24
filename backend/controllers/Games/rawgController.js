const axios = require("axios");

const BASE_URL = "https://api.rawg.io/api";

// @desc Get Game Data from Rawg
// @route GET /rawg/getGameDetails
// @access Public
const getGameDetails = async (req, res) => {
  try {
    const gameRawgId = req.query.gameRawgId;
    const url = `${BASE_URL}/games/${gameRawgId}?key=${process.env.RAWG_API_KEY}&stores=1`;
    const response = await axios.get(url);
    const data = response.data;
    res.status(200).send( {
                    "message": "Fetched Steam game's details from RAWG!",
                    "game": data
        });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error Occurred, Try again!");
  }
};


// @desc Get All Games from Rawg that match the search text
// @route GET /rawg/getAllGames
// @access Public
const getAllGamesBySearch = async (req, res) => {
  try {
    const gameName = req.query.gameName;
    const url = `${BASE_URL}/games?key=${process.env.RAWG_API_KEY}&stores=1&search=${gameName}`;
    const response = await axios.get(url);
    const data = response.data;
    res.status(200).send({
                    "message": "Fetched Steam game's details from RAWG!",
                    "games": data['results']
                });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error Occurred, Try again!");
  }
};

module.exports = {
  getGameDetails,
  getAllGamesBySearch
};
