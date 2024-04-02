const axios = require("axios");
const { fetchAllGenres } = require("../../services/gameService");

// @desc get STEAM Genre API
// @route POST /game/getsteamgenre
// @access Private
const getSteamGenres = async (req, res) => {
  try {
    const genreNames = await fetchAllGenres();
    if (genreNames.length === 0) {
      return res.status(404).send({ message: "No genres found!" });
    }
    res
      .status(200)
      .send({ message: "Fetched genre list!", genreList: genreNames });
  } catch (e) {
    console.log("error :", e)
    res.status(500).send("Error Occurred, Try again!");
  }
};

module.exports = {
  getSteamGenres,
};
